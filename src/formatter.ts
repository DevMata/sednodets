interface args {
	search: string
	replace: string
	flag: string
}

function processLine(line: string, args: args, n: boolean) {
	if (args.flag) {
		if (args.flag === 'g') {
			return processlng(line, args, n)
		}

		if (args.flag === 'p') {
			return processln(line, args, n) + processlnp(line, args)
		}
	} else {
		return processln(line, args, n)
	}
}

function processln(line: string, args: args, n: boolean) {
	if (n) return ''

	return line.replace(args.search, args.replace) + '\n'
}

function processlnp(line: string, args: args) {
	if (line.includes(args.search)) {
		return line.replace(args.search, args.replace) + '\n'
	}

	return ''
}

function processlng(line: string, args: args, n: boolean) {
	if (n) return ''

	return line.replace(new RegExp(args.search, 'g'), args.replace) + '\n'
}

export { processLine, processln, processlnp, processlng, args }
