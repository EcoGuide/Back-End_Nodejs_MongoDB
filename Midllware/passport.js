import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import User from '../model/User.js'; // Assurez-vous de pointer vers votre modèle utilisateur
import jwt from 'jsonwebtoken';

passport.use(new FacebookStrategy.Strategy({
    clientID: '638996038437388',
    clientSecret: '34a861df702f65e17e2c2df2b09ca61d',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email', 'public_profile'] // Spécifiez les autorisations requises ici

},
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.id }, function(err, user) {
      if (err) return done(err);
      if (user) return done(null, user);

      const newUser = new User({
        email: profile.emails[0].value,
        name: profile.displayName,
        // password: profile.password[0].value, // Vous pouvez générer un mot de passe aléatoire ou laisser ce champ vide
        role: 'user' // Rôle par défaut
      });

      newUser.save(function(err) {
        if (err) return done(err);
        return done(null, newUser);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

export default passport;
