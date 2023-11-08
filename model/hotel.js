import mongoose from "mongoose";
const { Schema, model } = mongoose;

const hotelSchema = new Schema(
    {
        nbChambre: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        nbStars: {
            type: Number,
            required: true,
        },
        rating: {
            type: String,
        },
        image: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export { Hotel };
