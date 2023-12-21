import express from 'express';
import userController from '../controllers/auth/auth.controller';
const router = express.Router()

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/signin-with-otp', userController.signInWithOtp);
router.get('/user/:userId', userController.getUser);
router.post('/signout', userController.signOut);

export default router;