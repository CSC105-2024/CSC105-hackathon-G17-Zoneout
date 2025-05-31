import { Hono } from 'hono';
import * as userController from '../controllers/user.controller.ts';
import { authenticateToken } from '../middlewares/auth.middleware.ts';

const userRouter = new Hono();

userRouter.post('/signup', userController.registerController);
userRouter.post('/login', userController.loginController);
userRouter.post('/logout', userController.logoutController);

userRouter.get(
  '/current',
  authenticateToken,
  userController.getCurrentUserController
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
  '/:userId/update-profile',
  authenticateToken,
  userController.updateProfileController
);

<<<<<<< HEAD
export { userRouter };
=======
userRouter.get('/current', authenticateToken, userController.getCurrentUserController);
userRouter.put('/:userId/update-phone', authenticateToken, userController.updatePhonenumberController);
userRouter.put('/:userId/update-name', authenticateToken,userController.updateUsernameController);
userRouter.put('/:userId/update-profile', authenticateToken , userController.updateProfileController);

export { userRouter };
>>>>>>> b131e3cdf4b1fd380b9531f8b44d373937a182be
