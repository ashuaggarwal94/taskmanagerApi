const sgMail = require("@sendgrid/mail");

const sendgridAPIKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ash9711@gmail.com",
    subject: "Thanks for joining!!",
    text: `
    Welcome to the app, ${name}.
    `,
  });
};

const cancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ash9711@gmail.com",
    subject: "Thanks for joining!!",
    text: `
      Goodbye, ${name}. Do let us know in case we could have done something to hold you.
      `,
  });
};

module.exports = { sendWelcomeEmail, cancelationEmail };
