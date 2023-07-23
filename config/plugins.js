module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-smtp",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT"),
        secure: true,
        username: env("SMTP_USER"),
        password: env("SMTP_PASSWORD"),
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

// strapi-provider-email-smtp
