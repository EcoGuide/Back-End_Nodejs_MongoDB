import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reservationHouseSchema = new Schema(

    {
        startDate: { type: Date, required: true },
        nbdays: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        house: { type: Schema.Types.ObjectId, ref: "House" },

    },
    {
        timestamps: true,
    }
)

const ReservationHouse = model('ReservationHouse', reservationHouseSchema);

export { ReservationHouse };