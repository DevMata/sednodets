const yargs = require('yargs')
const regexval = require('./src/regexval')
const filehandler = require('./src/filehandler')
const formater = require('./src/formater')

yargs.boolean('n')

const _ = yargs.argv._
const e = yargs.argv.e
const f = yargs.argv.f
const n = yargs.argv.n
const i = yargs.argv.i

let commands = []
let files = []

for (let obj of _) {
	if (regexval.checkcmd(obj)) {
		if (_.indexOf(obj) == 0) {
			commands.push(regexval.processcmd(obj))
		} else {
			console.log('Error. Use -e for many commands')
			process.exit()
		}
	} else if (regexval.checkfile(obj)) {
		files.push(obj)
	}
}

if (!files.length) {
	console.log("Files don't provided")
	process.exit()
}

if (e) {
	if (typeof e == 'string') {
		commands.push(regexval.processcmd(e))
	} else {
		for (let command of e) {
			commands.push(regexval.processcmd(command))
		}
	}
}

if (f) {
	if (typeof f == 'string') {
		for (let command of filehandler.arrayify(filehandler.read(f))) {
			commands.push(regexval.processcmd(command))
		}
	} else {
		for (let file of f) {
			for (let command of filehandler.arrayify(filehandler.read(file))) {
				commands.push(regexval.processcmd(command))
			}
		}
	}
}

for (let file of files) {
	let processedContent = ''
	let content = filehandler.read(file)
	let arrayContent = filehandler.arrayify(content)

	for (let line of arrayContent) {
		let l = line

		for (let command of commands) {
			l = formater.process(l.replace(/\n+$/, ''), command, n)
		}
		processedContent += l
	}

	if (i) {
		if (typeof i === 'boolean') {
			filehandler.write(file, processedContent)
		} else if (typeof i === 'string') {
			filehandler.write(regexval.getFileName(file) + i, content)
			filehandler.write(file, processedContent)
		} else {
			console.log("You don't need many extensions")
			process.exit()
		}
	} else {
		console.log(processedContent)
	}
}
