import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentCancel,
  appointmentsAdmin,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authadmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";
const adminRouter = express.Router();

adminRouter.post("/add-doctor", authadmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authadmin, allDoctors);
adminRouter.post("/change-availability", authadmin, changeAvailability);
adminRouter.get("/appointments", authadmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authadmin, appointmentCancel);
adminRouter.get("/dashboard", authadmin, adminDashboard);

export default adminRouter;
