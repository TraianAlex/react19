import { useState } from 'react';
import { readFileAction, queryDatabaseAction } from './serverActions';
import AppHeaderClock from './app-header-clock';

/**
 * IMPORTANT NOTES:
 *
 * 1. 'use server' directive is for Server ACTIONS (functions), not components
 * 2. In a standard React app (Vite), Server Actions require proper setup
 * 3. For file/DB access, you typically need:
 *    - Next.js (has built-in Server Actions support)
 *    - OR a backend API endpoint
 *    - OR Vite with SSR plugin configured
 *
 * This example shows the pattern, but may not work in a pure client-side React app
 */
export default function AppHeaderWithServerAction() {
  const [fileContent, setFileContent] = useState<string>('');
  const [dbData, setDbData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleReadFile = async () => {
    setLoading(true);
    try {
      // This would work in Next.js or with proper Server Actions setup
      const content = await readFileAction('./some-file.txt');
      setFileContent(content);
    } catch (error) {
      console.error('Failed to read file:', error);
      setFileContent(
        'Error: Server Actions may not be fully supported in this setup'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQueryDB = async () => {
    setLoading(true);
    try {
      const data = await queryDatabaseAction('SELECT * FROM users LIMIT 10');
      setDbData(data);
    } catch (error) {
      console.error('Failed to query database:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-light text-dark w-auto p-4'>
      <h2>Clock App with Server Actions</h2>
      <hr />
      <AppHeaderClock isoDateString={new Date().toISOString()} children={undefined} />

      <div className='mt-4'>
        <h3>Server Actions Demo</h3>
        <button
          onClick={handleReadFile}
          disabled={loading}
          className='btn btn-primary me-2'
        >
          Read File
        </button>
        <button
          onClick={handleQueryDB}
          disabled={loading}
          className='btn btn-secondary'
        >
          Query Database
        </button>

        {loading && <p>Loading...</p>}
        {fileContent && <pre>{fileContent}</pre>}
        {dbData.length > 0 && <pre>{JSON.stringify(dbData, null, 2)}</pre>}
      </div>
    </div>
  );
}
