import { Router } from 'express';
import authController from '../controller/authController.js';
import reset_password from '../controller/Reset_passowrd.js';
import dotenv from 'dotenv';
import verifyToken  from '../Midlleware/Authmiddleware.js';
import verifyRole  from '../Midlleware/IsAdmin.js';
import multer from '../Midlleware/multer-config.js';
import passport from '../Midlleware/passport.js';
// import upload from '../Midllware/multer-config.js';
import User from '../model/User.js'
 const router = Router();
const secretKey = process.env.SECRET_KEY;
  dotenv.config();
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.ClIENT_SECRECT
const REDIRECT_URI = '<http://localhost:3000/auth/facebook/callback>';

router.post('/signupA', authController.signup_Amdin);
router.post('/signupU',multer , authController.signup_User);
router.post('/signupGuide' , authController.signup_Guide);

router.post('/SignIn', authController.SignIn);  
router.get('/logout',authController.logout);
 router.post('/EditProfile',authController.EditProfile);
 router.get('/UserDetails',authController.UserDetails);


router.post('/forgot-password', reset_password.forgot_password);
router.post('/forgot-password-sms', reset_password.forgot_password_sms);

// router.get('/reset-password/:id/:token', reset_password.reset_password_View);
router.post('/reset-password', reset_password.reset_password);
router.get('/verify/:userId', authController.verificationMail);
router.get('/verified', authController.FileVerification);
// router.get('/authMid', verifyToken, authController.test);
router.get('/IsAdmin', verifyRole, authController.verifyRole);
router.get('/IsAdmin', verifyRole, authController.verifyRole);

// Route pour s'inscrire ou se connecter avec Facebook
 

// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook', (req, res) => {
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${clientID}&redirect_uri=${REDIRECT_URI}&scope=email`;
  res.redirect(url);
});
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

router.get('/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Échange du code d'autorisation contre un token d'accès
    const accessTokenResponse = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token`, {
      params: {
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: REDIRECT_URI,
        code: code
      }
    });

    const accessToken = accessTokenResponse.data.access_token;

    // Utilisation du token d'accès pour récupérer le profil de l'utilisateur
    const profileResponse = await axios.get(`https://graph.facebook.com/v13.0/me`, {
      params: {
        fields: 'name,email',
        access_token: accessToken
      }
    });

    const userProfile = profileResponse.data;

    // Vous pouvez maintenant utiliser userProfile pour authentifier l'utilisateur dans votre système
    // ...

    res.redirect('/');
  } catch (error) {
    console.error('Erreur lors de l’obtention du token d’accès:', error.message);
    // res.redirect('/login');
  }
});

// router.get('/auth/facebook/callback', async (req, res) => {
//   const { code } = req.query;

//   try {
//     // Exchange authorization code for access token
//     const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}&redirect_uri=${REDIRECT_URI}`);

//     const { access_token } = data;

//     // Use access_token to fetch user profile
//     const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);

//     // Code to handle user authentication and retrieval using the profile data

//     res.redirect('/');
//   } catch (error) {
//     console.error('Error:', error.response.data.error);
//     res.redirect('/login');
//   }
// });

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/signupU' }),
//   (req, res) => {
//     // L'utilisateur est correctement authentifié ici
//     // Vous pouvez accéder aux données de l'utilisateur depuis req.user

//     // Vérifiez si l'utilisateur existe dans la base de données
//     User.findOne({ facebookId: req.user.facebookId }, (err, existingUser) => {
//       if (err) {
//         return res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
//       }

//       if (existingUser) {
//         console.log("existingUser"+existingUser);
//         // L'utilisateur existe déjà, vous pouvez générer un token JWT et le renvoyer
//         const token = jwt.sign({ userId: existingUser._id }, secretKey, { expiresIn: '1h' });
//         return res.json({ token });
//       }

//       // L'utilisateur n'existe pas encore, créez-le dans la base de données
//       const newUser = new User({
//         facebookId: req.user.facebookId,
//         email: req.user.email,
//         name: req.user.displayName,
//         role:"user"
//         // Vous pouvez également ajouter d'autres champs d'utilisateur ici
//       });
// console.log("newUser"+newUser);
//       newUser.save((err) => {
//         if (err) {
//           return res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement de l\'utilisateur' });
//         }

//         // Utilisateur enregistré avec succès, générez un token JWT et le renvoyer
//         const token = jwt.sign({ userId: newUser._id }, 'votre-clé-secrète', { expiresIn: '1h' });
//         return res.json({ token });
//       });
//     });});

export default router;
[]