const Socios = require('../models/socio');
const sociosCtrl = {}
sociosCtrl.getSocios = async (req, res) => {
    var socio = await Socios.find();
    res.json(socio);
}
/*
agenteCtrl.getAgentesFiltrados = async (req, res) => {
    const query=req.query;
    const criterio={}
    if(query.nombre){
        criterio.nombre={$regex: query.nombre,$options: 'i'}
    }
    var agentes = await Agente.find(criterio);
    res.json(agentes);
}
*/
sociosCtrl.createSocios = async (req, res) => {
    var socio = new Socios(req.body);
    try {
        await socio.save();
        res.json({
            'status': '1',
            'msg': 'Socio guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
/*
agenteCtrl.getAgente = async (req, res) => {
    const agente = await Agente.findById(req.params.id);
    res.json(agente);
}
*/
sociosCtrl.editSocios = async (req, res) => {
    const socio = new Socios(req.body);
    try {
        await Socios.updateOne({ _id: req.body._id }, socio);
        res.json({
            'status': '1',
            'msg': 'Agente updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
sociosCtrl.deleteSocio = async (req, res) => {
    try {
        await Socios.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Agente removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = sociosCtrl;