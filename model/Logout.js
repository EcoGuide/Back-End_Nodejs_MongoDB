import mongoose from 'mongoose';

const lougoutSchema = new mongoose.Schema(
    {
        token: {
          type: String,
          required: true,
          ref: 'User',
        },
      },
      { timestamps: true },
    );
    const logout = mongoose.model('logout', lougoutSchema);
    export default logout 
    