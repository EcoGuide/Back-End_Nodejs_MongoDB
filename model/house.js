import mongoose from "mongoose";
const { Schema, model } = mongoose;

const houseSchema = new Schema(

    {
        houseName: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
        nbPlace: {
            type: Number,
            required: true,
        },
        isBooked: {
            type: Boolean,
            default: false,
        },

        image: {
            type: String,
            required: true,
        },
        nbChambre: {
            type: Number,
            require: true,
        }
    }
);

const House = mongoose.model("House", houseSchema);
export { House };