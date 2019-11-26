const fs = require('fs')

class filehandler {
	static read(file) {
		try {
			return fs.readFileSync(file, 'utf-8')
		} catch {
			console.log(`Error at open ${file}`)
			process.exit()
			return ''
		}
	}

	static arrayify(content) {
		return content.replace('\r', '').split('\n')
	}

	static write(file, content) {
		try {
			fs.writeFileSync(file, content)
		} catch {
			console.log(`Error at writing on ${file}`)
			process.exit()
		}
	}
}

module.exports = filehandler
