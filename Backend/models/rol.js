const mongoose = require("mongoose");
const { Schema } = mongoose;
const UsuarioSchema = new Schema({
  id: { type: String, required: true},
  tipo: { type: String, required: true },
  //Administrador, Profesor o Socio
});

module.exports = mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);
