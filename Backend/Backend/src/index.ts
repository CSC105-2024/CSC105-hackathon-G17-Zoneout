import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/index.js';
import dotenv from 'dotenv';
import { cors } from 'hono/cors';
import { router } from './routes/index.routes.js';

dotenv.config();
const app = new Hono();
export const db = new PrismaClient();

app.use('/*', cors());

// Connect to database and start server
async function startServer() {
  try {
    await db.$connect();
    console.log('Connected to the database');

    serve({
      fetch: app.fetch,
      port: 3000,
    }, (info) => {
      console.log(`Server is running on port ${info.port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

app.route('/api', router);

// Start the server
startServer();