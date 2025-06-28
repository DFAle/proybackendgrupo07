const mongoose = require('mongoose');
const { Schema } = mongoose;
const ActividadSchema = new Schema({
    titulo: { type: String, required: true },
    foto: { type: String, required: true },
    detalle: { type: String, required: true },
    estado: { type: Boolean, required: true },
    nivel: { type: String, required: true },
    cuposDisponibles: { type: Number, required: true },//cantidad máxima de cupos ej 10 o 20 VALOR FIJO
    inscriptos: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],// de acuerdo al tamaño del arreglo se determina si quedan cupos disponibles
    horarios: [{
        dia: { type: String, required: true },     // "Lunes", "Miércoles"
        horaInicial: { type: String, required: true },
        horaFinal: { type: String, required: true }       // "18:00", "19:30"
    }],
    profesor: { type: Schema.Types.ObjectId, ref: 'Profesor', required: true },//un profesor por actividad
    precio: { type: Number, required: true },
})
module.exports = mongoose.models.Actividad || mongoose.model('Actividad', ActividadSchema);
