import { Guide } from "../model/guide.js";

export default {
  createGuide: async (req, res) => {
    try {
      console.log(req.body);
      const {
        fullname,
        location,
        description,
        image,
        reviews,
        price,
        discountCode,
      } = req.body;

      const guide = await Guide.create({
        fullname: fullname,
        location: location,
        description: description,
        image: `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}`,
        reviews: reviews,
        price: price,
        discountCode: discountCode,
      });

      await guide.save();

      return res.status(201).json({
        statusCode: 201,
        message: "Guide created",
        guide: guide,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  fetchGuide: async (req, res) => {
    try {
      const guideId = req.params.id;
      const guide = await Guide.findById(guideId);

      console.log(guideId);

      if (!guide) {
        return res.status(404).json({
          statusCode: 404,
          message: "Guide not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Guide fetched successfully",
        guide: guide,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  fetchAllGuides: async (req, res) => {
    try {
      const guides = await Guide.find();

      return res.status(200).json({
        statusCode: 200,
        message: "All guides fetched successfully",
        guides: guides,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  deleteGuide: async (req, res) => {
    try {
      const guideId = req.params.id;
      const guide = await Guide.findById(guideId);

      if (!guide) {
        return res.status(404).json({
          statusCode: 404,
          message: "Guide not found",
        });
      }

      await guide.remove();

      return res.status(200).json({
        statusCode: 200,
        message: "Guide deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },
};
