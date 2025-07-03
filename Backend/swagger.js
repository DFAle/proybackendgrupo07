const usuario = require('./models/usuario');

const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'API de Club Atletico Sirio',
        description: 'Documentación de la API para la gestión de Usuarios, Rol, Actividades, Transaccion de Mercado Pago, Profesor.',
    },
    host: 'localhost:3000', // Reemplaza con la dirección de tu servidor
    basePath: "/",
    schemes: ['http', 'https'],
    tags: [
        {
            name: 'Usuarios',
            description: 'Operaciones relacionadas con los Usuarios.'
        },
        {
            name: 'Roles',
            description: 'Operaciones relacionadas con los Roles.'
        },
        {
            name: 'Actividades',
            description: 'Operaciones relacionadas con las Actividades.'
        },
        {
            name: 'Profesores',
            description: 'Operaciones relacionadas con los Profesores.'
        }
    ],
    definitions: {
        Usuario: {
            nombre: 'Gustavo',
            apellido: 'Cassano',
            dni: '35786987',
            username: 'cagus14',
            correo: 'gustavo@gmail.com',
            password: '123456',
            activo: true,
            rol: {
                id: '60c72b2f9f1b2c001c8e4d20',
                tipo: 'Usuario'
            }
        },
        Rol: {
            id: '60c72b2f9f1b2c001c8e4d20',
            tipo: 'Usuario'
        },
        Actividad: {
            titulo: 'Natación',
            foto: 'natacion.jpg',
            detalle: 'La natacion es un deporte de agua',
            estado: true,
            nivel: 'Principiante',
            cuposDisponibles: '10',
            inscriptos: [
                {
                    nombre: 'Gustavo',
                    apellido: 'Cassano',
                    dni: '35786987',
                    username: 'cagus14',
                    correo: 'gustavo@gmail.com',
                    password: '123456',
                    activo: true,
                    rol: {
                        id: '60c72b2f9f1b2c001c8e4d20',
                        tipo: 'Usuario'
                    }
                }
            ],
            horarios: [{
                dia: 'Lunes',     // "Lunes", "Miércoles"
                horaInicial: '10:00',
                horaFinal: '11:30'       // "18:00", "19:30"
            }],
            profesor: {
                nombre: 'Mario',
                apellido: 'Fariña',
                espcializacion: 'Natación',
                foto: 'mario.jpg',
                correo: 'mario@gmail.com',
                telefono: '3884194234',
                activo: true
            },
            precio: 20000,
        },
        Profesor: {
            nombre: 'Mario',
            apellido: 'Fariña',
            espcializacion: 'Natación',
            foto: 'mario.jpg',
            correo: 'mario@gmail.com',
            telefono: '3884194234',
            activo: true
        }

    }
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js']; // verifica la ruta
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log(`Documentación generada en ${outputFile}`);
    //require('./index.js'); // verifica la ruta donde inicia tu app
});