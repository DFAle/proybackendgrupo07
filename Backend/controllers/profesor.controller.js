const Profesor = require('../models/profesor');
const profesorCtrl = {}

profesorCtrl.getProfesor = async (req, res) => {
    var profesor = await Profesor.find();
    res.json(profesor);
}

profesorCtrl.createProfesor = async (req, res) => {
    var profesor = new Profesor(req.body);
    try {
        await profesor.save();
        res.json({
            'status': '1',
            'msg': 'Profesor guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

profesorCtrl.deleteProfesor = async (req, res) => {
    try {
        await Profesor.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Profesor removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

profesorCtrl.editProfesor = async (req, res) => {
    const profesor = new Profesor(req.body);
    try {
        await Profesor.updateOne({ _id: req.body._id }, profesor);
        res.json({
            'status': '1',
            'msg': 'Profesor updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = profesorCtrl;