const Actividad = require('../models/actividad');

const actividadCtrl = {}

actividadCtrl.getActividad = async (req, res) => {
    var actividad = await Actividad.find();
    res.json(actividad);
}
actividadCtrl.createActividad = async (req, res) => {
    var actividad = new Actividad(req.body);
    try {
        await actividad.save();
        res.json({
            'status': '1',
            'msg': 'Actividad guardada.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al guardad actividad.'
        })
    }
}

actividadCtrl.editActividad = async (req, res) => {
    const actividad = new Actividad(req.body);
    try {
        await Actividad.updateOne({ _id: req.body._id }, actividad);
        res.json({
            'status': '1',
            'msg': 'Actividad Actualizada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

actividadCtrl.deleteActividad = async (req, res) => {
    try {
        await Actividad.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Actividad Eliminada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
actividadCtrl.createProfesor = async (req, res) => {
    try {
        const profesor = req.body; // { nombre, dni, email }
        const actividad = await Actividad.findById(req.params.id);
        actividad.profesor.push(profesor);
        await actividad.save();
        res.json({
            status: '1',
            msg: 'Profesor guardado en la actividad.'
        });

    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al guardar profesor.'
        });
    }
};

/* Obtener por ID */
actividadCtrl.getById = async (req, res) => {
  try {
    const profesor = await Actividad.find({ _id: req.params.id });
    res.json(profesor);
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error al buscar al actividad",
    });
  }
};

module.exports = actividadCtrl;