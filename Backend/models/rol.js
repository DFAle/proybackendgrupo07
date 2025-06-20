const mongoose = require("mongoose");
const { Schema } = mongoose;
const RolSchema = new Schema({
  id: { type: String, required: true },
  tipo: { type: String, required: true },
});

module.exports = mongoose.models.RolSchema || mongoose.model("Rol", RolSchema);
