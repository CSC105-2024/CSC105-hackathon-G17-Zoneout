import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/index.js';
import dotenv from 'dotenv';
import { cors } from 'hono/cors';
import { router } from './routes/index.routes.ts';

dotenv.config();
const app = new Hono();
export const db = new PrismaClient();

app.use('/*', cors());

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Server is running on port ${info.port}`);
});

db.$connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.route('/api', router);