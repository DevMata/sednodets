const cmd = /^s\/(?<search>[\w| ]+)\/(?<replace>[\w| ]+)\/(?<flag>p|g)?$/
const file = /^(?<name>\w+)\.\w+$/
const ext = /^\.\w+/

function processcmd(command: string) {
	if (cmd.test(command)) {
		const grps = cmd.exec(command)!.groups

		return {
			search: grps!.search,
			replace: grps!.replace,
			flag: grps!.flag || ''
		}
	} else {
		console.log(`Invalid command ${command}`)
		process.exit()
		return {}
	}
}

function checkcmd(command: string) {
	return cmd.test(command)
}

function checkfile(fileName: string) {
	return file.test(fileName)
}

function checkext(extension: string) {
	return ext.test(extension)
}

function getFileName(fileName: string) {
	if (!checkfile(fileName)) {
		console.log('Invalid filename')
		process.exit()
	}
	return file.exec(fileName)!.groups!.name
}

export { processcmd, checkcmd, checkfile, checkext, getFileName }
