/*Se define el controlador para el manejo de crud*/
const usuarioCtrl = require("../controllers/usuario.controller");

/*Se crea el manejador de rutas*/
const express = require("express");
const router = express.Router();

/*Rutas*/
//Ruta para guardar un Usuario
router.post("/", usuarioCtrl.createUsuario);

//Ruta para el login con email o username
router.post("/auth/login",usuarioCtrl.loginByEmailOrUsername);

router.post("/auth/verificar", usuarioCtrl.checkByUsernameOrEmail);


//Ruta para editar un Usuario por ID
router.put("/:id", usuarioCtrl.editUsuario);

//Ruta para eliminar un Usuario por ID
router.delete("/:id", usuarioCtrl.deleteUsuario);

//Ruta para obtener un usuarios por roles
router.get("/rol", usuarioCtrl.getByRol);

//Ruta para obtener todos los Usuarios
router.get("/", usuarioCtrl.getUsuarios);

//Ruta para obtener un Usuario por ID
router.get("/:id", usuarioCtrl.getById);

//Ruta para obtener un usuario por username
router.get("/username/:username", usuarioCtrl.getByUsername);




module.exports = router;
