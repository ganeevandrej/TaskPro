import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      pool: true,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта",
      html: `
          <div>
            <h1>Поздравляю вы успешно создали аккаунт в приложении TaskPro!</h1>
            <h4>Перейдите по ссылки для подтверждения электронной почты</h4>
            <a href="${link}">${link}</a>
          </div>
        `,
    });
  }
}

export default new MailService();
