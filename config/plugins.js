module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: true,
      auth: {
        user: "afaqhaider911@gmail.com",
        pass: "NhCPDkOFYgzUp5vQ",
      },
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      defaultFrom: env("EMAIL_RECIPT_RECIEVER"),
      defaultReplyTo: env("EMAIL_RECIPT_SENDER"),
    },
  },
});

// module.exports = ({ env }) => ({
//   email: {
//     config: {
//       provider: "strapi-provider-email-smtp",
//       providerOptions: {
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: true,
//         username: env("USER_EMAIL_COMPANY"),
//         password: env("USER_PASSWORD_COMPANY"),
//         rejectUnauthorized: true,
//         requireTLS: true,
//         connectionTimeout: 1,
//       },
//     },
//     settings: {
//       defaultFrom: env("EMAIL_RECIPT_RECIEVER"),
//       defaultReplyTo: env("EMAIL_RECIPT_SENDER"),
//     },
//   },
// });

// port: 465,
