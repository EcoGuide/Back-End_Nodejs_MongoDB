console.log("Backend Mobile App");

import express from 'express';
import mongoose from 'mongoose';
 import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { serveSwaggerUI, setupSwaggerUI } from './Swagger_Config.js';
import authRoutes from './routes/authRoutes.js'
const app = express();
import { Blacklist } from './model/BlackList.js';


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

const port = 3000;
const dbURI = 'mongodb+srv://fedibr:fedibr28@cluster0.38xgvkm.mongodb.net/mongodb';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => {
    console.log('Connecté à la base de données MongoDB');
    app.listen(port, () => {
      console.log(`Serveur en cours d'exécution sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données MongoDB :', err);
  });

app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, "../View/facebook.html"));
});

app.use(authRoutes);
app.use('/api-docs', serveSwaggerUI, setupSwaggerUI);
