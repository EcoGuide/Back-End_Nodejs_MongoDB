import mongoose from 'mongoose';
// import { isEmail } from 'validator';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Activez la configuration dotenv
dotenv.config();

//-------------------------------------------- USER SCHEMA  --------------------------------------------------

const userSchema = new mongoose.Schema({

  facebookId: {
    type: String,
    unique: true,
    required: false  
  },  
  email: {
    type: String,
    required: [true , 'Please enter a  Email'  ],
    unique: true,
    lowercase: true,
    // validate:[isEmail,'Please enter a valid   Email']
  },
  password: {
    type: String,
    required: [true , 'Please enter a valid pwd'  ],
    minlength: 6,
  },
  // password: {
  //   type: String,
  //   required: [function() { return !this.facebookId; }, 'Password is required unless signing in with Facebook']
  // },
  token: {
     type: String 
     },
  name:{
    type :String,
    required: [true , 'Please enter a Name'  ],
  },
  telephone:{
    type :String,
    required: [true , 'Please enter a number'  ],
  },
  telephone: {
    type: String,
      required: [true , 'Please enter your phone number'  ],
    minlength: 8,
  },
  image:{
    type :String,
    // required: [true , 'Please enter a file{'  ],
  },
 
  role:{
    type :String,
    enum:['admin','user','guest','guide','guidetouristique'],
    default:'user'
  },

  verified:{
    type:Boolean,
    required :false
  }
});

//-------------------------------------------- MONGOOS HOOK  FIRE FUNCTIONS --------------------------------------------------
// userSchema.pre('updateOne',function(doc,next){
//   console.log("new user was created and saved ",doc);
//   next();
// })     
//----------- AFTER AND BEFORE SAVING A USER IN DATABAASE -------------
userSchema.post('save',function(doc,next){
    console.log("new user was created and saved ",doc);
    next();
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password ,salt)
     console.log("new user  about  to be created and saved ",this);
    next();
})

// userSchema.pre('updateOne', async function(next){
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password ,salt)
//    console.log("new user  about  to be created and saved ",this);
//   next();
// })
//-------------------------------------------------------------------------------------------------------------------------------------

// userSchema.pre('updateOne', async function(next){
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password ,salt)
//    console.log("new user  about  to be created and saved ",this);
//   next();
// })

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id },secretKey,{expiresIn: EXPIRED_TOKEN});
//     return token;
// };

// static methode to login user 
// static method to login user
// userSchema.statics.login = async function(email, password) {
//     const user = await this.findOne({ email });
//     if (user) {
//       const auth = await bcrypt.compare(password, user.password);
//       if (auth) {
//         return user;
//       }
//       throw Error('incorrect password');
//     }
//     throw Error('incorrect email');
//   };
//-------------------------------------------- EXPORT USER ENTITY  --------------------------------------------------

// const User = mongoose.model('User', userSchema);

// export default User;
const User = mongoose.model('User', userSchema);

export default User;