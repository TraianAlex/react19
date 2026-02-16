import { useCallback, useState } from 'react';
import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

type UserRow = {
  id: number;
  name: string;
  email: string;
};

export default function AppHeaderWithSqlJs() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDemo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const SQL = await initSqlJs({ locateFile: () => wasmUrl });
      const db = new SQL.Database();

      db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);');
      db.run(
        "INSERT INTO users (name, email) VALUES ('Ada Lovelace', 'ada@example.com');"
      );
      db.run(
        "INSERT INTO users (name, email) VALUES ('Grace Hopper', 'grace@example.com');"
      );

      const result = db.exec('SELECT id, name, email FROM users ORDER BY id;');
      const [table] = result;

      if (table) {
        const mappedRows = table.values.map((value) => ({
          id: Number(value[0]),
          name: String(value[1]),
          email: String(value[2]),
        }));
        setRows(mappedRows);
      } else {
        setRows([]);
      }

      db.close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className='bg-light text-dark w-auto p-4'>
      <h2>App with sql.js (WASM)</h2>
      <hr />
      <div className='mt-4'>
        <h4>SQLite in the Browser</h4>
        <button
          type='button'
          onClick={runDemo}
          className='btn btn-primary me-2'
          disabled={loading}
        >
          Run SQL Demo
        </button>

        {loading && <p>Loading...</p>}
        {error && <p className='text-danger'>Error: {error}</p>}
        {rows.length > 0 && (
          <pre>{JSON.stringify(rows, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
