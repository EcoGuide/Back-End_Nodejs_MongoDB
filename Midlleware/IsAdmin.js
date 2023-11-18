

 import jwt from "jsonwebtoken"
 import express from 'express'
 import morgan from "morgan"
 import dotenv from 'dotenv';
 dotenv.config();
import User from '../model/User.js'
const app = express();

const secretKey = process.env.SECRET_KEY;

 //-------------VERIFY ROLE----------------
   
  const verifyRole = (req ,res, next)=>{
  const header = req.header('Authorization');
  const token = header.split(' ')[1];
   
  try {
    const decodedToken = jwt.verify(token, secretKey);
    console.log("Email   :" + decodedToken.email,"role  :" +  decodedToken.role);

    if (decodedToken.role == "admin") {
        res.status(200).json(' you are allowed  to view this !!!')
        req.User = decodedToken;
        next();
    } else {
      res.status(401).json(' you are  not allowed  to view this !!!')
    }
  } catch (error) {
          res.status(501)
}
}
 export default  verifyRole  
 