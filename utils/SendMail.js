const nodemailer = require("nodemailer");
const EmailTemplate = require("./emailTemplate");
const EmailTemplateUser = require("./emailTemplateUser");

const SendMailOrderRecipt = async (newOrder) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  var Mailoptions = {
    from: process.env.EMAIL_RECIPT_SENDER,
    to: process.env.EMAIL_RECIPT_RECIEVER,
    subject: `(BFS) A New Order Recieved From ${newOrder.shipping_address.username}`,
    html: EmailTemplate(newOrder),
  };

  transporter
    .sendMail(Mailoptions)
    .then(() => {
      console.log("Sent mail Order Recipt");
    })
    .catch((err) => {
      console.log(err);
    });
};

const SendMailToUser = async (newOrder) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL_COMPANY,
      pass: process.env.USER_PASSWORD_COMPANY,
    },
  });

  var Mailoptions = {
    from: process.env.EMAIL_RECIPT_RECIEVER,
    to: newOrder?.shipping_address?.email,
    subject: `Order Confirmed`,
    html: EmailTemplateUser(newOrder),
  };

  transporter
    .sendMail(Mailoptions)
    .then(() => {
      console.log("Sent mail to user");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { SendMailOrderRecipt, SendMailToUser };
