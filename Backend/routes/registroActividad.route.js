const registroActividadCtrl = require("../controllers/registroActividad.controller");
const express = require("express");
const router = express.Router();

router.post('/:activityId/inscribirse', registroActividadCtrl.inscribirse);

module.exports = router;