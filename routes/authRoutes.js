import { Router } from 'express';
import authController from '../controller/authController.js';
import reset_password from '../controller/Reset_passowrd.js';
import dotenv from 'dotenv';
import verifyToken  from '../Midllware/Authmiddleware.js';
import verifyRole  from '../Midllware/IsAdmin.js';
import multer from '../Midllware/multer-config.js';
import passport from '../Midllware/passport.js';
// import upload from '../Midllware/multer-config.js';
import User from '../model/User.js'
dotenv.config();
const router = Router();
const secretKey = process.env.SECRET_KEY;

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
router.get('/IsAdmin', verifyRole, authController.verifyRole);

// Route pour s'inscrire ou se connecter avec Facebook
 

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/auth/facebook', passport.authenticate('facebook'));
// Route de rappel après l'authentification avec Facebook
// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/signupU' }),
//   function(req, res) {
//     res.redirect('/');
//   }
// );
// router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/' }), authController.signupOrLoginWithFacebook);
// Route pour gérer la réponse de Facebook après l'autorisation
// Votre route de rappel pour Facebook
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signupU' }),
  (req, res) => {
    // L'utilisateur est correctement authentifié ici
    // Vous pouvez accéder aux données de l'utilisateur depuis req.user

    // Vérifiez si l'utilisateur existe dans la base de données
    User.findOne({ facebookId: req.user.facebookId }, (err, existingUser) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
      }

      if (existingUser) {
        console.log("existingUser"+existingUser);
        // L'utilisateur existe déjà, vous pouvez générer un token JWT et le renvoyer
        const token = jwt.sign({ userId: existingUser._id }, secretKey, { expiresIn: '1h' });
        return res.json({ token });
      }

      // L'utilisateur n'existe pas encore, créez-le dans la base de données
      const newUser = new User({
        facebookId: req.user.facebookId,
        email: req.user.email,
        name: req.user.displayName,
        role:"user"
        // Vous pouvez également ajouter d'autres champs d'utilisateur ici
      });
console.log("newUser"+newUser);
      newUser.save((err) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement de l\'utilisateur' });
        }

        // Utilisateur enregistré avec succès, générez un token JWT et le renvoyer
        const token = jwt.sign({ userId: newUser._id }, 'votre-clé-secrète', { expiresIn: '1h' });
        return res.json({ token });
      });
    });});

export default router;
