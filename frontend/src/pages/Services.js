import React from "react";
import "../styles/Services.css";
import servicesDevImg from "../images/services-dev.png";
import servicesServiceImg from "../images/services-service.jpg";

function Services() {
  return (
    <div className="services">
      <section className="services_section">
        <div className="services_header">
          <h1>Разработка ПО и документации на ПО</h1>
          <p>
            Компания «ИНПУЛЬСА» предоставляет услуги полного цикла по созданию
            программного обеспечения медицинского и технического назначения.
          </p>
        </div>

        <div className="services_card">
          <h2>Услуги в области разработки ПО</h2>

          <ul className="services_list">
            <li>Разработка технического задания на программное обеспечение.</li>
            <li>
              Создание описания ПО с использованием языка UML (диаграммы
              состояний, блок‑схемы и др.).
            </li>
            <li>
              Разработка эскизного проекта (графических иллюстраций) для
              мультимедийного ПО и графических интерфейсов пользователя.
            </li>
            <li>
              Тестирование пользователями проекта ПО до начала этапа разработки
              кода.
            </li>
            <li>
              Написание кода ПО на языках программирования C, C++, PHP.
            </li>
            <li>
              Разработка эксплуатационной и технической документации на ПО (в
              том числе в соответствии с ГОСТ IEC 62304‑2022).
            </li>
            <li>Тестирование программного обеспечения.</li>
            <li>Сопровождение регистрации и сертификации ПО.</li>
          </ul>

          <div className="services_image_wrapper">
            <img
              src={servicesDevImg}
              alt="Разработка программного обеспечения и документации"
            />
          </div>
        </div>
      </section>

      <section className="services_section">
        <div className="services_header">
          <h2>Сервисное обслуживание медицинских изделий</h2>
          <p>
            Компания «ИНПУЛЬСА» выполняет техническое обслуживание современного
            диагностического и лечебного оборудования.
          </p>
        </div>

        <div className="services_card">
          <h3>Виды обслуживаемого оборудования</h3>

          <ul className="services_list">
            <li>Дефибрилляторы и дефибрилляторы‑мониторы.</li>
            <li>Мониторы пациента.</li>
            <li>Аппараты для фототерапии.</li>
            <li>Электрокардиографы.</li>
            <li>Автоматические наружные дефибрилляторы.</li>
            <li>
              Холтеры (включая установку и тестирование программного
              обеспечения).
            </li>
            <li>СМАД (суточное мониторирование артериального давления).</li>
            <li>Автоматические тонометры.</li>
            <li>Кислородные концентраторы.</li>
            <li>Рециркуляторы.</li>
          </ul>

          <p className="services_license">
            Лицензия Росздравнадзора № Л016‑00110‑77/00396482.
          </p>

          <div className="services_image_wrapper">
            <img
              src={servicesServiceImg}
              alt="Сервисное обслуживание медицинских изделий"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
