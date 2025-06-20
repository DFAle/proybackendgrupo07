const profesorCtrl = require("../controllers/profesor.controller");
const express = require("express");
const router = express.Router();

router.get('/',profesorCtrl.getProfesor);
router.post('/',profesorCtrl.createProfesor);
router.delete('/:id',profesorCtrl.deleteProfesor);
router.put('/:id',profesorCtrl.editProfesor);
module.exports = router;