import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './responsive.css';

const hero = 'https://images.unsplash.com/photo-1586220742613-b731f66f7743?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const room = 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=2200&q=88';
const detail = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=88';
const giorperfil = '/images/giorperfil.jpeg';
const giorperfil2 = '/images/gio2perfil.jpeg';
const whatsapp = 'https://api.whatsapp.com/send?phone=59898700322&text=Hola%2C%20quisiera%20consultar%20por%20un%20tratamiento%20en%20Tanta%20Piel.';
// TODO: reemplazar por Instagram real.
const instagram = 'https://www.instagram.com/';
// TODO: reemplazar por el email real cuando esté definido.
const email = 'hola@tantapiel.com';

const defaultContent = {
  hero: { image: hero, alt: 'Detalle editorial de cuidado facial', eyebrow: 'Cosmetología contemporánea', location: 'Montevideo, Uruguay' },
  intro: { eyebrow: 'Tanta Piel / 01', title: 'Cada piel tiene', emphasis: 'su propio lenguaje.', text: 'Escuchamos lo que tu piel expresa y creamos tratamientos que se adaptan a sus tiempos, sus necesidades y tu forma de habitarte.', link: 'Conocé los tratamientos' },
  editorial: { image: detail, alt: 'Detalle de una rutina de cuidado facial' },
  profile: { eyebrow: 'Cosmetóloga / 02', title: 'Conocé a', name: 'Gior', text: 'Gior es la cosmetóloga de Tanta Piel: acompaña a cada persona con un enfoque atento, cálido y personalizado para que cada tratamiento responda a la piel real de cada momento.', images: [giorperfil, giorperfil2] },
  treatments: { eyebrow: 'Tratamientos / 03', title: 'Lo que tu piel', emphasis: 'necesita hoy.', text: 'Rituales simples, precisos y honestos. Cada sesión comienza con una lectura atenta de tu piel.' },
  space: { eyebrow: 'El espacio / 04', title: 'Un espacio', emphasis: 'para vos.', text: 'Un lugar pensado para que puedas bajar el ritmo, disfrutar el momento y dedicarle tiempo a tu piel.', image: room, alt: 'Gabinete de estética cálido y tranquilo' },
  location: { eyebrow: 'Encontranos / 05', title: 'Hacé lugar', emphasis: 'para vos.', address: 'Av. España 2145, Montevideo (provisoria)', hours: 'Lunes a viernes, con agenda previa', whatsapp: '+598 98 700 322' },
  contact: { eyebrow: 'Contacto / 05', title: 'Hablemos.', text: '¿Tenés alguna consulta o querés encontrar el tratamiento ideal para tu piel? Escribinos.', address: '[A confirmar]' },
  cta: { eyebrow: 'Tanta Piel / 06', title: 'Tu piel también', emphasis: 'merece tiempo.' }
};

const treatments = [
  ['01', 'Limpieza profunda', 'Una pausa para devolverle luz, suavidad y equilibrio a tu piel.'],
  ['02', 'Hidratación consciente', 'Activos y texturas elegidos para acompañar las necesidades reales de tu piel.'],
  ['03', 'Renovación suave', 'Un tratamiento progresivo para mejorar la textura sin perder naturalidad.'],
  ['04', 'Ritual personalizado', 'Un encuentro diseñado especialmente para vos, según lo que tu piel necesita hoy.']
];

function App(){
  const [content, setContent] = useState(defaultContent);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  useEffect(() => {
    fetch('/content/site.json').then((response) => response.ok ? response.json() : defaultContent).then(setContent).catch(() => setContent(defaultContent));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.style.animation = 'reveal .8s ease forwards';
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => {
      element.style.animation = 'none';
      element.style.opacity = '0';
      element.style.transform = 'translateY(18px)';
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  const navigate = (id) => { go(id); setMenuOpen(false); };
  const treatmentItems = content.treatmentItems || treatments.map(([number, title, copy]) => ({number, title, copy}));
  const submitForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitError(false);
    try {
      const response = await fetch('/', { method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: new URLSearchParams(new FormData(form)).toString() });
      if (!response.ok) throw new Error('No se pudo enviar el formulario');
      form.reset();
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
  };

  return <div className="site">
    <a className="whatsapp-floating" style={{background:'var(--color-bg)', color:'var(--color-text)', border:'1px solid var(--color-border)', borderRadius:'50%', boxShadow:'0 8px 22px rgba(32,32,29,.14)'}} href={whatsapp} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp" title="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .4 5.2.4 11.7c0 2.1.6 4.1 1.7 5.9L.3 24l6.6-1.7a11.7 11.7 0 0 0 5.2 1.2h.1c6.4 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6.1-3.4-8.3Zm-8.4 18c-1.7 0-3.3-.4-4.8-1.2l-.3-.2-3.9 1 1-3.8-.2-.4a9.7 9.7 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.9 9.8Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.4.9-1.5.1-.2.1-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.8 2 .9 2.8 1 3.8.9.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"/></svg></a>
    {submitted && <p className="form-status form-status-success" role="status">Consulta enviada. Te responderemos pronto.</p>}
    {submitError && <p className="form-status form-status-error" role="alert">No pudimos enviar la consulta. Revisá tu conexión e intentá nuevamente.</p>}
    <header className="header">
      <button className="brand" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}><img src="/images/logotantapiel.png" alt="Tanta Piel" style={{width:'340px', maxWidth:'48vw', height:'auto', display:'block'}} /></button>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={()=>setMenuOpen(!menuOpen)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={menuOpen ? 'M5 5 19 19M19 5 5 19' : 'M4 7h16M4 12h16M4 17h16'} /></svg></button>
      <nav id="site-nav" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navegación principal">
        <button onClick={()=>navigate('about')}>Sobre Tanta Piel</button>
        <button onClick={()=>navigate('treatments')}>Tratamientos</button>
        <button onClick={()=>navigate('contact')}>Contacto</button>
        <button className="book" onClick={()=>navigate('booking')}>Reservar turno</button>
      </nav>
    </header>

    <main>
      <section className="hero" aria-label="Tanta Piel"><img src={content.hero.image} alt={content.hero.alt} /><div className="hero-caption"><span>{content.hero.eyebrow}</span><span>{content.hero.location}</span></div></section>
      <section id="about" className="intro section-pad reveal"><div className="eyebrow">{content.intro.eyebrow}</div><h1>{content.intro.title}<br/><em>{content.intro.emphasis}</em></h1><div className="intro-copy"><p>{content.intro.text}</p><button className="text-link" onClick={()=>go('treatments')}>{content.intro.link}</button></div></section>
      <section className="image-block reveal"><img src={content.editorial.image} alt={content.editorial.alt} /></section>
      <section className="profile section-pad reveal"><div className="eyebrow">{content.profile.eyebrow}</div><div className="profile-grid"><div className="profile-copy"><h2>{content.profile.title}<br/><em>{content.profile.name}</em></h2><p>{content.profile.text}</p></div><div className="profile-photos">{(content.profile.images || [giorperfil, giorperfil2]).map((image, index) => <img key={index} src={image} alt={index === 0 ? 'Giorperfil, cosmetóloga de Tanta Piel' : 'Retrato de Giorperfil, cosmetóloga'} className="profile-photo" />)}</div></div></section>
      <section id="treatments" className="treatments section-pad reveal"><div className="eyebrow">{content.treatments.eyebrow}</div><div className="section-heading"><h2>{content.treatments.title}<br/><em>{content.treatments.emphasis}</em></h2><p>{content.treatments.text}</p></div><div className="treatment-list">{treatmentItems.map(({number, title, copy}) => <details className="treatment" key={number}><summary><span>{number}</span><h3>{title}</h3><b>+</b></summary><p>{copy}</p></details>)}</div></section>
      <section id="space" className="space section-pad reveal"><div className="space-copy"><div className="eyebrow">{content.space.eyebrow}</div><h2>{content.space.title}<br/><em>{content.space.emphasis}</em></h2><p>{content.space.text}</p></div><img src={content.space.image} alt={content.space.alt} /></section>
      <section id="location" className="location section-pad reveal"><div className="eyebrow">{content.location.eyebrow}</div><div className="location-grid"><h2>{content.location.title}<br/><em>{content.location.emphasis}</em></h2><div className="location-data"><p><strong>Dirección 1</strong><br/>{content.location.address}</p><p><strong>Dirección 2 (provisoria)</strong><br/>Ituzaingó 1280, Paysandú</p><p><strong>Horarios</strong><br/>{content.location.hours}</p><p><strong>WhatsApp</strong><br/>{content.location.whatsapp}</p><a className="text-link" style={{textDecoration:'none', borderBottom:'none'}} href="https://maps.google.com/?q=Montevideo,Uruguay" target="_blank" rel="noreferrer">Cómo llegar</a></div></div></section>
      <section id="contact" className="contact section-pad reveal"><div className="contact-intro"><div className="eyebrow">{content.contact.eyebrow}</div><h2>{content.contact.title}</h2><p>{content.contact.text}</p><div className="contact-links"><a className="social-link whatsapp-link" href={whatsapp}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .4 5.2.4 11.7c0 2.1.6 4.1 1.7 5.9L.3 24l6.6-1.7a11.7 11.7 0 0 0 5.2 1.2h.1c6.4 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6.1-3.4-8.3Zm-8.4 18c-1.7 0-3.3-.4-4.8-1.2l-.3-.2-3.9 1 1-3.8-.2-.4a9.7 9.7 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.9 9.8Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.4.9-1.5.1-.2.1-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.8 2 .9 2.8 1 3.8.9.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"/></svg><span>WhatsApp</span><b>→</b></a><a className="social-link instagram-link" href={instagram} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" className="fill-icon"/></svg><span>Instagram</span><b>→</b></a><a className="social-link email-link" href={`mailto:${email}`}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="1"/><path d="m3 6 9 7 9-7"/></svg><span>Email</span><b>→</b></a><span className="contact-address">Dirección<br/>{content.contact.address}</span></div></div><form id="booking" name="reserva" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="booking-form" onSubmit={submitForm}><input type="hidden" name="form-name" value="reserva" /><p className="hidden-field"><label>No completar: <input name="bot-field" /></label></p><div className="form-row"><label>Nombre<input name="nombre" required placeholder="Tu nombre" /></label><label>Apellido<input name="apellido" required placeholder="Tu apellido" /></label></div><div className="form-row"><label>Email<input type="email" name="email" required placeholder="tu@email.com" /></label><label>Teléfono<input type="tel" name="telefono" required placeholder="+598" /></label></div><label>Mensaje<textarea name="mensaje" rows="3" required placeholder="¿En qué podemos ayudarte?" /></label><button className="submit-button" type="submit">Enviar consulta <span>→</span></button>{submitted && <p className="form-success" role="status">Gracias. Recibimos tu consulta y te escribiremos pronto.</p>}</form></section>
      <section className="cta section-pad"><div className="eyebrow">{content.cta.eyebrow}</div><h2>{content.cta.title}<br/><em>{content.cta.emphasis}</em></h2><button className="cta-button" onClick={()=>go('booking')}>Reservar turno</button></section>
    </main>
    <footer className="footer"><div><strong>Tanta Piel</strong><span>Cosmetología &amp; skincare</span></div><nav><button onClick={()=>go('about')}>Sobre Tanta Piel</button><button onClick={()=>go('treatments')}>Tratamientos</button><button onClick={()=>go('contact')}>Contacto</button></nav><div className="footer-social"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href={whatsapp}>WhatsApp</a></div><small>© {new Date().getFullYear()} Tanta Piel</small></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
