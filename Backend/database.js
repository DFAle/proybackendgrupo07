require('dotenv').config(); // Carga las variables del .env
const mongoose = require('mongoose');
//const URI = process.env.url;
const URI = 'mongodb://localhost/proyectoFinal';
mongoose.connect(URI)
.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err))
module.exports = mongoose;