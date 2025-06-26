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

module.exports = usuarioCtrl;
