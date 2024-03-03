import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos.js";
import { generateReport } from "./enterprise.controller.js";
const rutaReport = Router();

rutaReport.get(
    "/",
    [
        validarCampos
    ],
    generateReport
)

export default rutaReport;