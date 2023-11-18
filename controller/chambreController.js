import { Chambre } from "../model/chambre.js";
import { Hotel } from "../model/hotel.js";
export default {

    createChambre: async (req, res) => {
        try {
            const {
                roomName,
                price,
                nbPlace,
                isBooked,
                image,
                nbChambreType,

            } = req.body;

            const chambre = await Chambre.create({
                roomName: roomName,
                price: price,
                nbPlace: nbPlace,
                isBooked: isBooked,
                image: `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}`,
                nbChambreType: nbChambreType,

            });

            await chambre.save();

            return res.status(201).json({
                statusCode: 201,
                message: "Chambre created",
                chambre: chambre,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    updateChambre: async (req, res) => {
        try {
            const chambreId = req.params.id;
            const {
                roomName,
                price,
                nbPlace,
                isBooked,
                image,
                nbChambreType,
            } = req.body;

            if (!chambreId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "chambreId is required for updating a chambre",
                });
            }

            const chambre = await Chambre.findById(chambreId);

            if (!chambre) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Chambre not found",
                });
            }
            chambre.roomName = roomName || chambre.roomName;
            chambre.nbPlace = nbPlace || chambre.nbPlace;
            chambre.isBooked = isBooked || chambre.isBooked;
            chambre.nbStars = nbStars || chambre.nbStars;
            chambre.image = `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}` || chambre.image;
            chambre.nbChambreType = nbChambreType || chambre.nbChambreType;
            chambre.price = price || chambre.price;

            await chambre.save();

            return res.status(200).json({
                statusCode: 200,
                message: "Chambre updated",
                chambre: chambre,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },


    fetchChambre: async (req, res) => {
        try {
            const chambreId = req.params.id;
            const chambre = await Chambre.findById(chambreId);

            if (!chambre) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Chambre not found",
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: "Chambre fetched successfully",
                chambre: chambre,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    fetchAllChambres: async (req, res) => {
        try {
            const chambres = await Chambre.find();

            return res.status(200).json({
                statusCode: 200,
                message: "All chambres fetched successfully",
                chambres: chambres,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },
    getChambresByHotelId: async (req, res) => {
        try {
            const hotelId = req.params.hotelId; // Assuming you have hotelId in your route params

            // Use the populate method to retrieve details of the associated chambres
            const hotelWithChambres = await Hotel.findById(hotelId).populate('chambres');

            if (!hotelWithChambres) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Hotel not found',
                });
            }

            const chambres = hotelWithChambres.chambres;

            return res.status(200).json({
                statusCode: 200,
                message: 'Chambres retrieved for the hotel',
                chambres,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
            });
        }
    },

    deleteChambre: async (req, res) => {
        try {
            const chambreId = req.params.id;
            const chambre = await Chambre.findById(chambreId);

            if (!chambre) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Chambre not found",
                });
            }

            await chambre.remove();

            return res.status(200).json({
                statusCode: 200,
                message: "Chambre deleted successfully",
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