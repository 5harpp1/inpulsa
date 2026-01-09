import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="footer_block">
          <h4>ООО «Инпульса»</h4>
          <p>
            Общество с ограниченной ответственностью «Инпульса» (ООО
            «Инпульса»).
          </p>
          <p>
            426006, Удмуртская Республика, г. Ижевск, ул. Телегина, д. 30,
            помещ. 26.
          </p>
        </div>

        <div className="footer_block">
          <h4>Навигация</h4>
          <ul>
            <li>
              <Link to="/about">О компании</Link>
            </li>
            <li>
              <Link to="/products">Продукты</Link>
            </li>
            <li>
              <Link to="/services">Услуги</Link>
            </li>
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
          </ul>
        </div>

        <div className="footer_block">
          <h4>Контакты</h4>
          <p>
            Телефон: <a href="tel:+79058742679">+7-905-874-26-79</a>
          </p>
          <p>
            E-mail: <a href="mailto:inpulsa@mail.ru">inpulsa@mail.ru</a>
          </p>
          <p>Лицензия Росздравнадзора № Л016-00110-77/00396482</p>
        </div>
      </div>

      <div className="footer_bottom">
        <p>© ООО «Инпульса», {currentYear}.</p>
      </div>
    </footer>
  );
}

export default Footer;
