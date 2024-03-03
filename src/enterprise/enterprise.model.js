import mongoose from "mongoose";

const levelin = ['Altito', 'Medio', 'Bajito'];
const categories = ['Tecnología', 'Salud', 'Finanzas', 'Educación', 'Comercio', 'Manufactura', 'Otro']

const EnterpriseSchema = mongoose.Schema({
    nameEnterprise: {
        type: String,
        required: [true, "the name is a parameter required"],
    },
    levelImpact: {
        type: String,
        enum: levelin,
        required: [true],
    },
    experienceYear: {
        type: Number,
        required: [true, "the years of experience are parameter required"],
    },
    categoryEnterprise: {
        type: String,
        enum: categories,
        required: [true, "The categories are a paremeter required"],
    }
});

EnterpriseSchema.methods.toJSON = function () {
    const { __v, _id, ...enterprise } = this.toObject();
    enterprise.uid = _id;
    return enterprise;
}

export default mongoose.model('Enterprise', EnterpriseSchema)