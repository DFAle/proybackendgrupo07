const mongoose = require('mongoose');
const { Schema } = mongoose;
const ActividadSchema = new Schema({

    nombre: { type: String, required: true },
    //foto: { type: String, required: true },
    detalle: { type: String, required: true },
    estado: { type: Boolean, required: true },
    nivel: { type: String, required: true },
    cuposDisponibles: { type: Number, required: true },
    cantidadInscriptos: { type: Number, required: true },
    //profesor: [{ type: Profesor.schema,ref: Profesor}],
    horarios: [{
        dia: { type: String, required: true },     // "Lunes", "Miércoles"
        horaInicial: { type: String, required: true },
        horaFinal: { type: String, required: true }       // "18:00", "19:30"
    }]
})
module.exports = mongoose.models.Actividad || mongoose.model('Actividad', ActividadSchema);
