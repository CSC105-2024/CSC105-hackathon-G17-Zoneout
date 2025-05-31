import { Hono } from 'hono';
import * as userController from '../controllers/user.controller.ts';
import { authMiddleware } from '../middlewares/middleware.auth.ts'

const userRouter = new Hono();

userRouter.post('/signup', userController.registerController);
userRouter.post('/login', userController.loginController);
userRouter.post('/logout', userController.logoutController);
userRouter.get(
  '/current',
  authMiddleware,
  userController.getCurrentUserController
);
userRouter.put('/update-phone', userController.updatePhonenumberController);
userRouter.put('/update-name', userController.updateUsernameController);
userRouter.put(
  '/update-profile',
  authMiddleware,
  userController.updateProfileController
);

export { userRouter };