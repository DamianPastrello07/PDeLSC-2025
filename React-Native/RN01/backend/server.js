require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Configuración de conexión MySQL (usa los valores del .env)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// 🔹 Ruta principal (para probar que el backend funcione)
app.get('/', (req, res) => {
  res.send('API funcionando correctamente ✅');
});

// 🔹 Ruta de login
app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos'
    });
  }

  try {
    // Buscar usuario por email o nombre
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ? OR usuario = ? LIMIT 1',
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const user = rows[0];

    // Comparar contraseñas (texto plano en tu caso)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta'
      });
    }

    // Si todo está bien, devolver los datos
    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        usuario: user.usuario
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// 🔹 Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
