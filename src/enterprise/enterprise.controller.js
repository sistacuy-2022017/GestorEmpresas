import { response, request } from "express";
import Enterprise from '../enterprise/enterprise.model.js';
import { existeEmpresaByName } from "../middlewares/enterprise-validators.js";
import enterpriseModel from "../enterprise/enterprise.model.js";
import Excel from 'exceljs';

export const enterprisePost = async (req = request, res = response) => {
    const { nameEnterprise, levelImpact, experienceYear, categoryEnterprise } = req.body;
    const enterprise = new Enterprise({ nameEnterprise, levelImpact, experienceYear, categoryEnterprise });
    console.log(enterprise);

    await enterprise.save();

    res.status(200).json({
        enterprise
    });
}

export const EnterprisePut = async (req, res) => {
    const { id } = req.params;
    const { nameEnterprise, levelImpact, categoryEnterprise, experienceYear } = req.body;

    try {
        // Verificar si el nuevo nombre de empresa ya existe
        if (nameEnterprise) {
            await existeEmpresaByName(nameEnterprise);
        }

        // Verificar si el nivel de impacto y la categoría empresarial existen
        if (categoryEnterprise) {
            const categoriasExistentes = [
                'Tecnología', 'Salud', 'Finanzas', 'Educación', 'Comercio', 'Manufactura', 'Otro'
            ];
            if (!categoriasExistentes.includes(categoryEnterprise)) {
                throw new Error(`La categoría empresarial "${categoryEnterprise}" no es válida. Debe ser una de: ${categoriasExistentes.join(", ")}`);
            }
        }

        if (levelImpact) {
            const categoriasExistentesss = [
                'Altito', 'Medio', 'Bajito'
            ];

            if (!categoriasExistentesss.includes(levelImpact)) {
                const mensajeError = `El nivel impacto debe ser uno de los siguientes: ${categoriasExistentesss.join(', ')}.`;
                throw new Error(mensajeError);
            }
        }

        // Crear un objeto con los campos actualizados
        const updatedFields = {
            nameEnterprise,
            levelImpact,
            categoryEnterprise,
            experienceYear
        };

        // Actualizar la empresa con todos los campos actualizables
        await Enterprise.findByIdAndUpdate(id, updatedFields);

        // Obtener la empresa actualizada
        const empresaActualizada = await Enterprise.findOne({ _id: id });

        res.status(200).json({
            msg: 'La empresa se actualizó correctamente.',
            empresa: empresaActualizada
        });
    } catch (error) {
        // Manejar el error adecuadamente
        console.error('Error al actualizar la empresa:', error);
        // Para otros errores, enviar una respuesta de error genérica
        res.status(400).json({ error: error.message });
    }
};

export const obtenerEmpresas = async (req, res) => {
    const { order } = req.params;
    let sortCriteria = {};

    const descripcionCasos = {
        "1": "Ordenar por nombre ascendente significa que usaste el case 1",
        "2": "Ordenar por nombre descendente significa que usaste el case 2",
        "3": "Ordenar por años de experiencia ascendente significa que usaste el case 3",
        "4": "Ordenar por años de experiencia descendente significa que usaste el case 4",
        "5": "Ordenar por categoría ascendente significa que usaste el case 5",
        "6": "Ordenar por categoría descendente significa que usaste el case 6",
        "default": "Ordenar por nombre ascendente usaste el default para usar algun caso envia algun número despues del /enterprise/(numero)"  // Por defecto
    };

    // Determinar el criterio de ordenamiento
    switch (order) {
        case "1":
            sortCriteria["nameEnterprise"] = 1;
            break;
        case "2":
            sortCriteria["nameEnterprise"] = -1;
            break;
        case "3":
            sortCriteria["experienceYear"] = 1;
            break;
        case "4":
            sortCriteria["experienceYear"] = -1;
            break;
        case "5":
            sortCriteria["categoryEnterprise"] = 1;
            break;
        case "6":
            sortCriteria["categoryEnterprise"] = -1;
            break;
        default:
            sortCriteria["nameEnterprise"] = 1;
            break;
    }

    try {
        // Obtener el listado de empresas filtrado y ordenado
        const enterprises = await Enterprise.find().sort(sortCriteria);

        // Enviar la respuesta con las empresas obtenidas
        res.status(200).json({
            orden: descripcionCasos[order] || descripcionCasos["default"],
            enterprises,
        });
    } catch (error) {
        // Manejo de errores
        console.error("Error getting enterprises:", error);
        res.status(500).json({
            message: "Error getting enterprises",
            error: error.message,
        });
    }
};

export const generateReport = async (req, res) => {

    try {

        const enterprises = await Enterprise.find();

        const workbook = new Excel.Workbook();

        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.columns = [
            { header: 'Nombre', key: 'nameEnterprise', width: 30 },
            { header: 'Impacto', key: 'levelImpact', width: 20 },
            { header: 'Años Experiencia', key: 'experienceYear', width: 20 },
            { header: 'Categoría', key: 'categoryEnterprise', width: 25 },
        ];

        enterprises.forEach(enterprise => {
            worksheet.addRow({
                nameEnterprise: enterprise.nameEnterprise,
                levelImpact: enterprise.levelImpact,
                experienceYear: enterprise.experienceYear,
                categoryEnterprise: enterprise.categoryEnterprise
            })
        });

        const buffer = await workbook.xlsx.writeBuffer();

        res.attachment('reporte-gestorEmpresas.xlsx');

        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

}