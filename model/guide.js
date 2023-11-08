import mongoose from "mongoose";
const { Schema, model } = mongoose;

const guideSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    reviews: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discountCode: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Guide = mongoose.model("Guide", guideSchema);
export { Guide };
