import rawInput from "./input.txt"

const input: [ string, number ][] = rawInput.trim().split("\n").map(line => {
	const [ action, amount ] = line.split(" ")
	return [ action, Number(amount) ]
})

console.time("time took")

let horizontalPosition = 0
let depth = 0

for (const [ action, amount ] of input) {
	switch (action) {
		case "forward": {
			horizontalPosition += amount
		} break

		case "down": {
			depth += amount
		} break

		case "up": {
			depth -= amount
		} break

		default:
			throw new Error(`unknown action "${action}"`)
	}
}

console.log("result:", horizontalPosition * depth)
console.timeEnd("time took")
