"use strict";
const {
  SendMailOrderRecipt,
  SendMailToUser,
} = require("../../../../utils/SendMail");

/**
 * direct-order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::direct-order.direct-order",
  ({ strapi }) => ({
    async create(ctx) {
      const { values, orderData, totalPrice } = ctx.request.body;

      let productData = {
        ...orderData?.product?.attributes,
        id: orderData?.product?.id,
        quantity: orderData?.quantity,
        size: orderData?.size,
        color: orderData?.color,
        totalPrice: totalPrice,
      };

      try {
        const newOrder = await strapi
          .service("api::direct-order.direct-order")
          .create({
            data: {
              address: values,
              product: productData,
              totalPrice: totalPrice,
            },
          });

        let orderDetails = {
          id: newOrder?.id,
          shipping_address: newOrder?.address,
          products: [newOrder?.product],
          total_amount: newOrder?.totalPrice,
        };

        // Send Email to Admin --------------------------------------------------------------
        await SendMailOrderRecipt(orderDetails);

        // Send Email to User --------------------------------------------------------------
        await SendMailToUser(orderDetails);

        ctx.response.send(
          {
            message: "Order created successfully",
          },
          200
        );
      } catch (error) {
        console.log(error);
        ctx.response.send(
          {
            error: error,
          },
          500
        );
      }
    },
  })
);
