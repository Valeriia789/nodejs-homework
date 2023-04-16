const nodemailer = require("nodemailer");
const path = require("path");
const pug = require("pug");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `Admin <${process.env.META_EMAIL}>`;
  }

  _initTransport() {
    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a6a52d5cb6ced4",
        pass: "ee8dbc055e24f2",
      },
    });
  }

  // це буде згенерований html для певного кейсу (в темплейт буде вказано, який шаблон генерувати)
  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, "..", "vievs", "emails", `${template}.pug`),
      {
        name: this.name,
        url: this.url,
        subject,
      }
    );

    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this._initTransport().sendMail(emailConfig);
  }

  async sendHello() {
    await this._send("hello", "Welcome to my great service");
  }

  async sendVerificationEmail() {
    // приймає template і subject
    await this._send("verification", "Verify your email");
  }

  async sendPasswordReset() {
    await this._send("passreset", "Password reset instructions");
  }
};

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.name = user.name;
//     this.url = url;
//     this.from = `Contacts Admin <${process.env.SENGRID_FROM}>`;
//   }

//   _initTransport() {
//     if (process.env.NODE_ENV === "production") {
//       // use sendgrid for real emails
//       return nodemailer.createTransport({
//         service: "Sendgrid",
//         auth: {
//           user: process.env.SENGRID_USERNAME,
//           pass: process.env.SENGRID_APIKEY,
//         },
//       });
//     }

//     // development - use mailtrap for testing purposes

//     return nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }

//   async _send(template, subject) {
//     const html = pug.renderFile(
//       path.join(__dirname, "..", "vievs", "emails", `${template}.pug`),
//       {
//         name: this.name,
//         url: this.url,
//         subject,
//       }
//     );

//     const emailConfig = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//       text: convert(html),
//     };

//     await this._initTransport().sendMail(emailConfig);
//   }

//   async sendHello() {
//     await this._send("hello", "Welcome to my great service");
//   }

//   async sendRestorePassword() {
//     await this._send("passreset", "Password reset instructions");
//   }
// };
