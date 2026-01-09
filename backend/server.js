require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://inpulsa-1.onrender.com",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend ООО «Инпульса» работает" });
});

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.MAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Ошибка подключения к SMTP:", error);
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

    await transporter.sendMail(mailOptions);
    console.log("Письмо отправлено успешно");

    if (process.env.BITRIX_WEBHOOK_URL) {
      const bitrixUrl =
        process.env.BITRIX_WEBHOOK_URL + "crm.lead.add.json";

      const bitrixPayload = {
        fields: {
          TITLE: 'Заявка с сайта ООО "Инпульса"',
          NAME: name,
          PHONE: [
            {
              VALUE: phone,
              VALUE_TYPE: "WORK",
            },
          ],
          EMAIL: email
            ? [
                {
                  VALUE: email,
                  VALUE_TYPE: "WORK",
                },
              ]
            : [],
          COMMENTS: message || "",
          SOURCE_ID: "WEB",
        },
        params: { REGISTER_SONET_EVENT: "Y" },
      };

      try {
        const resp = await axios.post(bitrixUrl, bitrixPayload);
        if (resp.data && resp.data.error) {
          console.error(
            "Ошибка создания лида в Битрикс24:",
            resp.data.error,
            resp.data.error_description
          );
        } else {
          console.log("Лид в Битрикс24 создан, ID:", resp.data.result);
        }
      } catch (err) {
        console.error(
          "Ошибка HTTP при обращении к Битрикс24:",
          err.message
        );
      }
    } else {
      console.warn(
        "BITRIX_WEBHOOK_URL не задан, лид в Битрикс24 не создаётся"
      );
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Ошибка при обработке заявки:", error);
    return res
      .status(500)
      .json({ success: false, error: "Не удалось обработать заявку" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
