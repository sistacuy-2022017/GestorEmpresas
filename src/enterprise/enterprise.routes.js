import { Router } from "express";
const routerEnterprise = Router();
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { EnterprisePut, enterprisePost, obtenerEmpresas } from "./enterprise.controller.js";
import { categoryExiste, levelImExiste, existeEmpresaByName } from "../middlewares/enterprise-validators.js";

routerEnterprise.post(
    '/',
    [
        check("nameEnterprise", "the nameEnterprise is a parameter requierd").not().isEmpty(),
        check("categoryEnterprise").custom(categoryExiste),
        check("levelImpact").custom(levelImExiste),
        //check("nameEnterprise").custom(existeEmpresaByName),
        validarCampos
    ],
    enterprisePost

);

routerEnterprise.put(
    '/:id',
    [
        validarCampos
    ],
    EnterprisePut
);

routerEnterprise.get("/:order?",
    [
        validarCampos
    ],
    obtenerEmpresas
);

export default routerEnterprise;