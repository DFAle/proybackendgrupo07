const adminCtrl = require('../controllers/admin.controller');
const express = require('express');
const router = express.Router();
router.get('/',adminCtrl.getAdmins);
router.post('/',adminCtrl.createAdmin);
router.put('/:_id',adminCtrl.editAdmin);
router.post('/login', adminCtrl.loginAdmin);
module.exports = router;