import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db/contacts.json');

export const listContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf-8');
  console.log(result);
  return JSON.parse(result);
};
export const updateContacts = contacts =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  console.log(result);
  return result || null;
};

export const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  console.log(newContact);
  console.log(contacts);
  return newContact;
};
