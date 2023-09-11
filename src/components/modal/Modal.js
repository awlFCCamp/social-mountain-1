/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  const handleClose = (e) => {
    if (
      (e instanceof KeyboardEvent && e.key === "Escape") ||
      (modalRef.current && !modalRef.current.contains(e.target))
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleClose);
      window.addEventListener("mousedown", handleClose);
    }

    return () => {
      window.removeEventListener("keydown", handleClose);
      window.removeEventListener("mousedown", handleClose);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <button className="modal-close" onClick={onClose}>
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
