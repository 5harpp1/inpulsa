require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5000;
const BITRIX_WEBHOOK = 'https://b24-ccgxee.bitrix24.ru/rest/1/1cpl3i2u0lh40ro6/crm.lead.add';

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://inpulsa.ddns.net",
    "https://inpulsa.ddns.net",
  ],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend работает" });
});

const transporter = nodemailer.createTransporter({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.MAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Ошибка подключения к SMTP:", error.message);
  } else {
    console.log("SMTP подключение установлено");
  }
});

app.post("/api/request", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !phone) {
    return res
      .status(400)
      .json({ success: false, error: "Укажите имя и телефон" });
  }

  console.log("Новая заявка от формы сайта:", {
    name,
    email,
    phone,
    message,
  });

  try {
    const mailOptions = {
      from: `"Сайт Инпульса" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "Новая заявка с сайта ООО «Инпульса»",
      text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email || "-"}\n\nСообщение:\n${message || "-"}`,
      html: `
        <h3>Новая заявка с сайта</h3>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || '-'}</p>
        <p><strong>Сообщение:</strong><br>${message || 'Без комментария'}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Письмо отправлено:", info.messageId);
    if (BITRIX_WEBHOOK) {
      try {
        await axios.post(BITRIX_WEBHOOK, {
          fields: {
            TITLE: `Заявка с сайта | ${name}`,
            NAME: name,
            PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
            EMAIL: email ? [{ VALUE: email, VALUE_TYPE: "WORK" }] : [],
            COMMENTS: message || "Без комментария",
            SOURCE_ID: 1,
            STATUS_ID: "NEW",
          },
        });
        console.log("Лид создан");
      } catch (bitrixErr) {
        console.error("Bitrix24 ошибка:", bitrixErr.response?.data || bitrixErr.message);
      }
    }

    return res.status(200).json({ success: true, message: "Заявка отправлена" });
  } catch (error) {
    console.error("Ошибка отправки:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Не удалось отправить заявку" });
  }
});
app.listen(PORT, () => {
  console.log(`Server запущен на порту ${PORT}`);
  console.log(`CORS разрешен для: localhost:3000, inpulsa.ddns.net`);
});
