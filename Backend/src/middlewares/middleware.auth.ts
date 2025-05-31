import type { Context } from 'hono';
import jwt from 'jsonwebtoken';
declare module 'hono' {
  interface Context {
    user?: { id: string };
  }
}

export const authMiddleware = async (c: Context, next: () => Promise<void>) => {
  console.log('here stuipd');
  const cookies = c.req.header('Cookie') || '';
  console.log('Cookies:', cookies);
  const accessToken = cookies
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  if (!accessToken) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as {
      id: string;
    };
    console.log('Decoddded JWT:', decoded.id);
    c.user = { id: decoded.id };
    await next();
  } catch (e) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
};