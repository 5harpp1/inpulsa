import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Biosignals from "./pages/Biosignals";
import EmbeddedSystem from "./pages/EmbeddedSystem";
import Services from "./pages/Services";
import Contacts from "./pages/Contacts";

const API_BASE =
  process.env.REACT_APP_API_URL || "/api";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const openRequestModal = () => {
    setStatusMessage("");
    setStatusType("");
    setIsModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsModalOpen(false);
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormMessage("");
    setStatusMessage("");
    setStatusType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setStatusType("");

    if (formName.trim().length < 3) {
      setStatusType("error");
      setStatusMessage("Имя должно содержать минимум 3 символа.");
      return;
    }

    const digitsOnly = formPhone.replace(/\D/g, "");
    if (!/^\d{11}$/.test(digitsOnly)) {
      setStatusType("error");
      setStatusMessage("Телефон должен содержать ровно 11 цифр.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(`${API_BASE}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formName.trim(),
          phone: digitsOnly,
          email: formEmail,
          message: formMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error("Некорректный ответ сервера");
      }

      if (!data || !data.success) {
        setStatusType("error");
        setStatusMessage(data?.error || "Ошибка при отправке заявки.");
      } else {
        setStatusType("success");
        setStatusMessage("Заявка отправлена. Мы свяжемся с вами.");
        setTimeout(() => {
          closeRequestModal();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setStatusType("error");
      setStatusMessage("Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Header onRequestClick={openRequestModal} />
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={<Home onRequestClick={openRequestModal} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/biosignals" element={<Biosignals />} />
            <Route
              path="/products/embedded-System"
              element={<EmbeddedSystem />}
            />
            <Route path="/services" element={<Services />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
        <Footer />
        {isModalOpen && (
          <div className="modal_overlay" onClick={closeRequestModal}>
            <div
              className="modal_content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal_close" onClick={closeRequestModal}>
                ×
              </button>
              <h3>Оставить заявку</h3>
              <form className="modal_form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Имя"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  required
                  value={formPhone}
                  maxLength={11}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, "");
                    setFormPhone(onlyDigits.slice(0, 11));
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
                <textarea
                  placeholder="Кратко опишите задачу"
                  rows="4"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                />

                {statusMessage && (
                  <div
                    className={
                      statusType === "success"
                        ? "modal_status modal_status_success"
                        : "modal_status modal_status_error"
                    }
                  >
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="home_button"
                  disabled={isSending}
                >
                  {isSending ? "Отправка..." : "Отправить"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
