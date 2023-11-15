import User from '../model/User.js'
import Code from '../model/CodeVerification.js'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import path from 'path'
import nodemailer from "nodemailer"
import twilio from 'twilio'
import dotenv from 'dotenv';
import { log } from 'console'
dotenv.config();
// From .env
const email_S = process.env.AUTH_EMAIL;
const JWT_secret = 'some super secret.....'
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const secretKey = process.env.SECRET_KEY;


    // ----------A  ne pas modfidier!!!!!!!!--------------------
    
    // var transporter= nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "08fe374607a4f2",
    //     pass: "3d63cd83b30b68"
    //   }
    // });
    // ------------Test SENING MAIL------------------------------------------------
    var transporter= nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: "fedi.benromdhane@esprit.tn",
        pass: "bmzqluzhxefmqgde"
      }
    });
    
     const mailOptions = {
      from: email_S,
      to: 'fedi.benromdhane@esprit.tn', // Replace with recipient's email address
      subject: 'Sending Email using Node.js',
      text: 'sahbi haffa!',
    }
  
    //______________________________________________ Send Code reset password By SMS ______________________________________________
    const forgot_password_sms= async (req, res) => {
      const verificationCode = Math.floor(1000 + Math.random() * 9000);

      try {
        const { telephone } = req.body;
    
        if (!telephone) {
          res.status(400).send("All input is required");
          return;
        }
    
        const user = await User.findOne({ telephone });
        console.log("user phone"+user.telephone);
        if (!user) {
          res.json({
            status: "Failed",
            message: "Sorry ! You are not registered!"
          });
          return;
        }
         const code = new Code({
          UserID: user._id, // This ensures the _id is a string.
          code: verificationCode
        });
    
         await  code.save();
        await sendMessage(  verificationCode, telephone );

        //  const secret = JWT_secret + user.password;
    
        const payload = {
          telephone: user.telephone,
          id: user._id,
          code: verificationCode
        };
    
        const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
        const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
    
        res.send({
          message: 'Password reset link was sent. Check your email.',
          Link: link,
          Token: token,
          Code:verificationCode
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    }
    //______________________________________________ Send Code reset password By Mail ______________________________________________
    const forgot_password = async (req, res, next) => {
      try {

        const { email } = req.body;

        if (!email) {
          res.status(400).send("All input is required");
          return;
        }

        const user = await User.findOne({ email });

        if (!user) {
          res.json({
            status: "Failed",
            message: "You are not registered!"
          });
          return;
        }

        // Envoyer l'e-mail de vérification et récupérer le code généré
        const verificationCode = await sendVerificationEmail({ _id: user._id, email: email });
        console.log(verificationCode);
        const secret = JWT_secret + user.password;

        const payload = {
          email: user.email,
          id: user._id,
          code: verificationCode
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
        // const link = `http://localhost:3000/reset-password/${user._id}`;

        res.send({
          message: 'Password reset mail was sent. Check your email!',
          Link: link,
          Token: token,
          Code:verificationCode
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    }
    //_______________________________________________Get verification code and Reset password  ______________________________________________
    const reset_password = async (req, res, next) => {
      console.log(req.body);
      try {
        // const { id, token } = req.params;
        const { code,password } = req.body;

        const header = req.header('Authorization');
        const accessToken = header.split(' ')[1];  

 
        if (!accessToken) {
          return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(accessToken,secretKey);
        console.log(decoded.id);
        const id  = decoded.id
        const storedCode = await Code.findOne({ UserID: id });
        // console.log(`stored code ${storedCode.code}`);
         if (storedCode && storedCode.code === code) {
          const user = await User.findById(id);
          // console.log(user.password);
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
          await user.save();
            // console.log(user.password);
          await storedCode.delete();
          res.status(200).send({ message: "Password has been successfully reset", User: user });
        } else {
          res.status(400).send("Invalid verification code");
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
    const reset_password_View  = async (req, res,next) => {
    
      const{id,token}=req.params
      console.log(req.params);
      const user = await User.findById(id);
      console.log(user );
      
      const secret = JWT_secret+ user.password
      try {
          const payload = jwt.verify(token ,secret)
          res.sendFile(path.join(__dirname,"../View/reset-password.html"))
    }catch (error) {
          console.log(error.message);
              res.send(error.message)
    }
      
    } 
    //---------------------------------------- SEND VERIFICATION CODE  AND SAVE IT  by mail------------------------------------------------------
    const sendVerificationEmail = ({_id, email }) => {
      return new Promise((resolve, reject) => {
        const verificationCode = Math.floor(1000 + Math.random() * 9000);

        const Mail_Option = {
          from: email_S,
          to: email,
          subject: 'verfication code',
          text: `Votre code de vérification est : ${verificationCode}`
        };

        const code = new Code({
          UserID: _id,
          code: verificationCode
        });

        code.save()
          .then(() => {
            transporter.sendMail(Mail_Option)
              .then(() => {
                resolve(verificationCode);
              })
              .catch(error => {
                reject(error);
              });
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    //---------------------------------------- SEND VERIFICATION CODE  AND SAVE IT  By SMS------------------------------------------------------
    async function sendMessage(body,number) {
  
      try {
        const message = client.messages.create({
          to: number, 
          from: process.env.TWILIO_PHONE_NUMBER,
          body: `Your verification code is: ${body}`
        });

        //  const messageRecord = new Message({
        //   to: number,
        //   body: message.body,
        //   dateSent: new Date(),
        //   sid: message.sid
        // });
    
        // // Save the message record to the database
        // await  messageRecord.save();
        // console.log('Message sent and saved:', message.sid);
    
        // Optionally return a result here if you need to send a response to the client
        return {
          success: true,
          message: 'Verification code sent.',
          sid: message.sid
        };
        
      } catch (error) {
        console.error('Error sending message:', error);
    
        // Optionally throw the error or return an error response here
        return {
          success: false,
          message: 'Failed to send verification code.',
          error: error.message
        };
      }
    
    }
  
 export default {forgot_password,reset_password_View,reset_password,sendVerificationEmail ,forgot_password_sms}
  
 