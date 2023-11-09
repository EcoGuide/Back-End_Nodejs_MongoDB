import express from "express";
import guideController from "../controller/guideController.js";
import hotelController from "../controller/hotelController.js";
import vehiculeController from "../controller/vehiculeController.js";
import activityController from "../controller/activityController.js";

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

// Vehicule
router.post("/vehicule/add", vehiculeController.createVehicule);
router.put("/vehicule/:id", vehiculeController.updateVehicule)
router.get("/vehicule/:id", vehiculeController.fetchVehicule);
router.get("/vehicules", vehiculeController.fetchAllVehicules);
router.delete("/vehicule/:id", vehiculeController.deleteVehicule);
//Activity
router.post("/activity/add", activityController.createActivity);
router.put("/activity/:id", activityController.updateActivity)
router.get("/activity/:id", activityController.fetchActivity);
router.get("/activity", activityController.fetchAllActivitys);
router.delete("/activity/:id", activityController.deleteActivity);


export default router;