const chalk = require('chalk')
const fs = require('fs')

const getNotes = function(){
    return "Your Notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title )

    if(!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added"))
    } else {
        console.log(chalk.red.inverse("Note title taken"))
    }

    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//Load all the notes from note file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
   
}

const removeNote = (title) => {
    const notes = loadNotes()

    const noteToKeep = notes.filter((note) =>  note.title !== title )

    if(notes.length > noteToKeep.length){
        saveNotes(noteToKeep)
        console.log(chalk.green.inverse("Note removed!"))
        
    } else {
        console.log(chalk.red.inverse("No note found!"))
    }

}

//List all notes
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse("Your notes"))
    // console.log(notes.map((note) => note.title))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

//Find and read a note
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note not found!"))
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}