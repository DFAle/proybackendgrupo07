const mongoose = require('mongoose')
const { Schema } = mongoose

const AdminSchema = new Schema({
    usuario: {type: String,required: true},
    contrasenia: {type: String,required: true}
})

module.exports = mongoose.model.Admin || mongoose.model('Admin', AdminSchema)