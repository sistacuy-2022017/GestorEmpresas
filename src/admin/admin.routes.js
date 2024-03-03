import { Router } from "express";
import { check } from "express-validator";
import { registrarUsuarios } from "./admin.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existeAdminByCorreo } from "../middlewares/admin-validar.js";

const rutitas = Router();

rutitas.post(
    "/",
    [
        check("nameAdmin", "the name is a required parameter").not().isEmpty(),
        check("emailAdmin", "the email is a required parameter").isEmail(),
        check("passwordAdmin", "The pass must be least 6 characters").isLength({ min: 6, }),
        check('emailAdmin').custom(existeAdminByCorreo),
        validarCampos
    ],
    registrarUsuarios
);

export default rutitas;