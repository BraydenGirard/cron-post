module.exports = {
  routes: [
    {
      method: "GET",
      path: "/articles/cron/published-count",
      handler: "api::article.article.cronPublishedCount",
    },
  ],
};
