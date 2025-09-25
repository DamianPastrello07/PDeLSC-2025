import mysql from "mysql2/promise";

// Configuración de conexión
export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "usuarios",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificar conexión
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ Conexión a MySQL OK");
  } catch (err) {
    console.error("❌ Error de conexión a MySQL:", err);
  }
})();
