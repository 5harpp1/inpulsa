require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

const BITRIX_WEBHOOK = 'https://b24-ccgxee.bitrix24.ru/rest/1/7i74vqlbhssepehx/crm.lead.add';

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://inpulsa.ddns.net",
      "https://inpulsa.ddns.net",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend ООО «Инпульса» работает" });
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
    console.log("SMTP подключение установлено, готов к отправке писем");
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
      text:
        `Имя: ${name}\n` +
        `Телефон: ${phone}\n` +
        `Email: ${email || "-"}\n\n` +
        `Сообщение:\n${message || "-"}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Письмо отправлено:", info.messageId);

    if (BITRIX_WEBHOOK) {
      try {
        await axios.post(BITRIX_WEBHOOK, {
          fields: {
            TITLE: `Заявка с сайта | ${name}`,
            NAME: name,
            PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
            EMAIL: [{ VALUE: email || '', VALUE_TYPE: 'WORK' }],
            COMMENTS: message || 'Без комментария',
            SOURCE_ID: 1,
            ASSIGNED_BY_ID: 1, 
            STATUS_ID: 'NEW',
            OPPORTUNITY: 1000 
          }
        });
        console.log("Лид создан в Bitrix24");
      } catch (bitrixErr) {
        console.error("Bitrix24 ошибка:", bitrixErr.response?.data || bitrixErr.message);
      }
    } else {
      console.log("Bitrix24 webhook не настроен, пропускаем");
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      "Ошибка отправки:",
      error.message,
      error.response?.data
    );
    return res
      .status(500)
      .json({ success: false, error: "Не удалось отправить заявку" });
  }
});

app.listen(PORT, () => {
  console.log(`Server запущен на порту ${PORT}`);
});
