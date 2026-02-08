import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RequestModal from "./components/RequestModal";
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
  const [cleanPhone, setCleanPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const isPhoneValid = cleanPhone.length === 11;

  const openRequestModal = () => {
    setStatusMessage("");
    setStatusType("");
    setIsModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsModalOpen(false);
    setFormName("");
    setFormPhone("");
    setCleanPhone("");
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

    if (!isPhoneValid) {
      setStatusType("error");
      setStatusMessage("Введите полный номер телефона (11 цифр).");
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
          phone: cleanPhone,
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
        setStatusMessage("Заявка отправлена в Bitrix24 + на email");
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
        <RequestModal
          isOpen={isModalOpen}
          onClose={closeRequestModal}
          onSubmit={handleSubmit}
          formName={formName}
          setFormName={setFormName}
          formPhone={formPhone}
          setFormPhone={setFormPhone}
          cleanPhone={cleanPhone}
          setCleanPhone={setCleanPhone}
          formEmail={formEmail}
          setFormEmail={setFormEmail}
          formMessage={formMessage}
          setFormMessage={setFormMessage}
          isSending={isSending}
          statusMessage={statusMessage}
          statusType={statusType}
          isPhoneValid={isPhoneValid}
        />
      </div>
    </Router>
  );
}

export default App;
