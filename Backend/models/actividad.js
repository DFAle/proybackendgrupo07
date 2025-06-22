const mongoose = require('mongoose');
const profesor = require('./profesor'); 
const { Schema } = mongoose;
const ActividadSchema = new Schema({

    titulo: { type: String, required: true },
    detalle: { type: String, required: true },
    img: { type: String, required: true },
    cuposDisponibles: { type: Number, required: true },
    cantidadInscriptos: { type: Number, required: true },
    profesores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profesor' }],
    horarios: [{
        dia: { type: String, required: true }, //"Lunes", "Miércoles"
        horaInicial: { type: String, required: true }, // "18:00"
        horaFinal: { type: String, required: true }, //"19:30"
    }],
    
})
module.exports = mongoose.models.Actividad || mongoose.model('Actividad', ActividadSchema);
