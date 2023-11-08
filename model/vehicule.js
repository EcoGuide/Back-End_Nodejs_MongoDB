import mongoose from "mongoose";
const { Schema, model } = mongoose;

const vehiculeSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
        matricule: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

const Vehicule = mongoose.model("vehicule", vehiculeSchema);
export { Vehicule };