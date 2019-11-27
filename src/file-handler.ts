const fs = require('fs')

function read(fileName: string) {
	try {
		return fs.readFileSync(fileName, 'utf-8')
	} catch {
		console.log(`Error at open ${fileName}`)
		process.exit()
		return ''
	}
}

function arrayify(stream: string) {
	return stream.replace('\r', '').split('\n')
}

function write(fileName: string, content: string) {
	try {
		fs.writeFileSync(fileName, content)
	} catch {
		console.log(`Error at writing on ${fileName}`)
		process.exit()
	}
}

export { read, arrayify, write }
