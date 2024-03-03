import adminVal from '../admin/admin.model.js'

export const existeAdminByCorreo = async (emailAdmin = '') => {
    const correoAdminMin = emailAdmin.toLowerCase();

    const existCorreo = await adminVal.findOne({
        emailAdmin: {
            $regex: new RegExp(`^${correoAdminMin}$`, 'i')
        }
    });

    if(existCorreo){
        throw new Error(`el admin con el correo: ${emailAdmin} ya existe mi administrador`);
    }
}