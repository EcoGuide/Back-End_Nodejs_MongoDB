import passport from 'passport';
import User from '../model/User.js'; // Assurez-vous de pointer vers votre modèle utilisateur
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
 dotenv.config();
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.ClIENT_SECRECT
const secretKey = process.env.SECRET_KEY;

import { Strategy as FacebookStrategy } from 'passport-facebook';
 const facebookOptions = {
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails', 'photos'],
    enableProof: true
  };
  
     // Vous devriez chercher ou créer l'utilisateur dans votre base de données ici
   const facebookCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });
    if (!user) {
         user = await User.create({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
        });
    }
    console.log(user);
    // Maintenant, on génère un JWT pour l'utilisateur trouvé ou créé
    const payload = { id: user.facebookId, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    done(null, { user: payload, token });

  } catch (error) {
    done(error, null);
  }
     
  };
 
 


        
  
  
  passport.use(new FacebookStrategy(facebookOptions, facebookCallback));
  
  export default passport;
//---------------------------------------------------------------//---------------------------------------------------------------
// passport.use(new FacebookStrategy.Strategy({
//     clientID: clientID,
//     clientSecret: clientSecret,
//     callbackURL: 'http://localhost:3000/auth/facebook/callback',
//     profileFields: ['id', 'emails', 'name'], // Demandez les permissions nécessaires
//     scope: ['email', 'public_profile'] // Spécifiez les autorisations requises ici

// },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOne({ facebookId: profile.id }, function(err, user) {
//       if (err) return done(err);
//       if (user) return done(null, user);

//       const newUser = new User({
//         email: profile.emails[0].value,
//         name: profile.displayName,
//         // password: profile.password[0].value, // Vous pouvez générer un mot de passe aléatoire ou laisser ce champ vide
//         role: 'user' // Rôle par défaut
//       });

//       newUser.save(function(err) {
//         if (err) return done(err);
//         return done(null, newUser);
//       });
//     });
//   }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// export default passport;
