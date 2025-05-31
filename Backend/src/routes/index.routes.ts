import { Hono } from 'hono';
import { postRouter } from './post.routes.ts';
import { userRouter } from './user.route.ts';

const router = new Hono();

// Mount all routers
router.route('/users',userRouter)
router.route('/posts', postRouter);

export { router }; 