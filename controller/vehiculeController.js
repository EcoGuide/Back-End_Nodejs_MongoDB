import { Vehicule } from "../model/vehicule.js"

export default {
    createVehicule: async (req, res) => {
        try {
            const {
                type,
                matricule,
                name,
                image,
            } = req.body;

            const vehicule = await Vehicule.create({
                type: type,
                matricule: matricule,
                name: name,
                image: image,

            });

            await vehicule.save();

            return res.status(201).json({
                statusCode: 201,
                message: "Vehicule created",
                vehicule: vehicule,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    updateVehicule: async (req, res) => {
        try {
            const vehiculeId = req.params.id;
            const {
                type,
                matricule,
                name,
                image,
            } = req.body;

            if (!vehiculeId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "vehiculeId is required for updating a vehicule",
                });
            }

            const vehicule = await Vehicule.findById(vehiculeId);

            if (!vehicule) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Vehicule not found",
                });
            }

            vehicule.type = type || vehicule.type;
            vehicule.matricule = matricule || vehicule.matricule;
            vehicule.name = name || vehicule.name;
            vehicule.image = image || vehicule.image;

            await vehicule.save();

            return res.status(200).json({
                statusCode: 200,
                message: "Vehicule updated",
                vehicule: vehicule,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },


    fetchVehicule: async (req, res) => {
        try {
            const vehiculeId = req.params.id;
            const vehicule = await Vehicule.findById(vehiculeId);

            if (!vehicule) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Vehicule not found",
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: "Vehicule fetched successfully",
                vehicule: vehicule,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    fetchAllVehicules: async (req, res) => {
        try {
            const vehicules = await Vehicule.find();

            return res.status(200).json({
                statusCode: 200,
                message: "All vehicules fetched successfully",
                vehicules: vehicules,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    deleteVehicule: async (req, res) => {
        try {
            const vehiculeId = req.params.id;
            const vehicule = await Vehicule.findById(vehiculeId);

            if (!vehicule) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Vehicule not found",
                });
            }

            await vehicule.remove();

            return res.status(200).json({
                statusCode: 200,
                message: "Vehicule deleted successfully",
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