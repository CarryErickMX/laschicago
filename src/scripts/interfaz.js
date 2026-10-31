// Partes que cambian según la fecha, además de las pestañas del menú y el mapa.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { semana, evento, sucursales } from '../data/negocio.js';

gsap.registerPlugin(ScrollTrigger);

const q = (s, r = document) => r.querySelector(s);
const qq = (s, r = document) => [...r.querySelectorAll(s)];
const mueve = () => matchMedia('(prefers-reduced-motion: no-preference)').matches;

// Fecha y hora siempre en la zona del negocio, aunque el visitante esté en otra.
function ahora() {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    weekday: 'short',
  }).formatToParts(new Date());
  const v = Object.fromEntries(partes.map((p) => [p.type, p.value]));
  const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { fecha: `${v.year}-${v.month}-${v.day}`, dia: dias[v.weekday], hora: `${v.hour}:${v.minute}` };
}

const hoy = ahora();

// Semana de promos
const dias = qq('[data-dia]');

function seleccionar(articulo) {
  dias.forEach((d) => {
    const activo = d === articulo;
    d.classList.toggle('es-abierto', activo);
    q('.dia__boton', d).setAttribute('aria-expanded', String(activo));
  });
}

dias.forEach((d) => {
  if (Number(d.dataset.dia) === hoy.dia) {
    d.classList.add('es-hoy');
    const marca = document.createElement('span');
    marca.className = 'dia__hoy';
    marca.textContent = 'Hoy';
    q('.dia__boton', d).prepend(marca);
    q('.dia__boton', d).setAttribute('aria-label', `Hoy, ${q('.dia__nombre', d).textContent}`);
    q('.dia__nombre', d).prepend('Hoy, ');
  }
  q('.dia__boton', d).addEventListener('click', () => seleccionar(d));
});
const articuloHoy = dias.find((d) => Number(d.dataset.dia) === hoy.dia);
seleccionar(articuloHoy.dataset.tienePromo === '1' ? articuloHoy : siguientePromo());

// Los días sin promo avisan cuál es la siguiente.
dias.forEach((d) => {
  const texto = q('[data-sin-promo]', d);
  if (!texto) return;
  const dato = semana.find((x) => x.dia === Number(siguientePromo(Number(d.dataset.dia)).dataset.dia));
  texto.textContent = `Sin promo. Menú completo a precio de siempre. La siguiente: ${dato.nombre.toLowerCase()}, ${dato.promo.titulo.toLowerCase()}.`;
});

function siguientePromo(desde = hoy.dia) {
  for (let i = 1; i <= 7; i++) {
    const candidato = dias.find((d) => Number(d.dataset.dia) === (desde + i) % 7);
    if (candidato.dataset.tienePromo === '1') return candidato;
  }
  return articuloHoy;
}

// Resumen de hoy en la portada
const resumen = q('[data-hoy-resumen] a');
const datoHoy = semana.find((d) => d.dia === hoy.dia);
const datoSiguiente = semana.find((d) => d.dia === Number(siguientePromo().dataset.dia));
resumen.textContent = datoHoy.promo
  ? `Hoy ${datoHoy.nombre.toLowerCase()}: ${datoHoy.promo.titulo.toLowerCase()}`
  : `Próxima promo: ${datoSiguiente.nombre.toLowerCase()}, ${datoSiguiente.promo.titulo.toLowerCase()}`;

q('[data-hoy-linea]').textContent = datoHoy.promo
  ? `Hoy ${datoHoy.nombre.toLowerCase()}: ${datoHoy.promo.titulo.toLowerCase()}. ${datoHoy.promo.detalle}`
  : `Hoy ${datoHoy.nombre.toLowerCase()} no hay promo. La siguiente: ${datoSiguiente.nombre.toLowerCase()}, ${datoSiguiente.promo.titulo.toLowerCase()}.`;

// El evento desaparece solo al terminar
const seccionEvento = q('[data-evento]');
if (hoy.fecha > evento.hasta) seccionEvento.remove();

// Horarios: si hay datos en negocio.js, muestra abierto o cerrado.
sucursales.forEach((s) => {
  if (!s.horario) return;
  const salida = q(`[data-sede="${s.id}"] [data-horario-texto]`);
  const rango = s.horario[hoy.dia];
  const abierto = rango && hoy.hora >= rango[0] && hoy.hora < rango[1];
  salida.textContent = rango
    ? `${abierto ? 'Abierto ahora' : 'Cerrado ahora'}. Hoy de ${rango[0]} a ${rango[1]}.`
    : 'Hoy cerrado.';
  salida.classList.toggle('es-abierto', Boolean(abierto));
});

// Mapa bajo demanda: no carga nada de Google hasta que el visitante lo pide.
qq('[data-ver-mapa]').forEach((b) => {
  b.addEventListener('click', () => {
    const contenedor = b.nextElementSibling;
    if (!contenedor.firstChild) {
      const marco = document.createElement('iframe');
      marco.src = `https://www.google.com/maps?q=${encodeURIComponent(b.dataset.verMapa)}&output=embed`;
      marco.title = `Mapa de ${b.closest('[data-sede]').querySelector('h3').textContent}`;
      marco.loading = 'lazy';
      marco.referrerPolicy = 'no-referrer-when-downgrade';
      contenedor.append(marco);
    }
    contenedor.hidden = !contenedor.hidden;
    b.setAttribute('aria-expanded', String(!contenedor.hidden));
    b.textContent = contenedor.hidden ? 'Ver mapa aquí' : 'Ocultar mapa';
    ScrollTrigger.refresh();
  });
});

// Pestañas del menú
const lista = q('[data-pestanas]');
lista.hidden = false;
const pestanas = qq('[role="tab"]', lista);
const paneles = qq('[data-panel]');

function activar(pestana, conFoco = false) {
  const panel = document.getElementById(pestana.getAttribute('aria-controls'));
  pestanas.forEach((t) => {
    const activa = t === pestana;
    t.setAttribute('aria-selected', String(activa));
    t.tabIndex = activa ? 0 : -1;
  });
  paneles.forEach((p) => p.classList.toggle('es-activo', p === panel));
  if (conFoco) pestana.focus();
  pestana.scrollIntoView({ inline: 'center', block: 'nearest', behavior: mueve() ? 'smooth' : 'auto' });

  if (mueve()) {
    const cartas = qq('.cromo', panel);
    const filas = qq('[data-fila]', panel);
    gsap.killTweensOf([...cartas, ...filas]);
    gsap.fromTo(
      cartas,
      { x: -60, y: 24, rotation: -7, opacity: 0 },
      { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', clearProps: 'all' },
    );
    gsap.fromTo(filas, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.025, delay: 0.08, ease: 'power2.out', clearProps: 'all' });
  }
  ScrollTrigger.refresh();
}

pestanas.forEach((t, i) => {
  t.addEventListener('click', () => activar(t));
  t.addEventListener('keydown', (e) => {
    const paso = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (paso) {
      e.preventDefault();
      activar(pestanas[(i + paso + pestanas.length) % pestanas.length], true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      activar(pestanas[0], true);
    } else if (e.key === 'End') {
      e.preventDefault();
      activar(pestanas[pestanas.length - 1], true);
    }
  });
});
