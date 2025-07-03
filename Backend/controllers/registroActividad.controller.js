const RegistroActividad = require('../models/registroActividad');

const registroActividadCtrl = {}

registroActividadCtrl.historialPorUsuario = async (req, res) => {
    const { userId } = req.params;
    const { tipo } = req.query;

    const filter = { usuario: userId };
    if (tipo) filter.tipo = tipo;

    try {
        const historial = await RegistroActividad.find(filter)
            .populate('actividad', 'title')
            .sort({ fecha: -1 });

        res.json(historial);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

registroActividadCtrl.obtenerHistorialActividad = async (req, res) => {
    const { id } = req.params;

    try {
        const historial = await RegistroActividad.find({ actividad: id })
            .populate('usuario')
            .sort({ fecha: -1 });

        return res.json(historial);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: '0', msg: 'Error al obtener el historial.' });
    }
};

module.exports = registroActividadCtrl;