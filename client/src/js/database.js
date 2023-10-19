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

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('PUT to the database');

  // create a connection to the database
  const jateDB = await openDB('jate', 1);

  // create a new transaction to the database
  const tx = jateDB.transaction('jate', 'readwrite');

  // object store
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log('The result of the put operation is', result);
};
  // Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // create a connection to the database
  const jateDB = await openDB('jate', 1);

  // create a new transaction to the db
  const tx = jateDB.transaction('jate', 'readonly');

  // open object store
  const store = tx.objectStore('jate');

  // get all the content from the database
  const request = store.getAll();

  // wait for the request to complete
  const result = await request;
  console.log('result.value', result);
}

initdb();
