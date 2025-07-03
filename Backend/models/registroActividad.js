const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegistroActividadSchema = new Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    actividad: { type: mongoose.Schema.Types.ObjectId, ref: 'Actividad', required: true },
    tipo: { type: String, enum: ['inscripcion', 'baja'], required: true },
    fecha: { type: Date, default: () => new Date() }
});

module.exports = mongoose.models.registroActividad || mongoose.model('registroActividad', RegistroActividadSchema);
