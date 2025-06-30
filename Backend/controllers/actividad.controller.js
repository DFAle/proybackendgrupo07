const Actividad = require('../models/actividad');

const actividadCtrl = {}

actividadCtrl.getActividad = async (req, res) => {
    var actividad = await Actividad.find(req.id).populate('profesor')
    res.json(actividad);
};

actividadCtrl.createActividad = async (req, res) => {
    var actividad = new Actividad(req.body);
    try {
        await actividad.save();
        res.json({
            'status': '1',
            'msg': 'Actividad guardada.'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'error': error
        })
    }
}

actividadCtrl.editActividad = async (req, res) => {
    try {
        await Actividad.findByIdAndUpdate(req.body._id, req.body);
        res.json({
            status: '1',
            msg: 'Actividad actualizada'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al actualizar actividad'
        });
    }
};

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

/* Obtener por ID */
actividadCtrl.getById = async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id)
            .populate('profesor') // Opcional si querés traer los datos del profesor
            .populate('inscriptos'); // Lo mismo para los inscriptos
        res.json(actividad);
    } catch (error) {
        res.status(400).json({
            status: "0",
            msg: "Error al buscar la actividad",
        });
    }
};

actividadCtrl.inscribirUsuario = async (req, res) => {
    const { usuarioId } = req.body;
    const { id } = req.params;

    try {
        const actividad = await Actividad.findById(id);

        if (!actividad) {
            return res.status(404).json({ status: '0', msg: 'Actividad no encontrada' });
        }

        if (actividad.inscriptos.includes(usuarioId)) {
            return res.status(400).json({ status: '0', msg: 'Ya estás inscripto en esta actividad.' });
        }

        if (actividad.inscriptos.length >= actividad.cuposDisponibles) {
            return res.status(400).json({ status: '0', msg: 'No hay más cupos disponibles.' });
        }

        actividad.inscriptos.push(usuarioId);
        await actividad.save();

        return res.json({ status: '1', msg: 'Inscripción exitosa.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: '0', msg: 'Error en el servidor.' });
    }
};

module.exports = actividadCtrl;