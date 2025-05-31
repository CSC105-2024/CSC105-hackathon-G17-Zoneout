import { db } from '../index.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type userPayLoad = {
  id: string;
  email: string;
  name: string;
};
export const hashPassword = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, 10);
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
  phone: string
) => {
  const existingUser = await db.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return {
      success: false,
      message: 'User already exists',
    };
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      phone: phone,
    },
  });
  return { success: true, message: 'User created', user: newUser };
};

export const updateUsername = async (userId: string, newName: string) => {
  const existingUser = await db.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!existingUser) {
    return {
      success: false,
      message: 'User not found',
      user: null,
    };
  }

  const updatedUser = await db.user.update({
    where: { id: Number(userId) },
    data: { name: newName },
  });

  return {
    success: true,
    message: 'Name updated',
    user: updatedUser,
  };
};

export const generateRefreshToken = (userId: string): string => {
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET_KEY;
  if (!refreshSecret) throw new Error('Missing REFRESH_TOKEN_SECRET_KEY');

  return jwt.sign({ id: userId }, refreshSecret, {
    expiresIn: '7d',
  });
};
export const generateToken = (user: userPayLoad): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Missing JWT_SECRET');

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, secret, { expiresIn: '15m' });
};

export const getUserPosts = async (userId: string) => {
  try {
    const userWithPosts = await db.user.findUnique({
      where: { id: Number(userId) },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!userWithPosts) {
      return {
        success: false,
        message: 'User not found',
        posts: null,
      };
    }

    return {
      success: true,
      message: 'Posts retrieved successfully',
      posts: (userWithPosts as typeof userWithPosts & { posts: any[] }).posts,
      user: {
        id: userWithPosts.id,
        name: userWithPosts.name,
        email: userWithPosts.email,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error retrieving posts',
      posts: null,
    };
  }
};

export const updateUser = async (
  userId: string,
  name?: string,
  phone?: string,
  profileEmoji?: string
) => {
  try {
    const updatedUser = await db.user.update({
      where: { id: Number(userId) },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(profileEmoji && { profileEmoji }),
      },
    });
    return {
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      success: false,
      message: 'Error updating user',
      user: null,
    };
  }
};

//to use in changing user first name
export const changeName = async (userId: string, name: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!existingUser) {
      return {
        success: false,
        message: 'User not found',
        user: null,
      };
    }

    const updatedUser = await db.user.update({
      where: { id: Number(userId) },
      data: { name },
    });

    return {
      success: true,
      message: 'Name updated successfully',
      user: updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: 'User not found',
    };
  }
};
export const changePhoneNumber = async (userId: string, userPhone: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!existingUser) {
      return {
        success: false,
        message: 'User not found',
        user: null,
      };
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (userPhone && !phoneRegex.test(userPhone.replace(/[\s\-\(\)]/g, ''))) {
      return {
        success: false,
        message: 'Invalid phone number format',
        user: null,
      };
    }
    const updatedUser = await db.user.update({
      where: { id: Number(userId) },
      data: { phone: userPhone },
    });
    return {
      success: true,
      message: 'Phone number updated successfully',
      user: updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: 'User not found',
    };
  }
};
export const ispasswordMatch = async (
  plainPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};