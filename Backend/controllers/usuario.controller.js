const Usuario = require("../models/usuario");
const usuarioCtrl = {};

/* Login de Usuario */
usuarioCtrl.login = async (req, res) => {
  //Definir los criterios de busqueda en base al nombre de usuario y contraseña
  const criterio = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const user = await Usuario.findOne(criterio); //Retorno un objeto que cumpla con el criterio
    if (!user) {
      res.json({
        status: 0,
        msg: "Las crendeciales no son correctas",
      });
    } else {
      res.json({
        status: 1,
        msg: "Bienvenido, se ha logueado correctamente",
        username: user.username, //retorno información útil para el frontend
        rol: user.rol, //retorno información útil para el frontend
        userid: user._id, //retorno información útil para el frontend
      });
    }
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
    const { username } = req.body;
    const existeUsuario = await Usuario.findOne({ username });
    if (existeUsuario) {
      res.status(400).json({
        status: "0",
        msg: "El nombre de usuario ya está en uso",
      });
    } else {
      var usuario = new Usuario(req.body);
      await usuario.save();
      res.json({
        status: "1",
        msg: "Usuario Creado",
      });
    }
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
  const { username } = req.body;
  const existeUsuario = await Usuario.findOne({ username });
  if (existeUsuario) {
    res.status(400).json({
      status: "0",
      msg: "El nombre de usuario ya está en uso",
    });
  } else {
    const vusuario = new Usuario(req.body);
    await Usuario.updateOne({ _id: req.body._id }, vusuario);
    res.json({
      status: "1",
      msg: "Usuario actualizado",
    });
  }
  try {
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error al actualizar un usuario",
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
  var usuarios = await Usuario.find();
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
