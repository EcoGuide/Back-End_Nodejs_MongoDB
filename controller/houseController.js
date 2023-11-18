import { House } from "../model/house.js";

export default {

    createHouse: async (req, res) => {
        try {
            const {
                houseName,
                price,
                nbPlace,
                isBooked,
                image,
                nbChambre,

            } = req.body;

            const house = await House.create({
                houseName: houseName,
                price: price,
                nbPlace: nbPlace,
                isBooked: isBooked,
                image: `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}`,
                nbChambre: nbChambre,

            });

            await house.save();

            return res.status(201).json({
                statusCode: 201,
                message: "House created",
                house: house,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    updateHouse: async (req, res) => {
        try {
            const houseId = req.params.id;
            const {
                houseName,
                price,
                nbPlace,
                isBooked,
                image,
                nbChambre,
            } = req.body;

            if (!houseId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "houseId is required for updating a house",
                });
            }

            const house = await House.findById(houseId);

            if (!house) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "house not found",
                });
            }
            house.houseName = houseName || house.houseName;
            house.price = price || house.price;
            house.isBooked = isBooked || house.isBooked;
            house.nbPlace = nbPlace || house.nbPlace;
            house.image = `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}` || chambre.image;
            house.nbChambre = nbChambre || house.nbChambre;

            await house.save();

            return res.status(200).json({
                statusCode: 200,
                message: "house updated",
                house: house,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    fetchHouse: async (req, res) => {
        try {
            const houseId = req.params.id;
            const house = await House.findById(houseId);

            if (!house) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "House not found",
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: "House fetched successfully",
                house: house,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    fetchAllHouses: async (req, res) => {
        try {
            const houses = await House.find();

            return res.status(200).json({
                statusCode: 200,
                message: "All houses fetched successfully",
                houses: houses,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    deleteHouse: async (req, res) => {
        try {
            const houseId = req.params.id;
            const house = await House.findById(houseId);

            if (!house) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "House not found",
                });
            }

            await house.remove();

            return res.status(200).json({
                statusCode: 200,
                message: "House deleted successfully",
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