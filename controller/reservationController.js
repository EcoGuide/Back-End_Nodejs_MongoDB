import { ReservationH } from "../model/reservationH.js";
import { Chambre } from "../model/chambre.js";

export default {
    createreservation: async (req, res) => {
        try {
            const {
                startDate,
                nbdays,
                totalPrice,
                chambres,

            } = req.body;

            const reservation = await ReservationH.create({

                startDate: startDate,
                nbdays: nbdays,
                totalPrice: totalPrice,
            });
            if (chambres && chambres.length > 0) {
                // Assuming chambres is an array of room IDs
                reservation.chambres = chambres;
                await reservation.save();
            }
            // await reservation.save();

            return res.status(201).json({
                statusCode: 201,
                message: "Reservation created",
                reservation: reservation,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    updateReservationH: async (req, res) => {
        try {
            const reservationId = req.params.id;
            const {
                startDate,
                nbdays,
                totalPrice,
                chambres,
            } = req.body;

            if (!reservationId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "reservationId is required for updating a reservation",
                });
            }

            const reservation = await ReservationH.findById(reservationId);

            if (!reservation) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Reservation not found",
                });
            }
            reservation.startDate = startDate || reservation.startDate;
            reservation.nbdays = nbdays || reservation.nbdays;
            reservation.totalPrice = totalPrice || reservation.totalPrice;
            if (chambres && chambres.length > 0) {
                reservation.chambres = chambres;
            }
            await reservation.save();

            return res.status(200).json({
                statusCode: 200,
                message: "Reservation updated",
                reservation: reservation,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    // Fetch details about a specific reservation
    getReservationById: async (req, res) => {
        try {
            const reservationId = req.params.id;

            const reservation = await ReservationH.findById(reservationId)
                .populate({
                    path: 'chambre',
                    populate: { path: 'hotel' }, // Populate the 'hotel' field in the 'chambre' reference
                })
                .exec();

            if (!reservation) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Reservation not found',
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'Reservation retrieved with hotel details',
                reservation,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
            });
        }
    },

    // Fetch all reservations
    getAllReservations: async (req, res) => {
        try {
            const reservations = await ReservationH.find().populate('chambre').exec();

            return res.status(200).json({
                statusCode: 200,
                message: 'All reservations retrieved',
                reservations,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
            });
        }
    },

    getAllReservationsWithHotelDetails: async (req, res) => {
        try {
            // Use the populate method to include details from the referenced models
            const reservations = await ReservationH.find()
                .populate({
                    path: 'chambre', // Assuming your ReservationH model has a field named "chambre" referencing the Chambre model
                    populate: {
                        path: 'hotel', // Assuming your Chambre model has a field named "hotel" referencing the Hotel model
                        model: 'Hotel', // Model name for Hotel
                    },
                })
                .exec();

            return res.status(200).json({
                statusCode: 200,
                message: 'Reservations retrieved with hotel details',
                reservations: reservations,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
            });
        }

    },

    deletereservationH: async (req, res) => {
        try {
            const reservationHId = req.params.id;
            const reservation = await ReservationH.findById(reservationHId);

            if (!reservation) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "reservation not found",
                });
            }

            await reservation.remove();

            return res.status(200).json({
                statusCode: 200,
                message: "reservation deleted successfully",
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
