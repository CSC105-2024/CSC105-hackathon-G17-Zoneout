import type {
  Context,
  CreateUserBody,
  UserResponse,
  ApiResponse,
} from '../types/user.types.ts';
import { db } from '../index.ts';
import {
  createUser,
  generateRefreshToken,
  generateToken,
  changeName,
  changePhoneNumber,
  ispasswordMatch,
  updateUser,
  getUserPosts,
} from '../models/user.model.ts';
import { setCookie, deleteCookie } from 'hono/cookie';
import jwt from 'jsonwebtoken';

const createSuccessResponse = <T>(
  data: T,
  message: string
): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

const createErrorResponse = (message: string): ApiResponse => ({
  success: false,
  data: null,
  message,
});

export const getCurrentUserController = async (c: Context) => {
  const cUser = c.get('user');
  if (!cUser) return c.json(createErrorResponse('Unauthorized'), 401);

  const user = await db.user.findUnique({
    where: { id: Number(cUser.id) },
    select: { id: true, name: true, email: true, phone: true },
  });

  if (!user) return c.json(createErrorResponse('User not found'), 404);
  return c.json(createSuccessResponse(user, 'User retrieved successfully'));
};

export const registerController = async (c: Context) => {
  try {
    const body = await c.req.json<CreateUserBody>();
    const { email, name, password, phone } = body;

    if (!email || !name || !password || !phone) {
      return c.json(createErrorResponse('Missing required fields'), 400);
    }

    const result = await createUser(email, password, name, phone);
    if (!result.success) {
      return c.json(createErrorResponse('User already exists'), 409);
    }

    return c.json(createSuccessResponse(result.user, 'Created new user!'));
  } catch (e) {
    console.error('Registration error:', e);
    return c.json(createErrorResponse('Internal server error'), 500);
  }
};

export const loginController = async (c: Context) => {
  try {
    const body = await c.req.json<CreateUserBody>();
    const { email, password } = body;

    if (!email || !password) {
      return c.json(createErrorResponse('Missing required fields'), 400);
    }

    const existingUser = await db.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      return c.json(createErrorResponse('User not found'), 404);
    }

    const isPasswordMatch = await ispasswordMatch(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return c.json(createErrorResponse('Invalid password'), 401);
    }

    const accessToken = generateToken({
      id: existingUser.id.toString(),
      email: existingUser.email,
      name: existingUser.name ?? '',
    });
    const refreshToken = generateRefreshToken(existingUser.id.toString());
    console.log('Access Token:', accessToken);
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });

    const userResponse: UserResponse = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    };

    const isProduction = process.env.NODE_ENV === 'production';
    setCookie(c, 'accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
    });
    setCookie(c, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
    });

    return c.json(
      createSuccessResponse(
        {
          ...userResponse,
          accessToken,
        },
        'Login successful'
      )
    );
  } catch (e) {
    console.error('Login error:', e);
    return c.json(createErrorResponse('Internal server error'), 500);
  }
};

export const logoutController = async (c: Context) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';

    deleteCookie(c, 'accessToken', {
      httpOnly: true,
      secure: isProduction,
      path: '/',
    });

    deleteCookie(c, 'refreshToken', {
      httpOnly: true,
      secure: isProduction,
      path: '/',
    });

    return c.json(createSuccessResponse(null, 'Logged out successfully'));
  } catch (e) {
    console.error('Logout error:', e);
    return c.json(createErrorResponse('Internal server error'), 500);
  }
};

export const refreshTokenController = async (c: Context) => {
  try {
    const cookies = c.req.header('Cookie') || '';
    const refreshToken = cookies
      .split('; ')
      .find((row: string) => row.startsWith('refreshToken='))
      ?.split('=')[1];

    if (!refreshToken) {
      return c.json(createErrorResponse('Refresh token not found'), 401);
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!
    ) as { id: string };

    if (!decoded?.id) {
      return c.json(createErrorResponse('Invalid refresh token'), 401);
    }

    const user = await db.user.findUnique({
      where: { id: Number(decoded.id) },
    });

    if (!user) {
      return c.json(createErrorResponse('User not found'), 404);
    }

    const newAccessToken = generateToken({
      id: user.id.toString(),
      email: user.email,
      name: user.name ?? '',
    });

    const newRefreshToken = generateRefreshToken(user.id.toString());

    // Save new tokens to database
    await db.user.update({
      where: { id: user.id },
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });

    const isProduction = process.env.NODE_ENV === 'production';

    setCookie(c, 'accessToken', newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'Lax',
      path: '/',
    });

    setCookie(c, 'refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'Lax',
      path: '/',
    });

    return c.json(createSuccessResponse(null, 'Token refreshed successfully'));
  } catch (error) {
    console.error('Refresh token error:', error);
    return c.json(createErrorResponse('Invalid or expired refresh token'), 401);
  }
};

export const updateProfileController = async (c: Context) => {
  try {
    const user = c.get('user');
    if (!user) return c.json(createErrorResponse('Unauthorized'), 401);

    const userId = user.id;
    const body = await c.req.json<Partial<CreateUserBody>>();
    const { name, phone } = body;

    const response = await updateUser(userId, name, phone);
    if (!response.success) {
      return c.json(createErrorResponse(response.message), 400);
    }

    return c.json(
      createSuccessResponse(response.user, 'Profile updated successfully')
    );
  } catch (e) {
    console.error('Update profile error:', e);
    return c.json(createErrorResponse('Internal server error'), 500);
  }
};

export const updatePhonenumberController = async (c: Context) => {
  try {
    if (!c.user) return c.json(createErrorResponse('Unauthorized'), 401);

    const userId = c.req.param('userId');
    if (!userId || Number(userId) !== c.user.id) {
      return c.json(
        createErrorResponse('Unauthorized to update this profile'),
        403
      );
    }

    const user = await db.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return c.json(createErrorResponse('User not found'), 404);
    }

    const { phone } = user;
    if (!phone || typeof phone !== 'string') {
      return c.json(createErrorResponse('Invalid phone number'), 400);
    }

    const result = await changePhoneNumber(userId, phone);
    if (!result.success || !result.user) {
      return c.json(createErrorResponse(result.message), 400);
    }

    const { id, email, name, phone: updatedPhone } = result.user;
    return c.json(
      createSuccessResponse(
        { id, email, name, phone: updatedPhone },
        'Phone number updated successfully'
      )
    );
  } catch (e) {
    console.error('Update phone number error:', e);
    return c.json(createErrorResponse('Internal server error'), 500);
  }
};

export const updateUsernameController = async (c: Context) => {
  try {
    if (!c.user) return c.json(createErrorResponse('Unauthorized'), 401);

    const userId = c.req.param('userId');
    if (!userId || Number(userId) !== c.user.id) {
      return c.json(
        createErrorResponse('Unauthorized to update this profile'),
        403
      );
    }

    const body = await c.req.json<Pick<CreateUserBody, 'name'>>();
    const { name } = body;

    if (!name) {
      return c.json(createErrorResponse('Name is required'), 400);
    }

    const result = await changeName(userId, name);
    if (!result.success || !result.user) {
      return c.json(createErrorResponse(result.message), 400);
    }

    const { id, email, name: updatedName } = result.user;
    return c.json(
      createSuccessResponse(
        { id, email, name: updatedName },
        'Name updated successfully'
      )
    );
  } catch (error) {
    console.error('Update name error:', error);
    return c.json(createErrorResponse('Internal server error'), 500);
  }
};
