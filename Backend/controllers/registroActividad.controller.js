const RegistroActividad = require('../models/registroActividad');

const registroActividadCtrl = {}

registroActividadCtrl.inscribirse = async (req, res) => {
    const { userId } = req.body;
    const { activityId } = req.params;
    try {
        const actividad = await RegistroActividad.findById(activityId);
        if (!actividad.inscriptos.includes(userId)) {
            actividad.inscriptos.push(userId);
            await actividad.save();

            await RegistroActividad.create({
                usuario: userId,
                actividad: activityId,
                tipo: 'inscripcion'
            });
        }
        res.json({ message: 'Inscripción exitosa' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = registroActividadCtrl;