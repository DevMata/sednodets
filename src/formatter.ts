interface args {
	search: string
	replace: string
	flag: string
}

interface pLines {
	firstLine: string
	secondLine: string
}

function processLine(line: string, args: args): pLines {
	const flag = args.flag.includes('g') ? 'g' : ''

	let firstLine: string = ''
	let secondLine: string = ''

	firstLine = processLn(line, args.search, args.replace, flag)

	if (args.flag.includes('p')) {
		secondLine = processLnp(line, args.search, args.replace, flag)
	}

	return {
		firstLine,
		secondLine
	}
}

function processLn(
	line: string,
	search: string,
	replace: string,
	flag: string
) {
	return line.replace(new RegExp(search, flag), replace)
}

function processLnp(
	line: string,
	search: string,
	replace: string,
	flag: string
) {
	if (line.includes(search)) {
		return line.replace(new RegExp(search, flag), replace)
	}

	return ''
}

export { processLine, args, pLines }
