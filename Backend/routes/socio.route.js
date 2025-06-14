const sociosCrtl = require("../controllers/socio.controller");
const express = require("express");
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get("/", sociosCrtl.getSocios);
router.post("/",sociosCrtl.createSocios);
router.delete("/:id", sociosCrtl.deleteSocio);
router.put("/:id",sociosCrtl.editSocios);
module.exports = router;