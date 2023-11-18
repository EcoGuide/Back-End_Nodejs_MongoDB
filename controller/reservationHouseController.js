import { ReservationHouse } from "../model/reservationHouse.js";
import { House } from "../model/house.js";

export default {
    createreservationHouse: async (req, res) => {
        try {
            const {
                startDate,
                nbdays,
                totalPrice,
                house,

            } = req.body;

            const reservationHouse = await ReservationHouse.create({

                startDate: startDate,
                nbdays: nbdays,
                totalPrice: totalPrice,
            });
            if (house && house.length > 0) {
                // Assuming chambres is an array of room IDs
                reservationHouse.house = house;
                await reservationHouse.save();
            }


            return res.status(201).json({
                statusCode: 201,
                message: "Reservation House created",
                reservationHouse: reservationHouse,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    updateReservationHouse: async (req, res) => {
        try {
            const reservationHouseId = req.params.id;
            const {
                startDate,
                nbdays,
                totalPrice,
                house,
            } = req.body;

            if (!reservationHouseId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "reservationHouseId is required for updating a reservation",
                });
            }

            const reservationHouse = await reservationHouse.findById(reservationHouseId);

            if (!reservationHouse) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "reservationHouse not found",
                });
            }
            reservationHouse.startDate = startDate || reservationHouse.startDate;
            reservationHouse.nbdays = nbdays || reservationHouse.nbdays;
            reservationHouse.totalPrice = totalPrice || reservationHouse.totalPrice;
            if (house && house.length > 0) {
                reservationHouse.house = house;
            }
            await reservation.save();

            return res.status(200).json({
                statusCode: 200,
                message: "Hotel updated",
                reservationHouse: reservationHouse,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },
    getreservationHouseById: async (req, res) => {
        try {
            const reservationHouseId = req.params.id;

            const reservationHouse = await ReservationHouse.findById(reservationHouseId)
                .populate({
                    path: 'chambre',
                    populate: { path: 'house' }, // Populate the 'hotel' field in the 'chambre' reference
                })
                .exec();

            if (!reservationHouse) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'reservationHouse not found',
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'reservationHouse retrieved with hotel details',
                reservationHouse,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
            });
        }
    },

    getAllreservationHouse: async (req, res) => {
        try {
            const reservationHouses = await ReservationHouse.find().populate('chambre').exec();

            return res.status(200).json({
                statusCode: 200,
                message: 'All reservation House retrieved',
                reservationHouses,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
            });
        }
    },

    deletereservationHouse: async (req, res) => {
        try {
            const reservationHouseId = req.params.id;
            const reservationHouse = await ReservationHouse.findById(reservationHouseId);

            if (!reservationHouse) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "reservation House not found",
                });
            }

            await reservationHouse.remove();

            return res.status(200).json({
                statusCode: 200,
                message: "reservationHouse deleted successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

}
