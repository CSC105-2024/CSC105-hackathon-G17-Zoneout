import { Hono } from 'hono';
import * as postController from '../controllers/post.controller.ts';

const postRouter = new Hono();

postRouter.post('/', postController.createPost);
postRouter.get('/user/:userId', postController.getPostsByUser);
postRouter.put('/:postId', postController.editPost);
postRouter.delete('/:postId', postController.deletePost);
//test

export { postRouter }; 