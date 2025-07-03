const mongoose = require('mongoose');
const { Schema } = mongoose;

function getLocalDate() {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    now.setMinutes(now.getMinutes() - timezoneOffset);
    return now;
}

const RegistroActividadSchema = new Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    actividad: { type: mongoose.Schema.Types.ObjectId, ref: 'Actividad', required: true },
    tipo: { type: String, enum: ['inscripcion', 'baja'], required: true },
    fecha: { type: Date, default: getLocalDate }
});

module.exports = mongoose.models.registroActividad || mongoose.model('registroActividad', RegistroActividadSchema);
