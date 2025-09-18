export default function Contact() {
  return (
    <div className="window-content-inner">
      <h2>Contacto</h2>
      <form className="contact-form">
        <input type="text" placeholder="Tu nombre" />
        <input type="email" placeholder="Tu email" />
        <textarea placeholder="Tu mensaje" rows="5"></textarea>
        <button>Enviar</button>
      </form>
    </div>
  );
}
