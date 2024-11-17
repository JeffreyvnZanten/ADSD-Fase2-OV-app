import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { readFileSync } from 'fs';
import path from 'path';

const client = createClient({
  url: 'file:sqlite.db',  // Local SQLite file
});

const db = drizzle(client);

async function initializeDatabase() {
  try {
    console.log('Database file path:', path.resolve('sqlite.db'));
    // Check if table exists
    const tableResult = await client.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='stations'"
    );

    if (tableResult.rows.length === 0) {
      console.log('Creating database schema...');
      const schema = readFileSync(path.join(__dirname, 'schema.sql'), { encoding: 'utf-8' });
      await client.execute(schema);
      console.log('Database schema created');
    } else {
      console.log('Database schema already exists');
      
      // Check if data exists
      const dataCount = await client.execute('SELECT COUNT(*) as count FROM stations');
      if (dataCount.rows[0].count === 0) {
        console.log('Inserting initial data...');
        const insertSQL = `
          INSERT INTO stations (id, name, code, city, platform, exit) VALUES
          (1, 'Station Amsterdam Centraal', 'AMS', 'Amsterdam', 'Perron 5', 'Hoofduitgang'),
          (2, 'Station Rotterdam Centraal', 'RTD', 'Rotterdam', 'Perron 3', 'Noorduitgang'),
          (3, 'Station Utrecht Centraal', 'UTC', 'Utrecht', 'Perron 12', 'Zuiduitgang'),
          (4, 'Station Den Haag Centraal', 'DHG', 'Den Haag', 'Perron 7', 'Westuitgang'),
          (5, 'Station Eindhoven Centraal', 'EHV', 'Eindhoven', 'Perron 2', 'Oostuitgang'),
          (6, 'Station Arnhem Centraal', 'ARN', 'Arnhem', 'Perron 1', 'Hoofduitgang')
        `;
        await client.execute(insertSQL);
        console.log('Initial data inserted');
      }
    }

    const stations = await client.execute('SELECT COUNT(*) as count FROM stations');
    console.log('Number of stations in database:', stations.rows[0].count);
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export { db, client, initializeDatabase };