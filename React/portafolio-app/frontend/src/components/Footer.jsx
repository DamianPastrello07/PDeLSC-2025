export default function Footer() {
  return (
    <footer className="py-4 bg-dark text-white text-center">
      <p className="mb-1">Contacto: mail@ejemplo.com | +54 9 11 1234-5678</p>
      <p className="mb-1">Desarrollado por Nataniel</p>
      <p className="mb-0">© {new Date().getFullYear()} Mi Portfolio</p>
    </footer>
  );
}
