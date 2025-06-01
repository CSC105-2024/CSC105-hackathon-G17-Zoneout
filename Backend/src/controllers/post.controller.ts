import type { Context } from 'hono';
import * as postModel from '../models/post.model.ts';
import { db } from '../index.ts';

type CreatePostBody = {
  content: string;
  latitude: number;
  longitude: number;
  category: string;
  icon: string;
  isEvent?: boolean;
  expiresAt: string;
};

export const createPost = async (c: Context) => {
  try {
    const body = await c.req.json<CreatePostBody>();
    const user = c.get('user');

    const { content, latitude, longitude, category, isEvent, icon, expiresAt } =
      body;

    if (!content || !latitude || !longitude || !category || !expiresAt) {
      return c.json(
        {
          success: false,
          data: null,
          msg: 'Missing required fields',
        },
        400
      );
    }

    const result = await postModel.createPost({
      userId: Number(user.id),
      content,
      latitude,
      longitude,
      category,
      icon,
      isEvent,
      expiresAt: new Date(expiresAt),
    });

    return c.json({
      success: true,
      data: result.post,
      msg: 'Post created successfully!',
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      500
    );
  }
};

export const getPostsByUser = async (c: Context) => {
  try {
    const userId = Number(c.req.param('userId'));

    if (isNaN(userId)) {
      return c.json(
        {
          success: false,
          data: null,
          msg: 'Invalid user ID',
        },
        400
      );
    }

    const posts = await postModel.getPostsByUserId(userId);

    return c.json({
      success: true,
      data: posts,
      msg: 'Fetched posts successfully',
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      500
    );
  }
};

type EditPostBody = {
  content?: string;
  category?: string;
  expiresAt?: string;
};

export const editPost = async (c: Context) => {
  try {
    console.log('Editing post...', c.req.param('postId'));
    const postId = Number(c.req.param('postId'));
    const body = await c.req.json<EditPostBody>();
    console.log('Editing body...', body);

    const user = c.get('user');

    if (isNaN(postId)) {
      return c.json(
        { success: false, data: null, msg: 'Invalid post ID' },
        400
      );
    }

    const posts = await postModel.getPostsByUserId(Number(user.id));
    const postToEdit = posts.find((post) => post.id === postId);

    if (!postToEdit) {
      return c.json(
        { success: false, data: null, msg: 'Post not found or not authorized' },
        404
      );
    }

    const updated = await postModel.editPost(postId, {
      ...body,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
    });

    return c.json({
      success: true,
      data: updated.post,
      msg: updated.message,
    });
  } catch (e) {
    return c.json(
      { success: false, data: null, msg: `Internal Server Error: ${e}` },
      500
    );
  }
};

export const deletePost = async (c: Context) => {
  try {
    const postId = Number(c.req.param('postId'));
    const user = c.get('user'); // Get authenticated user from context

    if (isNaN(postId)) {
      return c.json(
        { success: false, data: null, msg: 'Invalid post ID' },
        400
      );
    }

    // First get the post to check ownership
    const posts = await postModel.getPostsByUserId(Number(user.id));
    const postToDelete = posts.find((post) => post.id === postId);

    if (!postToDelete) {
      return c.json(
        { success: false, data: null, msg: 'Post not found or not authorized' },
        404
      );
    }

    const deleted = await postModel.deletePost(postId);

    return c.json({
      success: true,
      data: deleted,
      msg: 'Post deleted successfully',
    });
  } catch (e) {
    return c.json(
      { success: false, data: null, msg: `Internal Server Error: ${e}` },
      500
    );
  }
};

export const getAllPosts = async (c: Context) => {
  try {
    const posts = await db.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      data: posts,
      msg: 'Posts fetched successfully',
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      500
    );
  }
};
