import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user: { username, email }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
}

// Middleware para permitir solo a 'damian'
export function ownerMiddleware(req, res, next) {
  if (req.user.username === "damian") {
    next();
  } else {
    res.status(403).json({ message: "No tienes permisos para modificar" });
  }
}
