import { Hono } from 'hono';
import * as userController from '../controllers/user.controller.ts';
import { authenticateToken } from '../middlewares/auth.middleware.ts';

const userRouter = new Hono();

userRouter.post('/signup', userController.registerController);
userRouter.post('/login', userController.loginController);
userRouter.post('/logout', userController.logoutController);


<<<<<<< HEAD
=======
userRouter.post('/logout', userController.logoutController);
>>>>>>> 9b51211d523c5252482ded504629574508c4f82c
userRouter.get('/current', authenticateToken, userController.getCurrentUserController);
userRouter.put('/:userId/update-phone', authenticateToken, userController.updatePhonenumberController);
userRouter.put('/:userId/update-name', authenticateToken,userController.updateUsernameController);
userRouter.put('/:userId/update-profile', authenticateToken , userController.updateProfileController);

export { userRouter };