const axios = require("axios");
const mpCtrl = {};

mpCtrl.getPaymentlink = async (req, res) => {
  //recibir en body info de payer_email, title, description, etc...
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      payer_email: "payer_email@gmail.com",
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
        failure: "hppt://localhost:4200/failure",
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
        transaction_amount: 10000,
        currency_id: "ARS",
      },
      back_url: "http://localhost:4200/returnpath",
      payer_email: "payer_email@gmail.com@google.com",
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
module.exports = mpCtrl;
