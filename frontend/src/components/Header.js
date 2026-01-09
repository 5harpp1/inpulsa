import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo-inpulsa.png";
import "../styles/Header.css";

function Header({ onRequestClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header_logo">
        <Link to="/" onClick={closeMenu}>
          <img
            src={logo}
            alt="Логотип ИНПУЛЬСА"
            className="header_logo_image"
          />
          <span className="header_logo_text">ИНПУЛЬСА</span>
        </Link>
      </div>

      <button
        className={`header_burger ${menuOpen ? "header_burger_open" : ""}`}
        onClick={toggleMenu}
        aria-label="Открыть меню"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="header_nav">
        <NavLink to="/" className="header_link">
          Главная
        </NavLink>
        <NavLink to="/about" className="header_link">
          О компании
        </NavLink>
        <NavLink to="/products" className="header_link">
          Продукты
        </NavLink>
        <NavLink to="/services" className="header_link">
          Услуги
        </NavLink>
        <NavLink to="/contacts" className="header_link">
          Контакты
        </NavLink>
      </nav>

      <nav className={`header_nav_mobile ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" className="header_link" onClick={closeMenu}>
          Главная
        </NavLink>
        <NavLink to="/about" className="header_link" onClick={closeMenu}>
          О компании
        </NavLink>
        <NavLink to="/products" className="header_link" onClick={closeMenu}>
          Продукты
        </NavLink>
        <NavLink to="/services" className="header_link" onClick={closeMenu}>
          Услуги
        </NavLink>
        <NavLink to="/contacts" className="header_link" onClick={closeMenu}>
          Контакты
        </NavLink>
      </nav>

      <div className="header_contacts">
        <a href="tel:+79058742679" className="header_contact">
          +7-905-874-26-79
        </a>
        <a href="mailto:inpulsa@mail.ru" className="header_contact">
          inpulsa@mail.ru
        </a>
        <button className="header_button" onClick={onRequestClick}>
          Оставить заявку
        </button>
      </div>
    </header>
  );
}

export default Header;
