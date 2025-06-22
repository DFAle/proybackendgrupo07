const actividadCrtl = require("../controllers/actividad.controller");
const express = require("express");
const router = express.Router();

router.get("/", actividadCrtl.getActividades);
router.post("/",actividadCrtl.createActividad);
router.delete("/:id", actividadCrtl.deleteActividad);
router.put("/:id",actividadCrtl.editActividad);
router.post("/:id/actividad",actividadCrtl.createProfesor);

module.exports = router;