import rawInput from "./input.txt"

const input = rawInput.trim().split("\n").map(line => line.split("").map(booleanNumberAsString => booleanNumberAsString == "1"))

console.time("time took")

let gamma = 0
let epsilon = 0

for (let i = 0; i < input[0].length; i++) {
	let ones = 0

	for (const binary of input) {
		if (binary[i])
			ones++
	}

	if (Math.round(ones / input.length))
		gamma |= 2 ** (input[0].length - i - 1)
	else
		epsilon |= 2 ** (input[0].length - i - 1)
}

console.log("answer:", gamma * epsilon)
console.timeEnd("time took")
