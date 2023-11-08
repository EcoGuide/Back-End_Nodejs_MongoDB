import express from "express";
import guideController from "../controller/guideController.js";
import hotelController from "../controller/hotelController.js";


const router = express.Router();


// Guide
router.post('/guide/add', guideController.createGuide);
router.get("/guide/:id", guideController.fetchGuide);
router.get("/guides", guideController.fetchAllGuides);
router.delete("/guide/:id", guideController.deleteGuide);

// Hotel
router.post("/hotel/add", hotelController.createHotel);
router.put("/hotel/:id", hotelController.updateHotel)
router.get("/hotel/:id", hotelController.fetchHotel);
router.get("/hotels", hotelController.fetchAllHotels);
router.delete("/hotel/:id", hotelController.deleteHotel);

export default router;