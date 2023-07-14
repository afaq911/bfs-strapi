const {
  SendMailOrderRecipt,
  SendMailToUser,
} = require("../../../../utils/SendMail");

const stripe = require("stripe")(process.env.STRIPE_KEY);

("use strict");

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { userId, products, subTotal, shipping_address } = ctx.request.body;
    let totalPrice = 0;

    await Promise.all(
      products?.map(async (product) => {
        const item = await strapi
          .service("api::product.product")
          .findOne(product.id);
        totalPrice +=
          (item?.price + (product?.size?.price || 0)) *
          (product?.quantity || 1);
      })
    );

    try {
      if (totalPrice === subTotal) {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: (totalPrice + 50 + 29.5) * 100,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });

        const newOrder = await strapi.service("api::order.order").create({
          data: {
            userId: userId?.toString(),
            products: products,
            shipping_address: shipping_address,
            stripeId: paymentIntent.id,
            total_amount: Number(totalPrice + 50 + 29.5),
          },
        });

        ctx.response.send({
          clientSecret: paymentIntent.client_secret,
          orderDetails: {
            amount: newOrder?.total_amount,
          },
        });
      } else {
        ctx.response.send(
          {
            message: "Something went wrong",
          },
          401
        );
      }
    } catch (error) {
      console.log(error);
    }
  },

  async update(ctx) {
    const stripe_id = ctx.request.params.id;

    try {
      await strapi.db.query("api::order.order").updateMany({
        where: {
          stripeId: {
            $eq: stripe_id,
          },
        },
        data: {
          isPaid: true,
        },
      });

      const orderDetails = await strapi.db.query("api::order.order").findOne({
        where: {
          stripeId: {
            $eq: stripe_id,
          },
        },
      });

      // Send Email to Admin --------------------------------------------------------------
      await SendMailOrderRecipt(orderDetails);

      // Send Email to User --------------------------------------------------------------
      await SendMailToUser(orderDetails);

      ctx.response.send(
        {
          message: "Order Successfully Placed",
        },
        200
      );
    } catch (error) {
      console.log(error);
      ctx.response.send(
        {
          message: "Something went worng",
        },
        500
      );
    }
  },
}));
