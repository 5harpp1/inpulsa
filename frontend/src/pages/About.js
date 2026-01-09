import React, { useState, useEffect } from "react";
import "../styles/About.css";

import slideBg1 from "../images/slide-1.jpg";
import slideBg2 from "../images/slide-2.jpg";
import slideBg3 from "../images/slide-3.jpg";
import slideBg4 from "../images/slide-4.jpg";

const advantages = [
  {
    title: "Опыт в медицинской технике",
    text:
      "Команда инженеров и разработчиков с многолетним опытом создания " +
      "медицинских изделий и специализированного программного обеспечения.",
    bg: slideBg1,
  },
  {
    title: "Комплексные телемедицинские решения",
    text:
      "Разработка телемедицинских комплексов, веб‑приложений и алгоритмов " +
      "для обработки физиологических кривых.",
    bg: slideBg2,
  },
  {
    title: "Соответствие стандартам качества",
    text:
      "Система менеджмента качества сертифицирована по ГОСТ Р ИСО 9001‑2015 " +
      "и ГОСТ ISO 13485‑2017.",
    bg: slideBg3,
  },
  {
    title: "Сервис и сопровождение",
    text:
      "Техническое обслуживание медицинских изделий и поддержка внедрённых " +
      "решений на всех этапах эксплуатации.",
    bg: slideBg4,
  },
];

function About() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % advantages.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + advantages.length) % advantages.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % advantages.length);
    }, 12000);

    return () => clearInterval(interval); // очищаем, чтобы не плодить таймеры
  }, []);

  return (
    <div className="about">
      {/* Слайдер преимуществ */}
      <section className="about_slider_section">
        <h1>О компании</h1>
        <p className="about_subtitle">
          ООО «ИНПУЛЬСА» — многопрофильное предприятие в области электронных и
          информационных медицинских технологий.
        </p>

        <div className="about_slider">
          {/* Слайд */}
          <div
            className="about_slider_slide about_slider_slide_fade"
            key={current}
            style={{
              backgroundImage: `linear-gradient(
                120deg,
                rgba(15, 23, 42, 0.95),
                rgba(15, 23, 42, 0.8)
              ), url(${advantages[current].bg})`,
            }}
          >
            {/* Стрелки ВНУТРИ слайда */}
            <button
              className="about_slider_arrow about_slider_arrow_left"
              onClick={prevSlide}
              aria-label="Предыдущий слайд"
            >
              ‹
            </button>

            <div className="about_slider_content">
              <h3>{advantages[current].title}</h3>
              <p>{advantages[current].text}</p>

              <div className="about_slider_dots">
                {advantages.map((_, index) => (
                  <button
                    key={index}
                    className={
                      "about_slider_dot" +
                      (index === current ? " about_slider_dot_active" : "")
                    }
                    onClick={() => setCurrent(index)}
                    aria-label={`Слайд ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              className="about_slider_arrow about_slider_arrow_right"
              onClick={nextSlide}
              aria-label="Следующий слайд"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Текстовый блок «О нас» */}
      <section className="about_text_section">
        <h2>О нас</h2>

        <p>
          ООО «ИНПУЛЬСА» — многопрофильное предприятие в области электронных и
          информационных медицинских технологий.
        </p>

        <p>
          Основными направлениями деятельности нашей компании является разработка
          программного обеспечения медицинского назначения:
        </p>
        <ul>
          <li>
            встроенного в медицинские изделия (на базе микропроцессоров)
            программного обеспечения для управления изделием и отображения,
            обработки информации;
          </li>
          <li>
            WEB‑приложений для приёма, обработки и отображения файлов с
            физиологическими кривыми (ПО для телемедицины);
          </li>
          <li>
            программных модулей (алгоритмов) для автоматической обработки
            физиологических кривых.
          </li>
        </ul>

        <h3>Разработка программного обеспечения медицинских изделий</h3>

        <p>
          Вспомогательными видами деятельности компании являются техническое
          обслуживание медицинских изделий.
        </p>

        <p>
          Залогом успеха компании ООО «ИНПУЛЬСА» является инженерно‑технический
          персонал, обладающий многолетним опытом в области разработки и
          производства медицинской техники.
        </p>

        <p>
          ООО «ИНПУЛЬСА» имеет сертифицированную систему менеджмента качества в
          соответствии с требованиями 
          <br/> ГОСТ Р ИСО 9001‑2015 и ГОСТ ISO
          13485‑2017.
        </p>
      </section>
    </div>
  );
}

export default About;