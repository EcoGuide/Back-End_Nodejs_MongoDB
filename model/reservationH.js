import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reservationHSchema = new Schema(

    {
        startDate: { type: Date, required: true },
        nbdays: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        chambres: { type: Schema.Types.ObjectId, ref: "Chambre" },

    },
    {
        timestamps: true,
    }
)

const ReservationH = model('ReservationH', reservationHSchema);

export { ReservationH };