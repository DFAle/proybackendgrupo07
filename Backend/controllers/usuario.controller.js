const rol = require("../models/rol");
const usuario = require("../models/usuario");
const Usuario = require("../models/usuario");
const usuarioCtrl = {};

/* Crear Usuario */
usuarioCtrl.createUsuario = async (req, res) => {
    /*
  #swagger.tags = ['Usuarios']
  #swagger.summary = 'Crear un nuevo usuario'
  #swagger.description = 'Endpoint para registrar un nuevo usuario en el sistema.'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos del usuario a crear',
    required: true,
    schema: {
      type: 'object',
      additionalProperties: true
    }
  }
  #swagger.responses[200] = {
    description: 'Usuario creado exitosamente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: '1' },
        msg: { type: 'string', example: 'Usuario Creado' }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Error al crear usuario',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: '0' },
        msg: { type: 'string', example: 'Mensaje de error específico' }
      }
    }
  }
  */
  
  try {
    var username = new Usuario(req.body);
    await username.save();
    res.json({
      status: "1",
      msg: "Usuario Creado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: error.message,
    });
  }
};

//Mejorar método de editar
/* Editar un Usuario */
usuarioCtrl.editUsuario = async (req, res) => {
    /*
  #swagger.tags = ['Usuarios']
  #swagger.summary = 'Actualizar un usuario'
  #swagger.description = 'Endpoint para actualizar los datos de un usuario existente.'
  #swagger.parameters['id'] = {
    in: 'path',
    name: 'id',
    required: true,
    description: 'ID del usuario a actualizar',
    type: 'string'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Campos a actualizar',
    required: true,
    schema: {
      type: 'object',
      additionalProperties: true
    }
  }
  #swagger.responses[200] = {
    description: 'Actualización exitosa',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: '1' },
        msg: { type: 'string', example: 'Usuario actualizado correctamente' }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Error en la actualización',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: '0' },
        msg: { type: 'string', example: 'No se actualizó ningún usuario. Verifica el ID.' }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Error general',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: '0' },
        msg: { type: 'string', example: 'Error al actualizar el usuario' },
        error: { type: 'string', example: 'Mensaje de error detallado' }
      }
    }
  }
  */
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await Usuario.updateOne({ _id: id }, updateData);
    if (result.modifiedCount === 1) {
      res.json({
        status: "1",
        msg: "Usuario actualizado correctamente"
      });
    } else {
      res.status(400).json({
        status: "0",
        msg: "No se actualizó ningún usuario. Verifica el ID."
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error al actualizar el usuario",
      error: error.message
    });
  }
};

/* Eliminar Usuario */
usuarioCtrl.deleteUsuario = async (req, res) => {
    /*
  #swagger.tags = ['Usuarios']
  #swagger.summary = 'Eliminar un usuario'
  #swagger.description = 'Endpoint para eliminar un usuario existente del sistema.'
  #swagger.parameters['id'] = {
    in: 'path',
    name: 'id',
    required: true,
    description: 'ID del usuario a eliminar',
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Usuario eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: '1' },
        msg: { type: 'string', example: 'Usuario eliminado' }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Error al eliminar usuario',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: '0' },
        msg: { type: 'string', example: 'Mensaje de error específico' }
      }
    }
  }
  */
  try {
    await Usuario.deleteOne({ _id: req.params.id });
    res.json({
      status: "1",
      msg: "Usuario eliminado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: error.message,
    });
  }
};

/* Obtener todos los usuarios */
usuarioCtrl.getUsuarios = async (req, res) => {
    /*
  #swagger.tags = ['Usuarios']
  #swagger.summary = 'Obtener listado de usuarios'
  #swagger.description = 'Endpoint para obtener todos los usuarios registrados en el sistema con sus roles.'
  #swagger.responses[200] = {
    description: 'Listado de usuarios obtenido exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '60c72b2f9f1b2c001c8e4d1f' },
          nombre: { type: 'string', example: 'Gustavo' },
          apellido: { type: 'string', example: 'Cassano' },
          dni: { type: 'string', example: '35786987' },
          username: { type: 'string', example: 'cagus14' },
          correo: { type: 'string', example: 'gustavo@gmail.com' },
          activo: { type: 'boolean', example: true },
          rol: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '60c72b2f9f1b2c001c8e4d20' },
              tipo: { type: 'string', example: 'Usuario' }
            }
          }
        }
      }
    }
  }
  */
  var usuarios = await Usuario.find().populate('rol');
  res.json(usuarios);
};

/* Obtener por ID */
usuarioCtrl.getById = async (req, res) => {
  /*
  #swagger.tags = ['Usuarios']
  #swagger.summary = 'Obtener usuario por ID'
  #swagger.description = 'Endpoint para obtener un usuario específico por su ID único.'
  #swagger.parameters['id'] = {
    in: 'path',
    name: 'id',
    required: true,
    description: 'ID único del usuario a buscar',
    type: 'string',
    example: '60c72b2f9f1b2c001c8e4d1f'
  }
  #swagger.responses[200] = {
    description: 'Usuario encontrado exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '60c72b2f9f1b2c001c8e4d1f' },
          nombre: { type: 'string', example: 'Gustavo' },
          apellido: { type: 'string', example: 'Cassano' },
          dni: { type: 'string', example: '35786987' },
          username: { type: 'string', example: 'cagus14' },
          correo: { type: 'string', example: 'gustavo@gmail.com' },
          activo: { type: 'boolean', example: true },
          rol: { type: 'string', example: '60c72b2f9f1b2c001c8e4d20' }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Error en la búsqueda',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: '0' },
        msg: { type: 'string', example: 'Error al buscar al usuario' }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'Usuario no encontrado',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: '0' },
        msg: { type: 'string', example: 'Usuario no encontrado' }
      }
    }
  }
  */
  try {
    const usuario = await Usuario.find({ _id: req.params.id });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error al buscar al usuario",
    });
  }
};

/* Obtener por username */
usuarioCtrl.getByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const usuario = await Usuario.findOne({ username });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion.",
    });
  }
};

/* Obtener por perfil */
usuarioCtrl.getByRol = async (req, res) => {
  try {
    const { rol } = req.query;
    const usuario = await Usuario.find({ rol });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion.",
    });
  }
};

usuarioCtrl.checkByUsernameOrEmail = async (req, res) => {

    /*
  #swagger.tags = ['Usuarios']
  #swagger.summary = 'Verificar existencia de usuario'
  #swagger.description = 'Verifica si un usuario existe en el sistema mediante su nombre de usuario o correo electrónico.'
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Credenciales a verificar',
    required: true,
    schema: {
      type: 'object',
      required: ['login'],
      properties: {
        login: {
          type: 'string',
          description: 'Nombre de usuario o correo electrónico a verificar',
          example: 'usuario@ejemplo.com'
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Resultado de la verificación',
    schema: {
      type: 'object',
      properties: {
        registrado: {
          type: 'boolean',
          description: 'Indica si el usuario está registrado',
          example: true
        },
        id: {
          type: 'string',
          description: 'ID del usuario si está registrado',
          example: '60c72b2f9f1b2c001c8e4d1f',
          nullable: true
        },
        rol: {
          type: 'string',
          description: 'Rol del usuario si está registrado',
          example: 'Administrador',
          nullable: true
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Error en la solicitud',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Mensaje de error',
          example: 'Error al verificar usuario'
        }
      }
    }
  }
  */
  try {
    console.log(req.body.login)
    const login = req.body.login;
    console.log(login);

    const usuario = await Usuario.findOne({
      $or: [
        { username: login },
        { correo: login }
      ]
    }).populate('rol');

    respuesta = {
      registrado: usuario ? true : false,
      id: usuario ? usuario._id : null,
      rol: usuario ? usuario.rol.tipo : null
    }

    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json(respuesta);
  }
  console.log(usuario)
  console.log(respuesta)

};




usuarioCtrl.loginByEmailOrUsername = async (req, res) => {
   /*
  #swagger.tags = ['Usuarios']
  #swagger.summary = 'Iniciar sesión de usuario'
  #swagger.description = 'Permite a un usuario autenticarse utilizando su correo electrónico o nombre de usuario y contraseña.'
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Credenciales de acceso',
    required: true,
    schema: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: {
          type: 'string',
          description: 'Correo electrónico o nombre de usuario',
          example: 'usuario@ejemplo.com'
        },
        password: {
          type: 'string',
          format: 'password',
          description: 'Contraseña del usuario',
          example: 'MiContraseñaSegura123'
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Inicio de sesión exitoso',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 1 },
        msg: { type: 'string', example: 'Bienvenido, se ha logueado correctamente' },
        username: { type: 'string', example: 'ejemploUser' },
        userid: { type: 'string', example: '60c72b2f9f1b2c001c8e4d1f' },
        rol: { type: 'string', example: 'Administrador' }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Credenciales incompletas',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 0 },
        msg: { type: 'string', example: 'Por favor proporcione credenciales completas' }
      }
    }
  }
  #swagger.responses[401] = {
    description: 'Credenciales incorrectas',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 0 },
        msg: { type: 'string', example: 'Las credenciales no son correctas' }
      }
    }
  }
  #swagger.responses[403] = {
    description: 'Usuario inactivo',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 0 },
        msg: { type: 'string', example: 'El usuario está inactivo' }
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 0 },
        msg: { type: 'string', example: 'Error interno del servidor' }
      }
    }
  }
  */
  console.log("login con email o usuario")
  const { login, password } = req.body; // Cambiamos de username a login (puede ser email o username)
  console.log(login)
  console.log(password)
  if (!login || !password) {
    return res.status(400).json({
      status: 0,
      msg: "Por favor proporcione credenciales completas"
    });
  }

  try {
    // Primero determinamos si el login es un email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);

    // Creamos el criterio de búsqueda dinámico
    const criterio = {
      [isEmail ? 'correo' : 'username']: login,
      password: password
    };

    const user = await Usuario.findOne(criterio).populate('rol');

    if (!user) {
      // Si no encontramos con el primer criterio, intentamos con el otro
      const alternativeCriterio = {
        [isEmail ? 'username' : 'correo']: login,
        password: password
      };

      const alternativeUser = await Usuario.findOne(alternativeCriterio).populate('rol');

      if (!alternativeUser) {
        return res.status(401).json({
          status: 0,
          msg: "Las credenciales no son correctas"
        });
      }

      // Si encontramos con el criterio alternativo
      return handleSuccessfulLogin(res, alternativeUser);
    }

    // Si encontramos con el primer criterio
    return handleSuccessfulLogin(res, user);

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      status: 0,
      msg: "Error interno del servidor"
    });
  }
};

// Función auxiliar para manejar el login exitoso
function handleSuccessfulLogin(res, user) {
  if (!user.activo) {
    return res.status(403).json({
      status: 0,
      msg: "El usuario está inactivo"
    });
  }

  res.json({
    status: 1,
    msg: "Bienvenido, se ha logueado correctamente",
    username: user.username,
    userid: user._id,
    rol: user.rol.tipo
  });
}


module.exports = usuarioCtrl;
