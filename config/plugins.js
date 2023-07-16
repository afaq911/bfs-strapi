module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-smtp",
      providerOptions: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        username: env("USER_EMAIL_COMPANY"),
        password: env("USER_PASSWORD_COMPANY"),
        rejectUnauthorized: true,
        requireTLS: true,
        connectionTimeout: 1,
      },
    },
    settings: {
      defaultFrom: env("EMAIL_RECIPT_RECIEVER"),
      defaultReplyTo: env("EMAIL_RECIPT_SENDER"),
    },
  },
});
