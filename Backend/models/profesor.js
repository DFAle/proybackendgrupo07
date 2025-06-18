const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProfesorSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    espcializacion:{type:String, required:true},
    foto: { type: String, required: true },
    activo: { type: Boolean, required: true }
})
module.exports = mongoose.models.Profesor || mongoose.model('Profesor', ProfesorSchema);
