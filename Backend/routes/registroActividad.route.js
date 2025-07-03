const registroActividadCtrl = require("../controllers/registroActividad.controller");
const express = require("express");
const router = express.Router();

router.get('/historial/usuario/:userId', registroActividadCtrl.historialPorUsuario);

router.get('/:id/historial', registroActividadCtrl.obtenerHistorialActividad);

module.exports = router;