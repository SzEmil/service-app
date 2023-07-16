const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async id => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contactById = contacts.find(contact => contact.id === id);
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async id => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return filteredContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async body => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContacts = contacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (id, body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);

    let contact = contacts.filter(contact => contact.id !== id);
    contact = {
      ...body,
    };

    const copyContacts = contacts.slice();
    const indexOfContact = copyContacts.findIndex(contact => contact.id === id);
    copyContacts.splice(indexOfContact, 1, contact);

    await fs.writeFile(contactsPath, JSON.stringify(copyContacts));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
