import mysql2 from 'mysql2/promise';

// Crear pool de conexiones MySQL
const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuarios',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar conexión al iniciar
pool.getConnection()
  .then(conn => {
    console.log("Conexión a la base de datos exitosa");
    conn.release();
  })
  .catch(err => {
    console.error("Error al conectar a la base de datos:", err.message);
  });

// Exportar pool para usar en app
export function connectDB() {
  return pool;
}
