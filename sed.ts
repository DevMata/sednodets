import * as yargs from 'yargs'
import * as regexval from './src/regex-val'
import * as formatter from './src/formatter'
import * as filehandler from './src/file-handler'

yargs.boolean('n')

let { _, e, f, n, i } = yargs.argv

let commands: formatter.args[] = []
let fileNames: string[] = []

for (let parameter of _) {
	if (regexval.checkcmd(parameter)) {
		if (_.indexOf(parameter) == 0) {
			commands.push(regexval.processcmd(parameter))
		} else {
			console.log('Error. Use -e for many commands')
			process.exit()
		}
	} else if (regexval.checkfile(parameter)) {
		fileNames.push(parameter)
	} else {
		console.log(`Unkown parameter ${parameter}`)
		process.exit()
	}
}

if (e) {
	if (typeof e == 'string') {
		commands.push(regexval.processcmd(e))
	} else if (Array.isArray(e)) {
		e.forEach(command => commands.push(regexval.processcmd(command)))
	}
}

if (f) {
	if (typeof f == 'string') {
		filehandler
			.arrayify(filehandler.read(f))
			.forEach(command => commands.push(regexval.processcmd(command)))
	} else if (Array.isArray(f)) {
		f.forEach(fileName =>
			filehandler
				.arrayify(filehandler.read(fileName))
				.forEach(command => commands.push(regexval.processcmd(command)))
		)
	}
}

if (!commands.length) {
	console.log('Commands not provided')
	process.exit()
}

if (!fileNames.length) {
	console.log('Files not provided')
	process.exit()
}

for (let fileName of fileNames) {
	let processedContent: string[] = []
	let content = filehandler.read(fileName)
	let arrayContent = filehandler.arrayify(content)

	for (let line of arrayContent) {
		let result: formatter.pLines = {} as formatter.pLines

		for (let command of commands) {
			result = formatter.processLine(line, command)

			if (result.secondLine) {
				line = result.secondLine
			} else {
				line = result.firstLine
			}

			if (!processedContent.includes(result.secondLine))
				processedContent = [...processedContent, result.secondLine]
		}
		if (!n) processedContent = [...processedContent, result.firstLine]
	}

	processedContent = processedContent.filter(line => line)

	if (i) {
		if (typeof i === 'boolean') {
			filehandler.write(fileName, processedContent.join('\n'))
		} else if (typeof i === 'string') {
			filehandler.write(regexval.getFileName(fileName) + i, content)
			filehandler.write(fileName, processedContent.join('\n'))
		} else {
			console.log("You don't need many extensions")
			process.exit()
		}
	} else {
		console.log(processedContent.join('\n'))
	}
}
