import jwt from 'jsonwebtoken';
import Admin from '../admin/admin.model.js'

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "No hay token en la solicitud bro",
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const admin = await Admin.findById(decoded.uid);

        if(!admin){
            return res.status(401).json({
                msg: 'El usuario no ta en la base de datos:c'
            });
        }

        if(!admin.estadoAdmin){
            return res.status(401).json({
                msg: 'Token inválido - admin con estado: false'
            });
        }

        req.admin = admin;

        next();

    }catch(error){
        console.error('Error al verificar el token JWT:', error);
        return res.status(401).json({
            msg: "Token JWT no válido",
        });
    }

}