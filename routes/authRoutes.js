import { Router } from 'express';
import authController from '../controller/authController.js';
import reset_password from '../controller/Reset_passowrd.js';
import dotenv from 'dotenv';
import verifyToken  from '../Midllware/Authmiddleware.js';
import verifyRole  from '../Midllware/IsAdmin.js';

import multer from '../Midllware/multer-config.js';
// import upload from '../Midllware/multer-config.js';

dotenv.config();
const router = Router();

// ... (votre code existant)

router.post('/signupA',multer, authController.signup_Amdin);
router.post('/signupU',multer , authController.signup_User);
router.post('/SignIn', authController.SignIn);  
router.get('/logout', authController.logout);
router.post('/EditProfile', verifyToken,authController.EditProfile);
router.post('/forgot-password', reset_password.forgot_password);
// router.get('/reset-password/:id/:token', reset_password.reset_password_View);
router.post('/reset-password/:id/:token', reset_password.reset_password);
router.get('/verify/:userId', authController.verificationMail);
router.get('/verified', authController.FileVerification);
// router.get('/authMid', verifyToken, authController.test);
router.get('/IsAdmin', verifyRole, authController.verifyRole);

export default router;
[]