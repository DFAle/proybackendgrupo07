const rolCtrl = require("../controllers/rol.controller");
const express = require("express");
const router = express.Router();

router.get("/", rolCtrl.getRoles);
router.post("/",rolCtrl.createRol);
router.delete("/:id", rolCtrl.deleteRol);
module.exports = router;