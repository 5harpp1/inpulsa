import React from "react";
import "../styles/RequestModal.css";

const RequestModal = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  formName, setFormName,
  formPhone, setFormPhone,
  cleanPhone, setCleanPhone,
  formEmail, setFormEmail,
  formMessage, setFormMessage,
  isSending,
  statusMessage,
  statusType
}) => {
  
  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, '');
    
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    } else if (digits.startsWith('9')) {
      digits = '7' + digits;
    } else if (!digits.startsWith('7')) {
      digits = '7' + digits;
    }

    let formatted = '';
    if (digits.length > 0) formatted = '+7';
    if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
    if (digits.length > 4) formatted += `) ${digits.slice(4, 7)}`;
    if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`;
    if (digits.length > 9) formatted += `-${digits.slice(9, 11)}`;

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormPhone(formatted);
    const clean = formatted.replace(/\D/g, '');
    setCleanPhone(clean);
  };

  if (!isOpen) return null;

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="modal_close" onClick={onClose}>×</button>
        <h3>Оставить заявку</h3>
        
        <form className="modal_form" onSubmit={onSubmit}>
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
            value={formPhone}
            onChange={handlePhoneChange}
            maxLength="18"
            required
          />
          
          <input
            type="email"
            placeholder="Email"
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
            <div className={`modal_status ${statusType}`}>
              {statusMessage}
            </div>
          )}

          <button
            type="submit"
            className="home_button"
            disabled={isSending}
          >
            {isSending ? "Отправка..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;

