const Rol = require("../models/rol");
const rolCtrl = {};

rolCtrl.getRoles = async (req, res) => {
    try {
        const roles = await Rol.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'msg': 'Error al cargar los roles'
        });
    }
};

rolCtrl.createRol = async (req, res) => {
    const rol = new Rol(req.body);
    try {
        await rol.save();
        res.json({
            'status': '1',
            'msg': 'Rol guardado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al guardar el rol'
        });
    }
};


rolCtrl.deleteRol = async (req, res) => {
    const { id } = req.params;
    try {
        const rolEliminado = await Rol.findByIdAndDelete(id);
        if (!rolEliminado) {
            return res.status(404).json({
                'status': '0',
                'msg': 'Rol no encontrado'
            });
        }
        res.json({
            'status': '1',
            'msg': 'Rol eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'msg': 'Error al eliminar el rol'
        });
    }
};

module.exports = rolCtrl;
