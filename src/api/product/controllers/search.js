"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async find(ctx) {
    let sendTo = "kreative.afaqhaider@gmail.com";

    try {
      const emailOptions = {
        to: sendTo,
        subject: "This is a test",
        html: `<h1>Welcome!</h1><p>This is a test HTML email.</p>`,
      };
      await strapi.plugins["email"].services.email.send(emailOptions);
      strapi.log.debug(`Email sent to ${sendTo}`);
      ctx.send({ message: "Email sent" });
    } catch (err) {
      strapi.log.error(`Error sending email to ${sendTo}`, err);
      ctx.send({ error: "Error sending email" });
    }
  },
}));
