const mongoose = require("mongoose");
const { Schema } = mongoose;
const UsuarioSchema. = new Schema({
  username: { type: String, required: true,unique: true,trim: true,lowercase: true, },
  password: { type: String, required: true },
  activo:   { type: Boolean, required: true },
  rol:      {type: String,required: true,
    enum: ["Administrador", "Profesor", "Socio"],
  }, //Administrador, Profesor o Socio
});

module.exports = mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);
