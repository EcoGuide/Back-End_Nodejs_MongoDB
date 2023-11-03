

import mongoose from 'mongoose';

const CodeSchema = new mongoose.Schema(
    {
        UserID :{
         type:   String,
         unique: true,
        },
        code : Number
      },
    );

 
  const verificationCode = mongoose.model('verificationCode', CodeSchema);
export default verificationCode;