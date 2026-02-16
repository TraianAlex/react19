import initSqlJs, { Database } from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

const STORAGE_KEY = 'sqljs-todo-db';

let dbPromise: Promise<Database> | null = null;

const isBrowser = () => typeof window !== 'undefined';

const loadFromStorage = (): Uint8Array | null => {
  if (!isBrowser()) {
    return null;
  }
  const encoded = window.localStorage.getItem(STORAGE_KEY);
  if (!encoded) {
    return null;
  }
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const saveToStorage = (data: Uint8Array) => {
  if (!isBrowser()) {
    return;
  }
  let binary = '';
  for (let i = 0; i < data.length; i += 1) {
    binary += String.fromCharCode(data[i]);
  }
  window.localStorage.setItem(STORAGE_KEY, btoa(binary));
};

const ensureSchema = (db: Database) => {
  db.run(
    `CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    );`
  );
};

const seedIfEmpty = (db: Database) => {
  const result = db.exec('SELECT COUNT(*) as count FROM todos;');
  const count = result?.[0]?.values?.[0]?.[0];
  if (Number(count) === 0) {
    db.run(
      "INSERT INTO todos (text, completed) VALUES ('Try sql.js', 0), ('Persist in localStorage', 1);"
    );
  }
};

export const persistDb = (db: Database) => {
  if (!isBrowser()) {
    return;
  }
  const data = db.export();
  saveToStorage(data);
};

export const getDb = async (): Promise<Database> => {
  if (!dbPromise) {
    dbPromise = (async () => {
      const SQL = await initSqlJs({ locateFile: () => wasmUrl });
      const stored = loadFromStorage();
      const db = stored ? new SQL.Database(stored) : new SQL.Database();
      ensureSchema(db);
      seedIfEmpty(db);
      persistDb(db);
      return db;
    })();
  }
  return dbPromise;
};
