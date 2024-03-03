import { response, request } from 'express';
import user from '../admin/admin.model.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';

export const login = async (req = request, res = response) => {
    const { emailAdmin, passwordAdmin } = req.body;

    try {
        let userData = null;
        const validAdminmail = emailAdmin.includes('@kinal.org.gt');
        if (validAdminmail) {

            if (emailAdmin) {
                userData = await user.findOne({ emailAdmin });
            } else {
                return res.status(500).json({
                    msg: 'Debe proporcionar un correo valido'
                });
            }

            if (!userData) {
                return res.status(400).json({
                    msg: 'Usuario no encontrado mi bro, probablemente no existe.'
                })
            }

            const isPasswordValid = await bcryptjs.compare(passwordAdmin, userData.passwordAdmin);

            if (!isPasswordValid) {
                return res.status(400).json({
                    msg: 'Constraseña incorrecta, metela bien porfa:c'
                });
            }

            const token = await generarJWT(userData.id);

            return res.status(200).json({
                msg: 'Bienvenido al sistema insano:D',
                userData,
                token
            })

        }

        return res.status(400).json({
            msg: 'debes ingresar un correo que tenga @kinal.org.gt'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno del servidor', error
        });
    }
}