import rawInput from "./input.txt"

const input = rawInput.trim().split("\n").map(Number)

console.time("time took")

let timesIncreased = 0

for (let i = 1; i < input.length; i++) {
	if (input[i] > input[i - 1])
		timesIncreased++
}

console.log("answer:", timesIncreased)

console.timeEnd("time took")
