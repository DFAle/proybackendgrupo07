const mongoose = require("mongoose");
const { Schema } = mongoose;
const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true },
  username: { type: String, required: true,unique: true,trim: true,lowercase: true, },
  correo: { type: String, required: true },
  password: { type: String, required: true },
  activo:   { type: Boolean, required: true },
  rol:      {type: String,required: true}, 
});

module.exports = mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);
