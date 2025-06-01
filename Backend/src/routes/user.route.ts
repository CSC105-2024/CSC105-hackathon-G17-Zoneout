import { Hono } from 'hono';
import * as userController from '../controllers/user.controller.ts';
import { authenticateToken } from '../middlewares/auth.middleware.ts';

const userRouter = new Hono();

userRouter.post('/signup', userController.registerController);
userRouter.post('/login', userController.loginController);
userRouter.post('/logout', userController.logoutController);
userRouter.post('/refresh-token', userController.refreshTokenController);

userRouter.get(
  '/current',
  authenticateToken,
  userController.getCurrentUserController
);

userRouter.get(
  '/:userId',
  authenticateToken,
  userController.getUserByIdController
);

userRouter.put(
  '/:userId/update-phone',
  authenticateToken,
  userController.updatePhonenumberController
);
userRouter.put(
  '/:userId/update-name',
  authenticateToken,
  userController.updateUsernameController
);

userRouter.put(
  '/update-profile',
  authenticateToken,
  userController.updateProfileController
);

export { userRouter };
