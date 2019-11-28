# Sednodets

A Typescript improved version of sednodejs. Sed is a command line linux application that lets you edit files and streams.

## Before start

```bash
npm install
npm run compile
```

## Commands

- p flag prints explicitly if the searched word is founded
- g flag replaces globally
- \-e let you pass one o more commands to the app
- \-f you can provide a file with commands
- \-i overwrite the original file, silences console
- \-i .ext overwrite the original file and makes a backup file with .ext extension, silences console
- \-n silence output unless \-p is being used

## Examples

```bash
node sed.js s/hola/hello/ text.txt
node sed.js s/mundo/world/
node sed.js s/mundo/world/gp text.txt -i
```
