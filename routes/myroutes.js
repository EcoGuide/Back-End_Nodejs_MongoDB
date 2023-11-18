import express from "express";
import guideController from "../controller/guideController.js";
import hotelController from "../controller/hotelController.js";
import { singleImage } from "../Midlleware/multer-config.js";
import chambreController from "../controller/chambreController.js";
import reservationController from "../controller/reservationController.js";
const router = express.Router();


// Guide
router.post('/guide/add', guideController.createGuide);
router.get("/guide/:id", guideController.fetchGuide);
router.get("/guides", guideController.fetchAllGuides);
router.delete("/guide/:id", guideController.deleteGuide);

// Hotel
router.post("/hotel/add", singleImage, hotelController.createHotel);
router.put("/hotel/:id", singleImage, hotelController.updateHotel);
router.get("/hotel/:id", hotelController.fetchHotel);
router.get("/hotels", hotelController.fetchAllHotels);
router.delete("/hotel/:id", hotelController.deleteHotel);

//Chambre
router.post("/chambre/add", singleImage, chambreController.createChambre);
router.put("/chambre/:id", singleImage, chambreController.updateChambre);
router.get("/chambre/:id", chambreController.fetchChambre);
router.get("/chambres", chambreController.fetchAllChambres);
router.get('/hotel/:hotelId/chambres', chambreController.getChambresByHotelId);
router.delete("/chambre/:id", chambreController.deleteChambre);

//Reservation
router.post('/reservationH/add', reservationController.createreservation);
router.put('/reservationH/:id', reservationController.updateReservationH);
router.get('/reservationH/:id', reservationController.getReservationById);
router.get('/reservationHs', reservationController.getAllReservations);
router.get('/reservationH/all-with-hotel-details', reservationController.getAllReservationsWithHotelDetails);

export default router;