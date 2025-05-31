import { Hono } from 'hono';
import * as postController from '../controllers/post.controller.ts';
import { authenticateToken } from '../middlewares/auth.middleware.ts';

const postRouter = new Hono();

postRouter.use('/*', authenticateToken);

postRouter.get('/', postController.getAllPosts);
postRouter.post('/create-post', postController.createPost);
postRouter.get('/user/:userId', postController.getPostsByUser);
postRouter.put('/edit-post/:postId', postController.editPost);
postRouter.delete('/delete-post/:postId', postController.deletePost);

export { postRouter };