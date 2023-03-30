"use strict";

/**
 *  article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async cronPublishedCount(ctx) {
    const count = await strapi.entityService.count("api::article.article", {
      publicationState: "live",
    });

    console.log(`Sending email with published article count ${count} (run by external cron)`);

    try {
      await strapi.plugins.email.services.email.send({
        to: "brayden@notarealemail123.com",
        from: "noreply@strapi.com",
        subject: "Post count",
        text: `You have ${count} published articles`,
        html: `You have ${count} published articles`,
      });
    } catch(err) {
      console.log(err);
    }
    ctx.status = 200;
  },
}));
