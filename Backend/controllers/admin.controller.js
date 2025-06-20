const Admin = require('../models/admin');
const adminCtrl = {};

//Carga todos los Admins.
adminCtrl.getAdmins = async (req, res) => {
    var admin = await Admin.find();
    res.json(admin);
}

//Crear Admin.
adminCtrl.createAdmin = async (req, res) => {
    var admin = new Admin(req.body);
    try {
        await admin.save();
        res.json({
            'status': '1',
            'msg': 'Admin creado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al crear admin.'
        })
    }
}

//Editar Admin.
adminCtrl.editAdmin = async (req, res) => {
    const eAdmin = new Admin(req.body);
    try {
        await Admin.updateOne({ _id: req.body._id }, eAdmin);
        res.json({
            'status': '1',
            'msg': 'Admin actualizado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al actualizar datos del admin.'
        })
    }
}

module.exports = adminCtrl;