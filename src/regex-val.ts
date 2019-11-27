import { args } from './formatter'

const cmd = new RegExp(
	'^s/(?<search>[a-zA-z1-9_ ]+)/(?<replace>[a-zA-z1-9_ ]+)/(?<flag>|p|g|(pg)|(gp))$'
)
const file = new RegExp('^(?<name>[a-zA-Z1-9_ ]+).[a-zA-Z1-9_ ]+$')
const ext = new RegExp('^.[a-zA-Z1-9_ ]+$')

function processcmd(command: string) {
	if (!cmd.test(command)) {
		console.log(`Invalid command ${command}`)
		process.exit()
		return {} as args
	}

	const grps = cmd.exec(command)!.groups

	return {
		search: grps!.search,
		replace: grps!.replace,
		flag: grps!.flag
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
