const mongoose = require('mongoose');
const profesor = require('./profesor'); 
const { Schema } = mongoose;
const ActividadSchema = new Schema({

    titulo: { type: String, required: true },
    foto: { type: String, required: true },
    detalle: { type: String, required: true },
    estado: { type: Boolean, required: true },
    nivel: { type: String, required: true },
    cuposDisponibles: { type: Number, required: true },
    cantidadInscriptos: { type: Number, required: true },
    //profesor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profesor' }],
    horarios: [{
        dia: { type: String, required: true },     // "Lunes", "Miércoles"
        horaInicial: { type: String, required: true },
        horaFinal: { type: String, required: true }       // "18:00", "19:30"
    }],
    profesor:[{type: profesor.schema}]
})
module.exports = mongoose.models.Actividad || mongoose.model('Actividad', ActividadSchema);
