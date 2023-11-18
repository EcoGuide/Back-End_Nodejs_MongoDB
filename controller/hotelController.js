import { Hotel } from "../model/hotel.js"

export default {
    createHotel: async (req, res) => {
        try {
            const {
                hotelname,
                nbChambre,
                location,
                nbStars,
                image,
                rating,
                Favoris,
                description,
                price,
                chambres,
            } = req.body;

            const hotel = await Hotel.create({
                hotelname: hotelname,
                nbChambre: nbChambre,
                location: location,
                nbStars: nbStars,
                image: `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}`,
                rating: rating,
                Favoris: Favoris,
                description: description,
                price: price,
            });
            if (chambres && chambres.length > 0) {
                // Assuming chambres is an array of room IDs
                hotel.chambres = chambres;
                await hotel.save();
            }
            // await hotel.save();

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
                hotelname,
                nbChambre,
                location,
                nbStars,
                image,
                rating,
                Favoris,
                description,
                price,
                chambres,
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
            hotel.hotelname = hotelname || hotel.hotelname;
            hotel.nbChambre = nbChambre || hotel.nbChambre;
            hotel.location = location || hotel.location;
            hotel.nbStars = nbStars || hotel.nbStars;
            hotel.image = `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}` || hotel.image;
            hotel.rating = rating || hotel.rating;
            hotel.Favoris = Favoris || hotel.Favoris;
            hotel.description = description || hotel.description;
            hotel.price = price || hotel.price;
            if (chambres && chambres.length > 0) {
                hotel.chambres = chambres;
            }
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