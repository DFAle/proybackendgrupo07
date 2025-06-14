const mongoose = require('mongoose');
const { Schema } = mongoose;
const SociosSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    foto: { type: String, required: true },
    dni: { type: String, required: true },
    numeroSocio: { type: Number, required: true },
    activo: { type: Boolean, required: true }
})
module.exports = mongoose.models.Socios || mongoose.model('Socios', SociosSchema);