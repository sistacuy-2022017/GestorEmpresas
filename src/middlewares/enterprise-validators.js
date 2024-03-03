import EnterpriseModel from '../enterprise/enterprise.model.js';

export const categoryExiste = async (categoryEnterprise = '') => {
    const categoriasExistentes = [
        'Tecnología', 'Salud', 'Finanzas', 'Educación', 'Comercio', 'Manufactura', 'Otro'
    ];

    if (!categoriasExistentes.includes(categoryEnterprise)) {
        const mensajeError = `La categoria debe ser una de las siguientes categorías: ${categoriasExistentes.join(', ')}.`;
        throw new Error(mensajeError);
    }


}

export const levelImExiste = async (levelImpact = '') => {
    const categoriasExistentes = [
        'Altito', 'Medio', 'Bajito'
    ];

    if (!categoriasExistentes.includes(levelImpact)) {
        const mensajeError = `El nivel impacto debe ser uno de los siguientes: ${categoriasExistentes.join(', ')}.`;
        throw new Error(mensajeError);
    }


}


export const existeEmpresaByName = async (nameEnterprise = '') => {
    const tituloMin = nameEnterprise.toLowerCase();

    const existeTittle = await EnterpriseModel.findOne({
        nameEnterprise: {
            $regex: new RegExp(`^${tituloMin}$`, 'i')
        }
    });

    if (existeTittle) {
        throw new Error(`el titulo ${nameEnterprise} ya existe bro`);
    }
}
