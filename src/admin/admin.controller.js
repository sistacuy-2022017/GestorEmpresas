import bcryptjs from 'bcryptjs';
import Admin from './admin.model.js';

export const registrarUsuarios = async (req, res) => {
    const { nameAdmin, emailAdmin, passwordAdmin } = req.body;

    const usuario = new Admin({ nameAdmin, emailAdmin, passwordAdmin });

    const encript = bcryptjs.genSaltSync();
    usuario.passwordAdmin = bcryptjs.hashSync(passwordAdmin, encript);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}