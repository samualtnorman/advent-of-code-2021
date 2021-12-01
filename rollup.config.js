import babel from "@rollup/plugin-babel"
import commonJS from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import nodeResolve from "@rollup/plugin-node-resolve"
import fs from "fs"
import preserveShebang from "rollup-plugin-preserve-shebang"
import { string } from "rollup-plugin-string"
import packageConfig from "./package.json"

const { readdir: readDirectory } = fs.promises

/** @typedef {import("rollup").RollupOptions} RollupOptions */

const plugins = [
	babel({
		babelHelpers: "bundled",
		extensions: [ ".ts" ]
	}),
	commonJS(),
	json({ preferConst: true }),
	nodeResolve({ extensions: [ ".ts" ] }),
	preserveShebang(),
	string({ include: "**/*.txt" })
]

const external = []

if ("dependencies" in packageConfig)
	external.push(...Object.keys(packageConfig.dependencies))

if ("devDependencies" in packageConfig)
	external.push(...Object.keys(packageConfig.devDependencies).map(name => new RegExp(`^${name}(?:/|$)`)))

const sourceDirectory = "src"
const findFilesPromise = findFiles(sourceDirectory)

/** @type {(command: Record<string, unknown>) => Promise<RollupOptions>} */
export default async () => {
	return {
		input: Object.fromEntries(
			(await findFilesPromise)
				.filter(path => path.endsWith(".ts") && !path.endsWith(".d.ts"))
				.map(path => [ path.slice(sourceDirectory.length + 1, -3), path ])
		),
		output: {
			dir: "dist",
			interop: "auto"
		},
		plugins,
		external,
		preserveEntrySignatures: "allow-extension",
		treeshake: {
			moduleSideEffects: "no-external"
		}
	}
}

/**
 * @param path the directory to start recursively finding files in
 * @param filter either a blacklist or a filter function that returns false to ignore file name
 * @returns promise that resolves to array of found files
 * @type {(path: string, filter?: string[] | ((name: string) => boolean)) => Promise<string[]>}
 */
async function findFiles(path, filter = []) {
	const paths = []
	let /** @type {(name: string) => boolean} */ filterFunction

	if (Array.isArray(filter))
		filterFunction = name => !filter.includes(name)
	else
		filterFunction = filter

	for (const dirent of await readDirectory(path, { withFileTypes: true })) {
		if (!filterFunction(dirent.name))
			continue

		const direntPath = `${path}/${dirent.name}`

		if (dirent.isDirectory())
			await findFilesSub(direntPath, filterFunction, paths)
		else if (dirent.isFile())
			paths.push(direntPath)
	}

	return paths
}

async function findFilesSub(path, filterFunction, paths) {
	const promises = []

	for (const dirent of await readDirectory(path, { withFileTypes: true })) {
		if (!filterFunction(dirent.name))
			continue

		const direntPath = `${path}/${dirent.name}`

		if (dirent.isDirectory())
			promises.push(findFilesSub(direntPath, filterFunction, paths))
		else if (dirent.isFile())
			paths.push(direntPath)
	}

	await Promise.all(promises)
	return paths
}
