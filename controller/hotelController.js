import { Hotel } from "../model/hotel.js"

export default {
    createHotel: async (req, res) => {
        try {
            const {
                nbChambre,
                location,
                nbStars,
                image,
                rating,
            } = req.body;

            const hotel = await Hotel.create({
                nbChambre: nbChambre,
                location: location,
                nbStars: nbStars,
                image: image,
                rating: rating,
            });

            await hotel.save();

            return res.status(201).json({
                statusCode: 201,
                message: "Hotel created",
                hotel: hotel,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    updateHotel: async (req, res) => {
        try {
            const hotelId = req.params.id;
            const {
                nbChambre,
                location,
                nbStars,
                image,
                rating,
            } = req.body;

            if (!hotelId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "hotelId is required for updating a hotel",
                });
            }

            const hotel = await Hotel.findById(hotelId);

            if (!hotel) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Hotel not found",
                });
            }

            hotel.nbChambre = nbChambre || hotel.nbChambre;
            hotel.location = location || hotel.location;
            hotel.nbStars = nbStars || hotel.nbStars;
            hotel.image = image || hotel.image;
            hotel.rating = rating || hotel.rating;

            await hotel.save();

            return res.status(200).json({
                statusCode: 200,
                message: "Hotel updated",
                hotel: hotel,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },


    fetchHotel: async (req, res) => {
        try {
            const hotelId = req.params.id;
            const hotel = await Hotel.findById(hotelId);

            if (!hotel) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Hotel not found",
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: "Hotel fetched successfully",
                hotel: hotel,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    fetchAllHotels: async (req, res) => {
        try {
            const hotels = await Hotel.find();

            return res.status(200).json({
                statusCode: 200,
                message: "All hotels fetched successfully",
                hotels: hotels,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    deleteHotel: async (req, res) => {
        try {
            const hotelId = req.params.id;
            const hotel = await Hotel.findById(hotelId);

            if (!hotel) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Hotel not found",
                });
            }

            await hotel.remove();

            return res.status(200).json({
                statusCode: 200,
                message: "Hotel deleted successfully",
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