const actividadCrtl = require("../controllers/actividad.controller");
const express = require("express");
const router = express.Router();

router.get('/usuario/:userId', actividadCrtl.actividadesDeUsuario);
router.post('/suscribirse/:id', actividadCrtl.inscribirUsuario);
router.post('/desuscribirse/:id', actividadCrtl.darDeBajaUsuario);



// Luego las generales
router.get('/historial/usuario/:userId', actividadCrtl.historialPorUsuario);
router.get("/", actividadCrtl.getActividad);
router.post("/", actividadCrtl.createActividad);
router.delete("/:id", actividadCrtl.deleteActividad);
router.put("/:id", actividadCrtl.editActividad);
router.get("/:id", actividadCrtl.getById);

module.exports = router;