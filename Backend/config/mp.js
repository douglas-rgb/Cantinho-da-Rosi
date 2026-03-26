// import { MercadoPagoConfig, Payment } from "mercadopago";

// const client = new MercadoPagoConfig({
//   accessToken: process.env.MP_ACCESS_TOKEN,
// });

// const payment = new Payment(client);

// export default payment;

import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN, // sua chave do Mercado Pago
});

const payment = new Payment(client);

export default payment;