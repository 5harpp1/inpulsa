import React from "react";
import { Link } from "react-router-dom";
import "../styles/Products.css";
import biosignalsImg from "../images/product-biosignals.png";
import embeddedImg from "../images/product-embedded.jpg";

function Products() {
  return (
    <div className="products">
      <section className="product_block">
        <Link to="/products/biosignals" className="product_block_link">
          <div className="product_block_image">
            <img
              src={biosignalsImg}
              alt="WEB приложение для работы с биосигналами"
            />
          </div>

          <div className="product_block_content">
            <h1>WEB приложение для работы с биосигналами</h1>
            <p>
              WEB‑решение для приёма, хранения, обработки и просмотра
              физиологических сигналов через браузер с поддержкой
              специализированных медицинских форматов.
            </p>
          </div>
        </Link>
      </section>

      <section className="product_block product_block_reverse">
        <Link to="/products/embedded-system" className="product_block_link">
          <div className="product_block_image">
            <img
              src={embeddedImg}
              alt="Встраиваемая система управления интерактивными приборами"
            />
          </div>

          <div className="product_block_content">
            <h2>Встраиваемая система управления интерактивными приборами</h2>
            <p>
              Аппаратно‑программная платформа для создания интерактивных
              медицинских и лабораторных приборов с графическим интерфейсом и
              подключением к внешним системам.
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}

export default Products;
