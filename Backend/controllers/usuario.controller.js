const rol = require("../models/rol");
const Usuario = require("../models/usuario");
const usuarioCtrl = {};

/* Login de Usuario */
usuarioCtrl.login = async (req, res) => {


  const criterio = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const user = await Usuario.findOne(criterio).populate('rol');
    console.log(criterio);

    if (!user) {
      return res.json({
        status: 0,
        msg: "Las credenciales no son correctas",
      });
    }

    if (!user.activo) {
      return res.json({
        status: 0,
        msg: "El usuario está inactivo",
      });
    }

    res.json({
      status: 1,
      msg: "Bienvenido, se ha logueado correctamente",
      username: user.username,
      userid: user._id,
      rol: user.rol.tipo

    });

  } catch (error) {
    res.json({
      status: 0,
      msg: "error",
    });
  }
};

/* Crear Usuario */
usuarioCtrl.createUsuario = async (req, res) => {
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
  var usuarios = await Usuario.find().populate('rol');
  res.json(usuarios);
};

/* Obtener por ID */
usuarioCtrl.getById = async (req, res) => {
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

/* Verifica si el usuario esta registrado en la plataforma a traves del correo */
usuarioCtrl.checkByUsernameOrEmail = async (req, res) => {

  try {
    console.log(req.body.login)
    const login = req.body.login;
    console.log(login);

    const usuario = await Usuario.findOne({
      $or: [
        { username: login },
        { correo: login }
      ]
    });

    respuesta = {
      registrado: usuario ? true : false
    }

    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json(respuesta);
  }
  console.log(respuesta)

  // console.log("funcion usuario email")
};


usuarioCtrl.loginByEmailOrUsername = async (req, res) => {
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
