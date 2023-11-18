import mongoose from "mongoose";
const { Schema, model } = mongoose;

const chambreSchema = new Schema(
    {
        roomName: {
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
        nbChambreType: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    });

const Chambre = mongoose.model("Chambre", chambreSchema);
export { Chambre };