const { Command } = require('commander');
const contacts = require('./contacts');

const program = new Command();
program
  .option('-a --action <type>', 'choose action')
  .option('-i --id <type>', 'user id')
  .option('-n --name <type>', 'user name')
  .option('-e --email <type>', 'user email')
  .option('-p --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await contacts.listContacts();
      console.table(contactList);
      break;
    case 'get':
      const currentId = Number(id);
      const currentContact = await contacts.getContactById(currentId);
      console.log(currentContact);
      break;
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case 'remove':
      const deleteId = await contacts.removeContact(Number(id));
      if (deleteId) console.log(`Id ${deleteId} was deleted`);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
