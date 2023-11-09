import mongoose from "mongoose";
const { Schema, model } = mongoose;

const activitySchema = new Schema(
  {
    name: {
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
    budget: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    done: {
        type: String,
        required: true,
      },
      booket: {
        type: String,
        required: true,
      },
      target: {
        type: String,
        required: true,
      },
    
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);
export { Activity };