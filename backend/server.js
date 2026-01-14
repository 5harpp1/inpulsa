require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend ООО «Инпульса» работает" });
});

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.MAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((error, success) => {
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
    console.log("Письмо отправлено успешно, ответ SMTP:", info);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      "Ошибка при отправке письма:",
      error && error.message,
      error && error.response && error.response.toString()
    );
    return res
      .status(500)
      .json({ success: false, error: "Не удалось отправить заявку" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
