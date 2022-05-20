// import chalk from 'chalk';
const { argv } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes')

//Customize yargs version
yargs.version("1.1.0")

//Create Add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: "remove",
    describe: "Removing a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: "list",
    describe: "list your notes",
    handler() {
        notes.listNotes()
    }
})

//Cread read command
yargs.command({
    command: "read",
    describe: "Reading a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()