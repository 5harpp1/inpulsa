import React from "react";
import "../styles/Biosignals.css";

import biosignalsArchImg from "../images/biosignals-architecture.png";
import biosignalsExtra1 from "../images/biosignals-extra-1.png";
import biosignalsExtra2 from "../images/biosignals-extra-2.png";

function Biosignals() {
  return (
    <div className="biosignals">
      {/* Блок 1: архитектура + картинка */}
      <section className="biosignals_section">
        <div className="biosignals_header">
          <h1>Архитектура телемедицинского комплекса</h1>
          <p>
            WEB‑приложение для работы с биосигналами в составе телемедицинского
            комплекса.
          </p>
        </div>

        <div className="biosignals_architecture">
          <img
            src={biosignalsArchImg}
            alt="Архитектура телемедицинского комплекса"
          />
        </div>
      </section>

      {/* Блок 2: возможности комплекса + картинки снизу */}
      <section className="biosignals_section">
        <div className="biosignals_header">
          <h2>Возможности телемедицинского комплекса</h2>
          <p>Основные функции WEB‑приложения для работы с биосигналами.</p>
        </div>

        <div className="biosignals_features_card">
          <h3>ТЕЛЕМЕДИЦИНСКИЙ КОМПЛЕКС</h3>
          <ol className="biosignals_features_list">
            <li>
              Получение, импорт и приём файлов с биосигналами по сети Internet
              (в том числе посредством GSM).
            </li>
            <li>
              Поддержка форматов данных, включая биосигналы в формате MFER по
              ГОСТ Р ИСО 22077‑1‑2017 и ГОСТ Р 70395‑2022 (ISO 22077‑2:2015).
            </li>
            <li>Вывод графического представления биосигналов.</li>
            <li>
              Постановка заключения в ручном режиме и привязка его к конкретному
              набору биосигналов.
            </li>
            <li>
              Автоматическое измерение амплитудно‑временных параметров
              биосигналов.
            </li>
            <li>
              Автоматическая разметка биосигналов с использованием графических
              маркеров и цветового выделения.
            </li>
            <li>
              Печать на бумажном носителе с использованием внешнего принтера и
              экспорт в общепринятые форматы (PDF).
            </li>
            <li>
              Поддержка популярных, открытых и национальных операционных
              систем: Windows, Linux, macOS.
            </li>
            <li>
              Передача файлов на серверные медицинские информационные или
              диспетчерские системы.
            </li>
            <li>
              Возможность добавления пользователей с различными правами доступа.
            </li>
            <li>
              Работа через браузер без установки ПО на персональный компьютер
              пользователя.
            </li>
          </ol>
        </div>

        {/* Две картинки под возможностями */}
        <div className="biosignals_images_row">
          <div className="biosignals_image_item">
            <img
              src={biosignalsExtra1}
              alt="Экран телемедицинского комплекса 1"
            />
          </div>
          <div className="biosignals_image_item">
            <img
              src={biosignalsExtra2}
              alt="Экран телемедицинского комплекса 2"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Biosignals;
