module.exports = {
  postCountEmail: {
    task: async ({ strapi }) => {
      const count = await strapi.entityService.count("api::article.article", {
        publicationState: "live",
      });

      console.log(`Sending email with published article count ${count} (run by Strapi cron)`);

      try {
        await strapi.plugins.email.services.email.send({
          to: "brayden@gmail.com",
          from: "noreply@strapi.com",
          subject: "Post count",
          text: `You have ${count} published articles`,
          html: `You have ${count} published articles`,
        });
      } catch(err) {
        console.log(err);
      }
    },
    options: {
      // Every minute
      rule: "*/1 * * * *",
    },
  },
};
