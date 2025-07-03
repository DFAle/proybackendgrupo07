const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  actividadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Actividad' },
  paymentId: String,
  status: String,
  monto: Number,
  emailComprador: String,
  fechaPago: Date,
  metodo: String,
  comprobante: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Pago', pagoSchema);
