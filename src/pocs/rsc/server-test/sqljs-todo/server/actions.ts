import { Database, Statement } from 'sql.js';
import { getDb, persistDb } from './db';
import { sleep } from '../../../../../shared/utils/utils';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const mapRows = (
  result: Database['exec'] extends (...args: any) => infer R ? R : any,
): Todo[] => {
  const [table] = result ?? [];
  if (!table) {
    return [];
  }
  return table.values.map((row) => ({
    id: Number(row[0]),
    text: String(row[1]),
    completed: Number(row[2]) === 1,
  }));
};

const getTodoById = (db: Database, id: number): Todo | null => {
  const stmt = db.prepare(
    'SELECT id, text, completed FROM todos WHERE id = ?;',
  );
  stmt.bind([id]);
  if (!stmt.step()) {
    stmt.free();
    return null;
  }
  const row = stmt.getAsObject() as {
    id: number;
    text: string;
    completed: number;
  };
  stmt.free();
  return {
    id: Number(row.id),
    text: String(row.text),
    completed: Number(row.completed) === 1,
  };
};

const getLastInsertedId = (db: Database): number | null => {
  const result = db.exec('SELECT last_insert_rowid() as id;');
  const value = result?.[0]?.values?.[0]?.[0];
  return value === undefined || value === null ? null : Number(value);
};

const runStatement = (
  stmt: Statement,
  params: Array<string | number | null>,
) => {
  stmt.bind(params);
  stmt.step();
  stmt.free();
};

export const getTodos = async (): Promise<Todo[]> => {
  await sleep(500);
  const db = await getDb();
  const result = db.exec(
    'SELECT id, text, completed FROM todos ORDER BY id DESC;',
  );
  return mapRows(result);
};

export const createTodo = async (text: string): Promise<Todo> => {
  await sleep(500);
  if (Math.random() < 0.2) {
    throw new Error('Failed to create todo.');
  }
  const db = await getDb();
  const stmt = db.prepare('INSERT INTO todos (text, completed) VALUES (?, 0);');
  runStatement(stmt, [text]);
  const insertedId = getLastInsertedId(db);
  const todo = insertedId !== null ? getTodoById(db, insertedId) : null;
  persistDb(db);
  if (!todo) {
    throw new Error('Failed to create todo.');
  }
  return todo;
};

export const toggleTodo = async (id: number): Promise<Todo> => {
  await sleep(500);
  if (Math.random() < 0.2) {
    throw new Error('Failed to toggle todo.');
  }
  const db = await getDb();
  const stmt = db.prepare(
    'UPDATE todos SET completed = CASE completed WHEN 1 THEN 0 ELSE 1 END WHERE id = ?;',
  );
  runStatement(stmt, [id]);
  const todo = getTodoById(db, id);
  persistDb(db);
  if (!todo) {
    throw new Error('Todo not found.');
  }
  return todo;
};

export const updateTodoText = async (
  id: number,
  text: string,
): Promise<Todo> => {
  await sleep(500);
  if (Math.random() < 0.2) {
    throw new Error('Failed to update todo text.');
  }
  const db = await getDb();
  const stmt = db.prepare('UPDATE todos SET text = ? WHERE id = ?;');
  runStatement(stmt, [text, id]);
  const todo = getTodoById(db, id);
  persistDb(db);
  if (!todo) {
    throw new Error('Todo not found.');
  }
  return todo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await sleep(500);
  if (Math.random() < 0.2) {
    throw new Error('Failed to delete todo.');
  }
  const db = await getDb();
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?;');
  runStatement(stmt, [id]);
  persistDb(db);
};
