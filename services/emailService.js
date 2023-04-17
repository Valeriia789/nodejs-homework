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
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  // це буде згенерований html для певного кейсу (в темплейт буде вказано, який шаблон генерувати)
  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, "..", "views", "emails", `${template}.pug`),
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

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_EMAIL, META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465, // 25, 2525 (465 - захищений порт, під час передачі треба шифрувати трафік; 25 і 2525 - незахищений)
//   // оскільки вибрали захищений порт, треба secure:
//   secure: true,
//   auth: {
//     // user - пошта, до якої підключаємось на Мета.юа (valeriia.air@meta.ua)
//     user: "valeriia.air@meta.ua",
//     // pass - пароль від цієї пошти
//     pass: META_PASSWORD,
//   },
// };

// // щоб отримати лист, треба за допомогою цього конфігу створити транспорт:
// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "Tramp@example.com", // user.email
//   from: "valeriia.air@meta.ua",
//   subject: "Verification email test",
//   html: "To verify your email please click the link: blablabla",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error));
