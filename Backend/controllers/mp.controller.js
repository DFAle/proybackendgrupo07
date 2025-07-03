const axios = require("axios");
const Actividad = require('../models/actividad');
const RegistroActividad = require('../models/registroActividad');
const Pago = require('../models/pago'); 
const mpCtrl = {};

mpCtrl.getPaymentlink = async (req, res) => {
  //recibir en body info de payer_email, title, description, etc...
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      payer_email: "thealecuellar@gmail.com",
      items: [
        {
          title: "Vasija grande",
          description: "vasija grande medidas ....",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 15000,
        },
      ],
      back_urls: {
        failure: "http://localhost:4200/failure",
        pending: "http://localhost:4200/pending",
        success: "http://localhost:4200/success",
      },
    };
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return res.status(200).json(payment.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      msg: "Failed to create payment",
    });
  }
};
mpCtrl.getSubscriptionLink = async (req, res) => {
  //recibir en body info de payer_email, razon, cantidad
  try {
    const url = "https://api.mercadopago.com/preapproval";
    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 1,
        currency_id: "ARS",
      },
      back_url: "https://test-frontend.com/suscripcion-finalizada",
      payer_email: "thealecuellar@gmail.com",
    };
    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return res.status(200).json(subscription.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      msg: "Failed to create subscription",
    });
  }
};
mpCtrl.getPagos = async (req, res) => {
  try {
    const pagos = await Pago.find().populate('userId').sort({ createdAt: -1 });
    res.status(200).json(pagos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los pagos' });
  }
};

mpCtrl.getQRPayment = async (req, res) => {
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const { titulo, foto, detalle, nivel, precio } = req.body;
    console.log('👉 Datos recibidos del frontend:', { titulo, foto, detalle, nivel, precio });
    const actividad = await Actividad.findById(actividadId);
    if (!actividad) {
      return res.status(404).json({ status: '0', msg: 'Actividad no encontrada' });
    }

    if (actividad.inscriptos.includes(userId)) {
      return res.status(400).json({ status: '0', msg: 'Ya estás inscripto en esta actividad.' });
    }

    if (actividad.inscriptos.length >= actividad.cuposDisponibles) {
      return res.status(400).json({ status: '0', msg: 'No hay más cupos disponibles.' });
    }
    const body = {
      items: [
        {
          title: titulo,
          description: detalle,
          picture_url: foto,
          category_id: 'category123',
          quantity: 1,
          unit_price: Number(precio),
        },
      ],
      external_reference: `${userId}_${actividadId}`,
      back_urls: {
        failure: "https://clubacleticosantelmo.onrender.com/home/pago/fallido",
        pending: "https://clubacleticosantelmo.onrender.com/home/pago/pendiente",
        success: "https://clubacleticosantelmo.onrender.com/home/pago/exitoso",
      },
      auto_return: "approved"  // 👈 ¡AGREGÁ ESTA LÍNEA!
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    const qrURL = payment.data.init_point;

    actividad.inscriptos.push(userId);
    await actividad.save();
    
    await RegistroActividad.create({
      usuario: userId,
      actividad: actividadId,
      tipo: 'inscripcion'
    });
    return res.status(200).json({
      init_point: qrURL,
      qr_code: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrURL)}&size=200x200`
    });
  } catch (error) {
    console.error(error.response?.data || error.message || error);
    return res.status(500).json({
      error: true,
      msg: "Failed to create QR payment",
    });
  }
};

mpCtrl.confirmPayment = async (req, res) => {
  try {
    const { paymentId, externalReference } = req.body;

    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    const payment = response.data;

    if (payment.status === 'approved') {
      // ✅ Extraer datos
      const [userId, actividadId] = externalReference.split('_');

      const nuevoPago = new Pago({
        userId,
        actividadId,
        paymentId: payment.id,
        status: payment.status,
        monto: payment.transaction_amount,
        emailComprador: payment.payer.email,
        fechaPago: payment.date_approved,
        metodo: payment.payment_type_id,
      });

      await nuevoPago.save();

      console.log(`✔ Pago guardado en BD: ${payment.id}`);
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, msg: 'Pago no aprobado' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: 'Error confirmando pago' });
  }
};



module.exports = mpCtrl;
