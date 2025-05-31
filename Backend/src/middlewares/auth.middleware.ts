import type { Context } from 'hono';
import type { Next } from 'hono';
import jwt from 'jsonwebtoken';
import { getCookie } from 'hono/cookie';

// Extend the Context type to include user
declare module 'hono' {
  interface ContextVariableMap {
    user: {
      id: string;
      email: string;
    };
  }
}
export const authenticateToken = async (c: Context, next: Next) => {
  try {
    let token: string | undefined;

    // 1. Try Authorization header
    const authHeader = c.req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // 2. If not found, try HttpOnly cookie
    if (!token) {
      token = getCookie(c, 'accessToken');
    }

    if (!token) {
      return c.json({ error: 'No token provided' }, 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      email: string;
    };

    c.set('user', {
      id: decoded.id,
      email: decoded.email,
    });

    await next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return c.json({ error: 'Invalid token' }, 401);
    }
    return c.json({ error: 'Authentication failed' }, 401);
  }
};
