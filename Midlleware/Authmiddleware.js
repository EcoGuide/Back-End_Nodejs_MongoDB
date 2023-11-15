import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
 dotenv.config();

const secretKey = process.env.SECRET_KEY;

//-------------VERIFY Islogged----------------
const verifyToken = (req, res, next) => {

    const header = req.header('Authorization');
    const token = header.split(' ')[1];  
    console.log('------------------');  
   
    if (!token) {
      return res.status(401).send('Access Denied');
    }
  else{
    
    const decoded = jwt.verify(token,secretKey);
    console.log(decoded);
    req.user = decoded;
    next();
    }
   
  return next();
  };

  //-------------VERIFY ROLE----------------

// const verifyRole = (req ,res, next)=>{
 
//     const header = req.header('Authorization');
//     console.log(header); // tested succefully
//     const token = header.split(' ')[1];
//     if(!token){
//         res.status(400).json("U should enter a token")
//     }else
//     try {
//       const decodedToken = jwt.verify(token, 'secretKey');
//       // decodedToken contient les informations du payload, y compris le rôle de l'utilisateur
      
//       if (decodedToken.role !== 'admin') {
//           res.status(401).json(' you are not authorized to view this !!!')
//       } else {
//         req.user = decoded;
//         next();
//       }
//   } catch (error) {
//      res.status(501)
//   }
    
  
//   }
  
  export default  verifyToken  ;
 
