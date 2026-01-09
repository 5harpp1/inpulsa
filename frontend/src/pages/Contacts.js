import React from "react";
import "../styles/Contacts.css";

function Contacts() {
  return (
    <div className="contacts">
      <section className="contacts_section">
        <div className="contacts_info">
          <h1>Контакты</h1>

          <div className="contacts_block">
            <h2>ООО «Инпульса»</h2>
            <p>
              Полное наименование предприятия: Общество с ограниченной
              ответственностью «Инпульса» (ООО «Инпульса»).
            </p>

            <p className="contacts_label">Адрес:</p>
            <p>426006, Удмуртская Республика, г. Ижевск, ул. Телегина, д. 30, помещ. 26.</p>

            <p className="contacts_label">Телефон:</p>
            <p>
              <a href="tel:+79058742679">+7-905-874-26-79</a>
            </p>

            <p className="contacts_label">E-mail:</p>
            <p>
              <a href="mailto:inpulsa@mail.ru">inpulsa@mail.ru</a>
            </p>
          </div>
        </div>
        <div className="contacts_map">
          <h2>Мы на карте</h2>
          <div className="contacts_map_frame">
            <div className="contacts_map_frame">
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A81d033b8e67ce34a26d321c97cbccbe00c1ab288efc7f193d3af0fa8e136722a&amp;source=constructor" width="650" height="360" frameBorder="0"></iframe>
</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contacts;
