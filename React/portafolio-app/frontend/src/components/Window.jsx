import React, { useState } from "react";

export default function Window({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  style, 
  onClick, 
  onHeaderClick 
}) {
  const [isMaximized, setIsMaximized] = useState(false);

  // Manejar el clic en el botón de maximizar
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Manejar el clic en la ventana completa
  const handleWindowClick = (e) => {
    // Prevenir que se propague el clic a elementos hijos
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  // Manejar el clic específicamente en la barra de título
  const handleTitleBarClick = (e) => {
    e.stopPropagation();
    if (onHeaderClick) {
      onHeaderClick();
    }
  };

  return (
    <div
      className={`window ${isMaximized ? "maximized" : ""}`}
      style={{ 
        position: "absolute",
        ...style,
        cursor: 'default' // Cambiar cursor por defecto
      }}
      onClick={handleWindowClick} // Clic en toda la ventana
    >
      {/* Barra superior */}
      <div 
        className="window-titlebar" 
        onClick={handleTitleBarClick} // Clic específico en la barra de título
        style={{ cursor: 'move' }} // Cambiar cursor para indicar que se puede arrastrar
      >
        <span>{title}</span>
        <div className="window-buttons">
          <button className="minimize" onClick={onMinimize}>🗕</button>
          <button
            className="maximize"
            onClick={handleMaximize}
          >
            {isMaximized ? "🗗" : "◻"}
          </button>
          <button className="close" onClick={onClose}>x</button>
        </div>
      </div>

      <div className="window-content">{children}</div>
    </div>
  );
}
