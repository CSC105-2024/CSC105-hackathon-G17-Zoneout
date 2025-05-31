import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/index.js';
import dotenv from 'dotenv';
import { mainRouter } from './routes/index.route.ts';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { userRouter } from './routes/user.route.ts';

dotenv.config();
const app = new Hono();
export const db = new PrismaClient();

app.use(
  cors({
    origin: 'http://localhost:8080',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(logger());

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
db.$connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.route('', mainRouter);
app.route('', userRouter);