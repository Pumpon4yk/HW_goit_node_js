const fs = require('fs/promises')
const path = require('path')
const {nanoid} = require('nanoid')

const contactsPath = path.join(__dirname, "db/contacts.json")


async function listContacts() {
  const contacts = await fs.readFile(contactsPath)
  return JSON.parse(contacts)
}

async function getContactById (contactId) {
  const contacts = await listContacts()
  const res = contacts.find( ({id}) => id === contactId)
  return res || null
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const indx = contacts.findIndex( ({id}) => id === contactId)
  if(indx === -1) return null;

  const [result] = contacts.splice(indx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

async function addContact(name, email, phone) {
  const contacts = await listContacts()
  const contact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contact
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
