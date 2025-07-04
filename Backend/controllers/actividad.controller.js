const Actividad = require('../models/actividad');
const RegistroActividad = require('../models/registroActividad');

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

        await RegistroActividad.create({
            usuario: usuarioId,
            actividad: id,
            tipo: 'inscripcion'
        });

        return res.json({ status: '1', msg: 'Inscripción exitosa.' });

    } catch (error) {
        return res.status(500).json({ status: '0', msg: 'Error en el servidor.' });
    }
};

actividadCtrl.darDeBajaUsuario = async (req, res) => {
    const { usuarioId } = req.body;
    const { id } = req.params;

    try {
        const actividad = await Actividad.findById(id);

        if (!actividad) {
            return res.status(404).json({ status: '0', msg: 'Actividad no encontrada' });
        }

        if (!actividad.inscriptos.includes(usuarioId)) {
            return res.status(400).json({ status: '0', msg: 'El usuario no está inscripto en esta actividad.' });
        }

        actividad.inscriptos = actividad.inscriptos.filter(uid => uid.toString() !== usuarioId);
        await actividad.save();

        await RegistroActividad.create({
            usuario: usuarioId,
            actividad: id,
            tipo: 'baja'
        });

        return res.json({ status: '1', msg: 'Baja registrada con éxito.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: '0', msg: 'Error en el servidor.' });
    }
};

actividadCtrl.actividadesDeUsuario = async (req, res) => {
    const { userId } = req.params;
    try {
        const actividades = await Actividad.find({ inscriptos: userId });
        if (actividades.length === 0) {
            return res.status(404).json({ msg: 'El usuario no está inscripto en ninguna actividad' });
        }
        res.status(200).json(actividades);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener actividades del usuario',
            error: error.message,
        });
    }
};

actividadCtrl.historialPorUsuario = async (req, res) => {
    const { userId } = req.params;
    const filter = { usuario: userId };
    try {
        const historial = await RegistroActividad.find({usuario:userId}).populate('actividad').sort({ fecha: -1 });

        res.json(historial);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = actividadCtrl;