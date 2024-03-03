import { Router } from 'express';
import { login } from './auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { check } from 'express-validator';

const rutitasAdmin = Router();

rutitasAdmin.post(
    '/',
    [
        check("passwordAdmin", "the key is an a caracter obligatory").not().isEmpty(),
        //check("emailAdmin", "the email is an a caracter obligatory").isEmail(),
        validarCampos
    ],
    login
);

export default rutitasAdmin;