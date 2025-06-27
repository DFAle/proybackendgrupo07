const Profesor = require('../models/profesor');
const profesorCtrl = {}

profesorCtrl.getProfesor = async (req, res) => {
    var profesor = await Profesor.find();
    res.json(profesor);
}

profesorCtrl.getProfesorById = async (req, res) => {
    try {
        const profesor = await Profesor.findById(req.params.id);
        if (!profesor) {
            return res.status(404).json({
                status: "0",
                msg: "Profesor no encontrado",
            });
        }
        res.json(profesor);
    } catch (error) {
        res.status(400).json({
            status: "0",
            msg: "Error al buscar al profesor",
        });
    }
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

/*profesorCtrl.editProfesor = async (req, res) => {
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
}*/

profesorCtrl.editProfesor = async (req, res) => {
    try {
        const updatedProfesor = await Profesor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProfesor) {
            return res.status(404).json({
                status: '0',
                msg: 'Profesor no encontrado para actualizar'
            });
        }

        res.json({
            status: '1',
            msg: 'Profesor actualizado',
            profesor: updatedProfesor
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación',
            error: error.message
        });
    }
};

module.exports = profesorCtrl;