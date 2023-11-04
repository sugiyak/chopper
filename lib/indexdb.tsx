//function that checks if database with a specific name exists
//it return boolean value
export async function checkDatabaseExists(dbName) {
  const databases = await indexedDB.databases();
  const dbExists = databases.some(db => db.name === dbName);
  return dbExists;
}

