import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
console.log('PUT to the database');
    // Connects to database
    const contactDb = await openDB('jate', 1);
    // Create new transaction
    const tx = contactDb.transaction('jate', 'readwrite');
    // Create object to store transaction
    const store = tx.objectStore('jate');
    // Request store to put in content
    const request = store.put({ id: 1, value: content });
    // Get confirmation of the request.
    const result = await request;
    console.log('Data saved to the database', result);
  };

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
    // Connects to database
    const contactDb = await openDB('jate', 1);
    // Create object to store transaction
    const tx = contactDb.transaction('jate', 'readonly');
    // Create object to store transaction
    const store = tx.objectStore('jate');
    // Gets all data in database
    const request = store.getAll();
    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result?.value;
  };

initdb();
