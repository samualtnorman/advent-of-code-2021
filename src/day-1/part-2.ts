import rawInput from "./input.txt"

const input = rawInput.trim().split("\n").map(Number)

console.time("time took")

let timesIncreased = 0

for (let i = 3; i < input.length; i++) {
	if ((input[i - 3] + input[i - 2] + input[i - 1]) < (input[i - 2] + input[i - 1] + input[i]))
		timesIncreased++
}

console.log("answer:", timesIncreased)

console.timeEnd("time took")
