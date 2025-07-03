import express from "express";
import {
  appointmentsDoctor,
  doctorList,
  logindoctor,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", logindoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);

export default doctorRouter;
