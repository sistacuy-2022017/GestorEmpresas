import mongoose from 'mongoose';

const AdministratorSchema = mongoose.Schema({
    nameAdmin: {
        type: String,
        required: [true, "the namesAdmin is a parameter required"],
    },
    emailAdmin: {
        type: String,
        required: [true, "the emailAdmin is a parameter required"],
    },
    passwordAdmin: {
        type: String,
        required: [true, "the passwordAdmin is a parameter required"],
    },
    estadoAdmin: {
        type: Boolean,
        default: true,
    },
});

/*AdministratorSchema.methods.toJSON = function (){
    const { __v, passwordAdmin, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
};*/

export default mongoose.model('Admin', AdministratorSchema);