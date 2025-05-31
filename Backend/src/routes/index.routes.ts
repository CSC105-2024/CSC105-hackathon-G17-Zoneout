import { Hono } from 'hono';
import { postRouter } from './post.routes.ts';
// Import other routers here as needed

const router = new Hono();

// Mount all routers
router.route('/posts', postRouter);
// Mount other routers here as needed

export { router }; 