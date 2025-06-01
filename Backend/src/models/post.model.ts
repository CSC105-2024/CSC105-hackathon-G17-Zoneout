import { db } from '../index.ts';

const createPost = async ({
  userId,
  content,
  latitude,
  longitude,
  category,
  icon,
  isEvent,
  expiresAt,
}: {
  userId: number;
  content: string;
  latitude: number;
  longitude: number;
  category: string;
  isEvent?: boolean;
  icon?: string;
  expiresAt: Date;
}) => {
  const newPost = await db.post.create({
    data: {
      userId,
      content,
      latitude,
      longitude,
      category,
      isEvent: isEvent || false,
      icon,
      expiresAt,
    },
  });

  return { success: true, message: 'Post saved', post: newPost };
};

export { createPost };

const getPostsByUserId = async (userId: number) => {
  const posts = await db.post.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return posts;
};

export { getPostsByUserId };

const editPost = async (
  postId: number,
  {
    content,
    latitude,
    longitude,
    category,
    isEvent,
    expiresAt,
  }: {
    content?: string;
    latitude?: number;
    longitude?: number;
    category?: string;
    isEvent?: boolean;
    expiresAt?: Date;
  }
) => {
  const updatedPost = await db.post.update({
    where: { id: postId },
    data: {
      content,
      latitude,
      longitude,
      category,
      isEvent,
      expiresAt,
    },
  });

  return { success: true, message: 'Post updated', post: updatedPost };
};

export { editPost };

const deletePost = async (postId: number) => {
  return await db.post.delete({ where: { id: postId } });
};

export { deletePost }; 