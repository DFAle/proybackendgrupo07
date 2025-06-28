const actividadCrtl = require("../controllers/actividad.controller");
const express = require("express");
const router = express.Router();

router.get("/", actividadCrtl.getActividad);
router.post("/",actividadCrtl.createActividad);
router.delete("/:id", actividadCrtl.deleteActividad);
router.put("/:id",actividadCrtl.editActividad);
//Ruta para obtener un actividad por ID
router.get("/:id", actividadCrtl.getById);
module.exports = router;