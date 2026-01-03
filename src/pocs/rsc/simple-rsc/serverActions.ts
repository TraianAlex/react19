'use server';

import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Server Action to read a file from the filesystem
 * Note: This only works if you have a backend server (like Next.js or Express)
 * In a pure client-side React app, you cannot access the filesystem directly
 */
export async function readFileAction(filePath: string): Promise<string> {
  try {
    // This would work in Next.js or a Node.js backend
    // In a standard React app, you'd need an API endpoint instead
    const fileContent = await readFile(join(process.cwd(), filePath), 'utf-8');
    return fileContent;
  } catch (error) {
    throw new Error(`Failed to read file: ${error}`);
  }
}

/**
 * Server Action to query SQLite database
 * Note: This requires a database library like 'better-sqlite3' or 'sql.js'
 * In a standard React app, you'd need an API endpoint instead
 */
export async function queryDatabaseAction(query: string): Promise<any[]> {
  try {
    // Example with better-sqlite3 (would need to be installed)
    // const db = new Database('path/to/database.db');
    // const result = db.prepare(query).all();
    // return result;

    // For demonstration - in a real app, you'd use actual database code
    return [];
  } catch (error) {
    throw new Error(`Database query failed: ${error}`);
  }
}

/**
 * Server Action to get server-side data
 * This is a simple example that could work in Next.js
 */
export async function getServerDataAction(): Promise<{
  message: string;
  timestamp: string;
}> {
  // This runs on the server
  return {
    message: 'Data fetched from server',
    timestamp: new Date().toISOString(),
  };
}
