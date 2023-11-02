  
 const { Router } = require('express');
 const authController = require('../controller/authController');
 const reset_password = require('../controller/Reset_passowrd');
 const { swaggerUi, specs } = require('../Swagger_Config');

 require('dotenv').config(); // Chargez les variables d'environnement
 const router = Router();


// -------------------------- --- Middleware ----------------------------
 const verifyToken  = require('../Midllware/Authmiddleware');  
 const verifyRole  = require('../Midllware/IsAdmin');  
// ---------------------------- Configuration MULTER -----------------------------
const multer = require('../Midllware/multer-config');
const upload = require('../Midllware/multer-config');

// Utilisation de multerConfig.getAll, multerConfig.addOnce, etc. pour accéder aux fonctions exportées
const getAll = multer.getAll;
const addOnce = multer.addOnce;
const getOnce = multer.getOnce;
const putAll = multer.putAll;
const patchOnce = multer.patchOnce;
const deleteOnce = multer.deleteOnce;


 //--------------VARIABLES-------------------
 const secretKey = process.env.SECRET_KEY
 const EXPIRED_TOKEN = 3 * 24 * 60 * 60
 
 //--------------Principal Routes------------
 /**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints d'authentification
 */

/**
 * @swagger
 * /signupA:
 *   post:
 *     summary: Inscription d'un administrateur
 *     tags: [Auth]
 *     description: Endpoint pour inscrire un administrateur.
 *     requestBody:
 *       description: Données d'inscription de l'administrateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Succès, administrateur inscrit avec succès
 *       400:
 *         description: Erreur, données d'inscription invalides
 */
router.post('/signupA',upload, authController.signup_Amdin);
   
/**
 * @swagger
 * /signupU:
 *   post:
 *     summary: Inscription d'un administrateur
 *     tags: [Auth]
 *     description: Endpoint pour inscrire un administrateur.
 *     requestBody:
 *       description: Données d'inscription de l'administrateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               image:
 *                 type: string  # Supposons que l'image soit une URL vers l'image téléchargée
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       200:
 *         description: Succès, administrateur inscrit avec succès
 *       400:
 *         description: Erreur, données d'inscription invalides
 */

router.post('/signupU', upload, authController.signup_User);


  router.post('/SignIn', authController.SignIn);
  router.get('/logout', authController.logout);
  router.put('/EditProfile',verifyToken, authController.EditProfile);


 //--------------Forget -/- Reset Password Routes------------
//  router.get('/forgot-passowrd', reset_password.forgot_password_View);
 router.post('/forgot-password',  reset_password.forgot_password);
 router.get('/reset-password/:id/:token',reset_password.reset_password_View)
 
 router.post('/reset-password/:id/:token',reset_password.reset_password);
 router.post('/reset-password/:Userid',reset_password.reset_user_password);

//---------------Sending Verification Mail----------------------
  router.get('/verify/:userId',authController.verificationMail)
  router.get('/verified',authController.FileVerification)

  

  // ------------Testting Routes-------------
  router.get('/authMid',verifyToken, authController.test);
  router.get('/IsAdmin' ,verifyRole, authController.verifyRole); 

 // router.get('/test', verifyToken,authController.test);  
  


 
module.exports = router;





//  router.post("/signIn", async (req, res) => {

//     try {
//       const { email, password } = req.body;
  
//       if (!(email && password)) {
//         res.status(400).send("All input is required");
//       }
//       const user = await User.findOne({ email });
  
//       if (user && (await bcrypt.compare(password, user.password))) {

//         const token = jwt.sign(
//           { user_id: user._id, email },
//           secretKey,
//           {
//             expiresIn: EXPIRED_TOKEN,
//           }
//         );
//          user.token = token;
//         res.status(200).json(user);
//       }
//       res.status(400).send("Invalid Credentials");
//     } catch (err) {
//       console.log(err);
//     }
//     // Our register logic ends here
//   });