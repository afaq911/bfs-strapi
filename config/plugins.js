module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-smtp",
      providerOptions: {
        host: "smtp.gmail.com", //SMTP Host
        port: 465, //SMTP Port
        secure: true,
        username: process.env.USER_EMAIL_COMPANY,
        password: process.env.USER_PASSWORD_COMPANY,
        rejectUnauthorized: true,
        requireTLS: true,
        connectionTimeout: 1,
      },
    },
    settings: {
      defaultFrom: process.env.EMAIL_RECIPT_RECIEVER,
      defaultReplyTo: process.env.EMAIL_RECIPT_SENDER,
    },
  },
});

// "britishfurnituresuppliers@gmail.com",
// "ngnhcpfxwkbprvot"
