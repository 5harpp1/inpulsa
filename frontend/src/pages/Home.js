import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import telemedicineIcon from "../images/telemedicine.png";
import deviceControlIcon from "../images/device-control.png";
import softwareDevIcon from "../images/software-dev.png";
import serviceIcon from "../images/service.png";
import "../styles/Home.css";

function Home({ onRequestClick }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".section_hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section_visible");
          } else {
            entry.target.classList.remove("section_visible");
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <section className="home_hero">
        <div className="home_hero_content">
          <h1>
            ООО «ИНПУЛЬСА» — электронные и информационные медицинские технологии
          </h1>
          <p>
            Многопрофильное предприятие в области разработки телемедицинских
            комплексов, систем управления интерактивными приборами и
            медицинского программного обеспечения.
          </p>
          <button className="home_button" onClick={onRequestClick}>
            Оставить заявку
          </button>
        </div>
      </section>

      <section className="home_section section_hidden" id="products">
        <h2>Наши продукты</h2>
        <p className="home_section_subtitle">
          Решения для телемедицины и управления интерактивными медицинскими
          приборами.
        </p>
        <div className="home_cards">
          <div className="home_card">
            <img
              src={telemedicineIcon}
              alt="Телемедицинский комплекс"
              className="home_card_image"
            />
            <h3>Телемедицинский комплекс</h3>
            <p>
              Комплекс для приёма, обработки и отображения файлов с
              физиологическими кривыми с поддержкой форматов MFER и работы
              через веб-интерфейс.
            </p>
          </div>

          <div className="home_card">
            <img
              src={deviceControlIcon}
              alt="Система управления интерактивными приборами"
              className="home_card_image"
            />
            <h3>Система управления интерактивными приборами</h3>
            <p>
              Аппаратно-программная платформа на базе ARM Cortex-M7 для
              разработки SMART-устройств с графическим интерфейсом и различными
              каналами связи.
            </p>
          </div>
        </div>

        <Link to="/products" className="home_button">
          Подробнее о продуктах
        </Link>
      </section>

      <section className="home_section section_hidden" id="services">
        <h2>Услуги</h2>
        <p className="home_section_subtitle">
          Инженерные услуги по разработке медицинского ПО и сервисному
          обслуживанию современного диагностического оборудования
        </p>
        <div className="home_cards">
          <div className="home_card">
            <img
              src={softwareDevIcon}
              alt="Разработка ПО и документации"
              className="home_card_image"
            />
            <h3>Разработка ПО и документации</h3>
            <p>
              Разработка технического задания, проектной документации, кода,
              тестирование и сопровождение регистрации программного обеспечения
              медицинского назначения.
            </p>
          </div>
          <div className="home_card">
            <img
              src={serviceIcon}
              alt="Сервисное обслуживание медизделий"
              className="home_card_image"
            />
            <h3>Сервисное обслуживание медизделий</h3>
            <p>
              Техническое обслуживание дефибрилляторов, мониторов пациента,
              ЭКГ-аппаратов, холтеров, СМАД, кислородных концентраторов и
              другого оборудования.
            </p>
          </div>
        </div>
        <Link to="/services" className="home_button">
          Подробнее об услугах
        </Link>
      </section>

      <section className="home_cta section_hidden" id="contacts">
        <h2>Есть вопросы по внедрению решений?</h2>
        <p>
          Оставьте заявку, и специалисты ООО «ИНПУЛЬСА» свяжутся с вами для
          обсуждения задач и вариантов сотрудничества.
        </p>
        <button className="home_button" onClick={onRequestClick}>
          Оставить заявку
        </button>
      </section>
    </div>
  );
}

export default Home;
