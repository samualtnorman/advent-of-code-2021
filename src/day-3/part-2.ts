import rawInput from "./input.txt"

const rawInputSplit = rawInput.trim().split("\n")

const input = rawInputSplit.map(line => parseInt(line, 2))
const bitLength = rawInputSplit[0].length

console.time("time took")

let oxygenGeneratorRating
let cO2ScrubberRating

findOxygenGeneratorRating: {
	let oxygenGeneratorRatingDiagnostic = input

	for (let i = 0; i < bitLength; i++) {
		if (oxygenGeneratorRatingDiagnostic.length == 1) {
			oxygenGeneratorRating = oxygenGeneratorRatingDiagnostic[0]
			break findOxygenGeneratorRating
		}


		const ones = []
		const zeros = []

		for (const number of oxygenGeneratorRatingDiagnostic) {
			if (number & 2 ** (bitLength - i - 1))
				ones.push(number)
			else
				zeros.push(number)
		}

		if (Math.round(ones.length / oxygenGeneratorRatingDiagnostic.length))
			oxygenGeneratorRatingDiagnostic = ones
		else
			oxygenGeneratorRatingDiagnostic = zeros
	}

	if (oxygenGeneratorRatingDiagnostic.length == 1) {
		oxygenGeneratorRating = oxygenGeneratorRatingDiagnostic[0]
		break findOxygenGeneratorRating
	}

	throw new Error("couldn't filter input enough")
}

findCO2ScrubberRating: {
	let cO2ScrubberRatingDiagnostic = input

	for (let i = 0; i < bitLength; i++) {
		if (cO2ScrubberRatingDiagnostic.length == 1) {
			cO2ScrubberRating = cO2ScrubberRatingDiagnostic[0]
			break findCO2ScrubberRating
		}


		const ones = []
		const zeros = []

		for (const number of cO2ScrubberRatingDiagnostic) {
			if (number & 2 ** (bitLength - i - 1))
				ones.push(number)
			else
				zeros.push(number)
		}

		if (Math.round(ones.length / cO2ScrubberRatingDiagnostic.length))
			cO2ScrubberRatingDiagnostic = zeros
		else
			cO2ScrubberRatingDiagnostic = ones
	}

	if (cO2ScrubberRatingDiagnostic.length == 1) {
		cO2ScrubberRating = cO2ScrubberRatingDiagnostic[0]
		break findCO2ScrubberRating
	}

	throw new Error("couldn't filter input enough")
}

console.log("answer:", oxygenGeneratorRating * cO2ScrubberRating)
console.timeEnd("time took")
