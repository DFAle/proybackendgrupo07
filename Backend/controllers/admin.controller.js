const Admin = require('../models/admin'); // Importa el modelo de Admin
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
adminCtrl.loginAdmin = async (req, res) => {
//en req.body se espera que vengan las credenciales de login
//defino los criterios de busqueda en base al username y password recibidos
const criteria = {
usuario: req.body.usuario,
contrasenia: req.body.contrasenia,
}

try {
//el método findOne retorna un objeto que cumpla con los criterios de busqueda
const user = await Admin.findOne(criteria)
if (!user) {
res.json({
status: 0,
msg: "not found"
})
} else {
res.json({
status: 1,
msg: "success",
username: user.usuario //retorno información útil para el frontend


})
}
} catch (error) {
res.json({
status: 0,
msg: 'error'
})
}
}
module.exports = adminCtrl;