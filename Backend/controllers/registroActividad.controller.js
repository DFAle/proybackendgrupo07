const RegistroActividad = require('../models/registroActividad');

const registroActividadCtrl = {}

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