import React from "react";
import windowsIcon from "../../public/vite.png"; // tu icono de Windows

export default function Taskbar({ windows = [], onRestore }) {
  return (
    <div className="taskbar">
      {/* Botón Start */}
      <button className="start-button">
        <img src={windowsIcon} alt="Windows Logo" />
        Start
      </button>

      {/* Ventanas abiertas */}
      <div className="taskbar-windows">
        {windows.map((win) => (
          <button
            key={win.id}
            className={`taskbar-item ${win.minimized ? "minimized" : ""}`}
            onClick={() => onRestore(win.id)}
          >
            {win.label}
          </button>
        ))}
      </div>

      {/* Reloj */}
      <div className="clock">
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}
