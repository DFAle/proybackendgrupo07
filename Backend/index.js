const express = require('express');

//referenciamos a la libreria de dontenv
const dotenv = require("dotenv");

//cargamos las variables de entorno, busca en el archivo oculto .env
dotenv.config();

const cors = require('cors');
const {mongoose} = require('./database');
var app = express();
//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'})); //http://localhost:4200 //https://clubacleticosantelmo.onrender.com
 
//Cargamos el modulo de direccionamiento de rutas
//app.use('/api/agente', require('./routes/agente.route.js'));
app.use('/api/socio', require('./routes/socio.route'));
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/actividad', require('./routes/actividad.route.js'));
app.use('/api/admin', require('./routes/admin.route.js'));
app.use('/api/rol', require('./routes/rol.route.js'));
app.use('/api/profesor', require('./routes/profesor.route.js'));

//rutas para mercado pago
app.use('/api/mp', require('./routes/mp.route.js'));

app.set('port', process.env.PORT || 3000);
//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});
