"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async find(ctx) {
    const query = ctx?.request?.query?.searchQuery;

    console.log(query);

    const products = await strapi.entityService.findMany(
      "api::product.product",
      {
        fields: ["title", "description"],
        filters: {
          title: {
            $containsi: query,
          },
          description: {
            $containsi: query,
          },
        },
        sort: { createdAt: "DESC" },
        populate: "*",
      }
    );
    // const products = await strapi.service("api::product.product").find({
    //   title: query,
    // });

    ctx.response.send(
      {
        products: products,
      },
      200
    );
  },
}));
