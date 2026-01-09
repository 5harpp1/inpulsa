require("dotenv").config();
const express = require("express");
const cors = require("cors");
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
    // Отправка лида в Битрикс24
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

    // Пользователю всегда успех
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
