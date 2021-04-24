const fs = require("fs")
const path = require("path")
const FSpromises = fs.promises
const contactsPath = path.resolve("db/contacts.json")

async function listContacts() {
    try {
        const contacts = await FSpromises.readFile(contactsPath)
        // console.log(JSON.parse(contacts))
        return JSON.parse(contacts)
    } catch (err) {
        throw new Error(err)
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts()
        const foundContact = contacts.find((contact) => contact.id === +contactId)
        // console.log(contacts)
        // console.log(contactId)
        return foundContact
    } catch (err) {
        throw new Error(err)
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts()
        const filtredContacts = contacts.filter((contact) => contact.id !== +contactId)
        //nodemon создает бесконечный цикл на записи
        // для этого создал nodemon.json
        FSpromises.writeFile(contactsPath, JSON.stringify(filtredContacts))
    } catch (err) {
        throw new Error(err)
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts()

        FSpromises.writeFile(contactsPath, JSON.stringify([...contacts, { id: contacts.length + 5, name, email, phone }]))
    } catch (err) {
        throw new Error(err)
    }
}
// removeContact(14)
// removeContact(5).then((res) => console.log(res))
module.exports = { listContacts, addContact, removeContact, getContactById }
