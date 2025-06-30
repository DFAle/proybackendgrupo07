const actividadCrtl = require("../controllers/actividad.controller");
const express = require("express");
const router = express.Router();

router.post('/suscribirse/:id', actividadCrtl.inscribirUsuario);

// Luego las generales
router.get("/", actividadCrtl.getActividad);
router.post("/", actividadCrtl.createActividad);
router.delete("/:id", actividadCrtl.deleteActividad);
router.put("/:id", actividadCrtl.editActividad);
router.get("/:id", actividadCrtl.getById);

module.exports = router;
