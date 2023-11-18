 
 import express from 'express';
const app = express();
import error from 'console' 
import morgan from "morgan"
 app.use(morgan('dev'))
import User from '../model/User.js'
 import UserVerification from '../model/UserVerification.js'
 import logoutU from '../model/Logout.js'

//  ------------------------------------------Require Entity ------------------------------------------
// -------------------------------------------Congiuration ------------------------------------------
import dotenv from 'dotenv';
dotenv.config(); // Chargez les variables d'environnement
import path from 'path'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
  

const email_S = process.env.AUTH_EMAIL;
const secretKey = process.env.SECRET_KEY;
 
import twilio from 'twilio'


// --------------------------------------- USER VERIFICATION CODE -------------------------------------------------------------
// ----------A  ne pas modfidier!!!!!!!!--------------------
// var transporter = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "f1ba4cc13c5aed",
//     pass: "0246564e53d3c2"
//   }
// });
 
var transporter= nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: "fedi.benromdhane@esprit.tn",
    pass: "bmzqluzhxefmqgde"
  }
});
// var transporter= nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "08fe374607a4f2",
//     pass: "3d63cd83b30b68"
//   }
// });
// ------------Test SENING MAIL------------------------------------------------
// Email options
const mailOptions = {
  from: email_S,
  to: 'a.rebhy10@gmail.com', // Replace with recipient's email address
  subject: 'Sending Email using Node.js',
  text: 'Hello That was easy!',
}

// TEST  MAILLING
//  transporter.verify((error,succes)=>{
//   if(error){
//     console.log(error);
//   }else {
//     console.log("Hello ,Ready to send Mails ");
//     console.log(succes);
//   }
// })
// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
//  /    --------------- JWT ------CONFIGURATION---------------
  // console.log(secretKey);
 
//   transporter.verify((error,succes)=>{
//   if(error){
//   console.log("erreur de connection "+error);
//   }else{
//     console.log("Ready to send mails");
//     console.log(succes);
//   }
// })

const EXPIRED_TOKEN = 3 * 24 * 60 * 60
const CreateToken =  (id) => {
return jwt.sign({id},secretKey,{expiresIn: EXPIRED_TOKEN})
}

const signupOrLoginWithFacebook = (req, res) => {
  // Authentification avec Facebook réussie, créez un token JWT
  const token = jwt.sign({ userId: req.user._id }, secretKey, { expiresIn: '1h' });
  res.json({ token });
}
 
//--------------------------------------------SEND VERIFICATION MAIL -------------------------------------------------------------
  
    const verificationMail = (req,res) =>{
          let{userId} = req.params;
          
          UserVerification
              .find({UserID:userId})
              .then(()=>{
                // if(result.length > 0){
                //   console.log(result.length);
                  // const {expiresAt} = result[0]
                  // const hashedUniqueString = result[0].uniqueString
                //  if(expiresAt < Date.now()){
                //   console.log(UserVerification);
                //   UserVerification.deleteOne({userId})
                //                   .then(result =>{
                //                         User.deleteOne({_id:userId})
                //                         .then(()=>{
                //                           let message = "Link has expired Please sign up again ";
                //                           res.redirect(`/verified/error=true&message=${message}`)
                //                         })
                //                         .catch((error)=>{
                //                           console.log(error);
                //                           let message = "An error was occured while expired unique string failed ";
                //                           res.redirect(`/verified/error=true&message=${message}`)
                //                         })
                //                       })
                //                   .catch((error)=>{
                //                     console.log(error);
                //                     let message = "An-error-was-occured-while-clearing-expired-user ";
                //                     res.redirect(`/verified/error=true&message=${message}`)
                    
                //                   })
                //   }
                //   // result doesn't expired 
                //   else{
                    console.log("----------------------------------");
                    // valis record exist// compare the hashed inque string  
                  //  bcrypt.compare(uniqueString,hashedUniqueString)
                        // .then(result =>{
                          //  if(result){
                            User.updateOne({ _id: userId},{verified : true})
                                .then(()=>{
                                  console.log(User);
                                  UserVerification.deleteOne({UserID:userId})
                                                  .then(()=>{
                                                  res.sendFile(path.join(__dirname,"../View/verifyYouMail.html"))
                                                  })
                                                  .catch((error)=>{
                                                    console.log(error);
                                                    let message = "An-error-occured-while-finalizing-succeful-verification";
                                                    res.redirect(`/verified/error=true&message=${message}`)
                                                  })     
                                })
                                .catch(error =>{
                                      console.log(error);
                                      let message = "Invalid-verification-details-passed . Check-your-inbox";
                                      res.redirect(`/verified/error=true&message=${message}`)
                            })

                          //  }else{
                          //   let message = "Invalid verification details passed . Check your inbox";
                          //   res.redirect(`/verified/error=true&message=${message}`)
                          //  }
                        })
                      
                  


              //    }
              //    else{
              //     let message = "Account-record-doesn't-exist-or-has-been-verified-already. pleasee-sign-uo-or-log-In !! ";
              //     res.redirect(`/verified/error=true&message=${message}`)

              //   }
              // })
              .catch((error)=>{
                console.log(error);
                let message = "An error was occured while  checking  for existing User verification  record !! ";
                res.redirect(`/verified/error=true&message=${message}`)

        })

    }
// ----------------------------------------  REDIRECT TO PAGE MAIL VERIFIED ------------------------------------------------------

 const FileVerification = (req,res)=>{
 res.sendFile(path.join(__dirname, "../View/verifyYouMail.html"));
      } 
// ---------------------------------------------  SIGN UP ADMIN ----------------------------------------------------------------
  const signup_Amdin = async (req, res) => {
      const { email, password ,name,telephone} = req.body;

      try{
                            
        const newUser = new User({
          email,
          password,
          name,
          telephone,
          // image:`${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
          role:"admin",
          verified:false
        });
        // console.log("filename"+req.file.filename);

        newUser.save()
                .then((result)=>{
                  console.log(result);
                  sendVerificationEmail({ _id: result._id, email: result.email },res)
                  
                })
                .catch((err)=>{
                  console.log(err);
                  res.json({
                    status:"Failed",
                    message :" An error was occured while saving User"
                  })
                })



        const token = CreateToken(newUser._id)
        console.log(" user  token : "+ token);
        newUser.token = token;
  
      }catch(error){
              console.log(error);
              res.status(400).send("Bad request so Admin not created")
      }
  }
   //---------------------------------------------------USER SIGN UP --------------------------------------------------------------
  const signup_User = async (req, res) => {
    const { email, password ,name,telephone} = req.body;

    try{
       
      const newUser = new User({
        email,
        password,
        name,
        telephone,
        // image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
        role:"user",
        verified:false
      });

       newUser.save()
              .then((result)=>{
                console.log(result);
                sendVerificationEmail({ _id: result._id, email: result.email },res)
                
              })
              .catch((err)=>{
                console.log(err);

                res.json({
                  status:"Failed",
                  message :" An error was occured while saving User"
                })
              })



       const token = CreateToken(newUser._id)
       console.log(" user  token : "+ token);
       newUser.token = token;
      //  res.status(201).json(newUser);

    }catch(error){
            console.log(error);
            res.status(400).send("Bad request so User not created")
    }
  }

  //--------------------------------------SIGNUP GUIDE___________________
  const signup_Guide = async (req, res) => {
    const { email, password ,name,telephone} = req.body;

    try{
      //  const user = await User.create({email,password,name,role:'admin',verified:false})
      //                         .then((result)=>{
      //                           sendVerificationEmail(result,res)
      //                         })
      const newUser = new User({
        email,
        password,
        name,
        telephone,
        // image:`${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
        role:"guidetouristique",
        verified:false
      });
 
      newUser.save()
              .then((result)=>{
                console.log(result);
                sendVerificationEmail({ _id: result._id, email: result.email },res)
                
              })
              .catch((err)=>{
                console.log(err);
                res.json({
                  status:"Failed",
                  message :" An error was occured while saving User"
                })
              })



      const token = CreateToken(newUser._id)
      console.log(" user  token : "+ token);
      newUser.token = token;

    }catch(error){
            console.log(error);
            res.status(400).send("Bad request so Admin not created")
    }
}
 // ----------------------------------------------------- LOGIN-------------------------------------------------------------------
  const SignIn = async (req, res) => {
 
    try {
        const { email, password } = req.body;
    
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
          console.log(user.verified);
        if(!(user.verified)){
          res.json({
            status :"Failed",
            message :"Email hasn't been Verified , Verify your inbox!"
          })
       }else{
           if (user && (await bcrypt.compare(password, user.password))) {
        // PAYLOAD:je place dans le payload du jwt  id_user + Email + Role
        const token = jwt.sign( { user_id: user._id,role: user.role, email },secretKey,{expiresIn: EXPIRED_TOKEN,} );
         user.token = token;
        res.status(200).json({status:200,Token:token});
      }
    }
        
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }  
  }    
 //----------------------------------------------------Logout----------------------------------------------------------------------
  const logout = async (req,res)=>{
      
  const header = req.header('Authorization');
  if (!header) 
  return res.sendStatus(204);  

  else  {
  const accessToken = header.split(' ')[1];  
   const checkIfBlacklisted = await logoutU.findOne({ token: accessToken }); // Check if that token is blacklisted
  if (checkIfBlacklisted)return res.sendStatus(204);
    else{
   const newBlacklist = new logoutU({  token: accessToken });
  
  await newBlacklist.save();
 res.status(200).json({ message: 'You are logged out!' });
}
}

  }
  const UserDetails= async (req,res)=>{
    const header = req.header('Authorization');
    if (!header) return res.sendStatus(403);

    const accessToken = header.split(' ')[1];
    const decoded = jwt.verify(accessToken, secretKey);
    const accesemail = decoded.email; // Identifiant de l'utilisateur extrait du token
    try {
      const user = await User.findOne({ email: accesemail });
      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      else{
        res.json({name:user.name,email:user.email,telephone:user.telephone})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
  }

 //-------------------------------------------EDIT PROFILE----------------------------------------------------------------------

  //  module.exports.EditProfile = async(req,res) =>{
    
  //   const {email,password,name} = req.body
  //   const header = req.header('Authorization');
  //   if (!header) 
  //      return res.sendStatus(403);  
  
  //   else  {
  //      const accessToken = header.split(' ')[1];  
  //      const decoded = jwt.verify(accessToken,secretKey);
      
  //     const Email = decoded.email
  //     try {
  //       const user = await User.findOne({ email: Email });
  //       if (user) {
  //         await user.updateOne( { email: Email },{  password:password}, {name:name } )
  //                 .then(async ()=>{
  //                   const token = jwt.sign( { user_id: user._id,role: user.role, email:email },secretKey,{expiresIn: EXPIRED_TOKEN,} );
  //                         user.token = token;
  //                   await user.save();
  //                 })
  //                 .catch((err)=>{
  //                   res.send(err)
  //                 })
            
  //           return res.send({token:user.Token,message:'User has been successfully updated'});
  //       } else {
  //           return res.send("User not found");
  //       }
  //   } catch (error) {
  //       console.error(error);
  //       return res.send({
  //           message: 'Bad request, An error occurred while updating Profile',
  //           error: error.message
  //       });
  //   }
  // }}
         //-------------------------------------------TEST----------------------------------------------------------------------
        //-------------------------------------------TEST----------------------------------------------------------------------
  const EditProfile = async (req, res) => {
          const { email, password, name } = req.body;
          const header = req.header('Authorization');
          if (!header) return res.sendStatus(403);
      
          const accessToken = header.split(' ')[1];
          const decoded = jwt.verify(accessToken, secretKey);
          const accesemail = decoded.email; // Identifiant de l'utilisateur extrait du token
      
          try {
              const user = await User.findOne({ email: accesemail });
              if (!user) {
                  return res.status(404).json({ message: 'Utilisateur non trouvé' });
              }
              const salt = await bcrypt.genSalt();
              const hashedPassword = await bcrypt.hash(password, salt);
              // Ici, vous devez déterminer quelles propriétés vous souhaitez réellement mettre à jour
              const updatedUser = await User.updateOne({ email: accesemail }, {
                  $set: {
                      email: email,
                      password: hashedPassword, // Assurez-vous de hacher le mot de passe avant de le stocker
                      name: name
                  }
              })
              // .then(
              //   updatedUser.save()
              // )
      
              res.json({ user: updatedUser, message: 'Profil mis à jour avec succès' });
          } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
          }
  };
      
        // const EditProfile = async(req,res) =>{
    
        //   const {mail,password,name} = req.body
        //   const header = req.header('Authorization');
        //   if (!header) 
        //      return res.sendStatus(403);  
        
        //   else  {
        //     const accessToken = header.split(' ')[1];  
        //     const decoded = jwt.verify(accessToken,secretKey);
        //     const email = decoded.email; // Identifiant de l'utilisateur extrait du token
        //       console.log(email);

        //     try {
        //        const user = await User.findOne({ email: email });
        //        user.updateOne({email:mail},{password:password},{name:name})
        //             .then(()=>{
        //               res.json({user:user,message})
        //             })
        //             .catch(()=>{

        //             })
        //       // const updatedUser = await User.findOneAndUpdate(userId, {
        //       //   email,
        //       //   password,
        //       //   name
        //       // }, { new: true });
          
        //       // if (!updatedUser) {
        //       //   return res.status(404).json({ message: 'Utilisateur non trouvé' });
        //       // }
          
        //       res.status(200).json(updatedUser);
        //     } catch (error) {
        //       console.error(error);
        //       res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
        //     }
        //   }
        //   };
       
       
   
    const verifyRole = async (req, res) => {
      res.status(200).json(" you have the authority good luck");
   }
     
    
// Funtion SEND mail VERIFICATION
   const  sendVerificationEmail = ({_id,email},res) => {
  const  CURRENT_URL = "http://localhost:3000/";
     
   // mail options
      const  Mail_Option = {
      // from: "fedi.benrodhane@esprit.tn",
      to: email, // Replace with recipient's email address
      subject: 'Verify your email',
      html: `<p> Please Verify your  <b>Email adress</b> to complete the sign up into your account.</p>
             <p> this link  <b> expires in 6 hours</b>.</p>
             <div style="font-family: inherit; text-align: center"><span style="color: #ffbe00; font-size: 18px">
             <p> Press <a href=${CURRENT_URL+"verify/"+_id}>HERE</a>
             </span></div><div></div></div></td>

                 To proceed.</p>`,
      };
  
       /// to Do ----------------------
  
      //  hach the unique string 
      // const saltRounds = 10
      // bcrypt.hash(uniqueString,saltRounds)
      //       .then((hashedUniqueString) => {
     
              // creat a instance for userverification CLASS to add attribute
                  const newverification = UserVerification({
                    UserID : _id,
                    // uniqueString: hashedUniqueString, 
                    createdAt :Date.now(),
                    expiredAt :Date.now()+21600000  //6 hours     
                  })
             // Save uservarification data 
                  newverification.save()
                                 .then(()=>{
                                 try{
                                        transporter
                                            .sendMail(Mail_Option)
                                            .then(()=>{
                                              res.json({
                                                status : "Pending",
                                                message :"Email verification was sent ! Check it !!"
                                              })
                                              
                                            })
                                            .catch((error) =>{
                                              console.log(error);
                                              res.json({
                                                status: "Failed",
                                                message: "Couldn't send mail  verification !!"
                                              })
                                  // send email with nodemailer tranporter 
                                 })
                                 .catch((error) =>{
                                  console.log(error);
                                  res.json({
                                    status: "Failed",
                                    message: "Couldn't save  verification Email Data!"
                                  })
                                 }) 
           }
           catch(erro){
            console.error('Erreur lors de l\'envoi de l\'email :', error.message);

           }
                                })
            // .catch((error) =>{
            //   console.log(error);
            //   res.json({
            //     status: "Failed",
            //     message: "An error was occured while hashing email data !"
            //   })
            //  }) 
  // } )
   }
  export default {signup_User,signup_Amdin,SignIn,logout,EditProfile,
  verificationMail,FileVerification,verifyRole,signupOrLoginWithFacebook
,UserDetails,signup_Guide
  }
