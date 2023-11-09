import { Activity } from "../model/activity.js"

export default {
    createActivity: async (req, res) => {
        try {
            const {
                
                location,
                name,
                image,
                description,
                reviews,
                budget,
                season,
                done,
                booket,
                target,
            } = req.body;

            const activity = await Activity.create({
                type: type,
                location: location,
                name: name,
                image: image,
                description:description,
                reviews:reviews,
                budget:budget,
                season:season,
                done:done,
                booket:booket,
                target:target,
            });

            await activity.save();

            return res.status(201).json({
                statusCode: 201,
                message: "Activity created",
                activity: activity,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    updateActivity: async (req, res) => {
        try {
            const activityId = req.params.id;
            const {
                location,
                name,
                image,
                description,
                reviews,
                budget,
                season,
                done,
                booket,
                target,
            } = req.body;

            if (!activityId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "activityId is required for updating a activity",
                });
            }

            const activity = await Activity.findById(activityId);

            if (!activity) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Activity not found",
                });
            }

            activity.location = location || activity.location;
            activity.description = description || activity.description;
            activity.name = name || activity.name;
            activity.image = image || activity.image;
            activity.reviews = reviews || activity.reviews;
            activity.budget = budget || activity.budget;
            activity.season = season || activity.season;
            activity.done = done || activity.done;
            activity.booket = booket || activity.booket;
            activity.target = target || activity.target;

            await activity.save();

            return res.status(200).json({
                statusCode: 200,
                message: "Activity updated",
                activity: activity,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },


    fetchActivity: async (req, res) => {
        try {
            const activityId = req.params.id;
            const activity = await Activity.findById(activityId);

            if (!activity) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Activity not found",
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: "Activity fetched successfully",
                activity: activity,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    fetchAllActivitys: async (req, res) => {
        try {
            const activitys = await Activity.find();

            return res.status(200).json({
                statusCode: 200,
                message: "All activitys fetched successfully",
                activitys: activitys,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    deleteActivity: async (req, res) => {
        try {
            const activityId = req.params.id;
            const activity = await Activity.findById(activityId);

            if (!activity) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Activity not found",
                });
            }

            await activity.remove();

            return res.status(200).json({
                statusCode: 200,
                message: "Activity deleted successfully",
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