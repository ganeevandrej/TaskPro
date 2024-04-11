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

  async sendActivationMail(to, code) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта",
      html: `
          <div>
            <h2>Поздравляю вы успешно зарегистрировались в приложении TaskPro!</h2>
            <div>Введите 6-ти значный код в приложении, для подтверждения электронной почты.</div>
            <p>Код подтверждения:</p>
            <h3>${code}</h3>
          </div>
        `,
    });
  }
}

export default new MailService();
