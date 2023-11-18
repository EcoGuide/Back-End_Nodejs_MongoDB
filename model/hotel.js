import mongoose from "mongoose";
const { Schema, model } = mongoose;

const hotelSchema = new Schema(
    {
        hotelname: {
            type: String,
            require: true,
        },
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
        },
        Favoris: {
            type: Number,
        },
        description: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
        },
        chambres: [{ type: Schema.Types.ObjectId, ref: "Chambre" }],

    },
    {
        timestamps: true,
    }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export { Hotel };
