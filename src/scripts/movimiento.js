// Coreografía del sitio con GSAP. Todo el contenido es visible sin este archivo.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { actualizarCaras } from './cromos.js';
import { cartaCentral, alCambiar } from './mano.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

const q = (s, r = document) => r.querySelector(s);
const qq = (s, r = document) => [...r.querySelectorAll(s)];

// Espera las fuentes un momento como máximo: el texto no debe quedarse oculto en redes lentas.
const fuentes = Promise.race([document.fonts.ready, new Promise((listo) => setTimeout(listo, 900))]);

fuentes.then(() => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      ancho: '(min-width: 761px) and (prefers-reduced-motion: no-preference)',
      angosto: '(max-width: 760px) and (prefers-reduced-motion: no-preference)',
    },
    (ctx) => {
      const limpiar = portada(ctx.conditions.ancho);
      titulos(ctx.conditions.ancho);
      semana();
      baraja();
      contadores();
      pippen();
      mesa();
      sedes();
      cierre();
      return limpiar;
    },
  );

  ScrollTrigger.refresh();
});

// Reparto inicial de la mano y, en pantallas anchas, el volteo con scroll.
// Reparto inicial de la mano y, en pantallas anchas, el volteo del cromo central con scroll.
function portada(ancho) {
  const raiz = q('[data-inicio]');
  const cartas = qq('[data-carta]', raiz);
  const lineas = qq('.linea', raiz);

  const entrada = gsap.timeline({ defaults: { ease: 'power4.out' } });
  entrada
    .from(lineas, { yPercent: 40, opacity: 0, duration: 0.8, stagger: 0.08 })
    .from(cartas, { yPercent: 130, duration: 0.9, stagger: { each: 0.06, from: 'center' } }, 0.1)
    .from('.inicio__repisa', { yPercent: 100, duration: 0.6 }, 0.5);

  if (!ancho) return undefined;

  // Un solo estado que el scroll avanza; se aplica a la carta que esté en el centro en ese momento.
  const giro = { t: 0, vuelta: 0 };
  const aplicar = () => {
    cartas.forEach((carta) => {
      const p = Number(carta.dataset.pos);
      const lado = Math.sign(p);
      gsap.set(carta, { x: lado * (440 + Math.abs(p) * 120) * giro.t, y: p ? 240 * giro.t : 0, rotation: p * 7 * giro.t });
    });
    const cromo = cartaCentral().querySelector('[data-cromo]');
    const rig = q('.cromo__rig', cromo);
    gsap.set(rig, { rotationY: giro.vuelta });
    const volteado = giro.vuelta > 90 ? '1' : '0';
    if (rig.dataset.scrollVolteado !== volteado) {
      rig.dataset.scrollVolteado = volteado;
      actualizarCaras(cromo);
    }
  };

  gsap
    .timeline({
      scrollTrigger: {
        trigger: raiz,
        start: () => `top ${q('.barra').offsetHeight}px`,
        end: '+=110%',
        pin: true,
        scrub: 0.6,
      },
    })
    .to(giro, { t: 1, ease: 'power2.in', duration: 1, onUpdate: aplicar }, 0)
    .to(giro, { vuelta: 180, ease: 'power2.inOut', duration: 0.8, onUpdate: aplicar }, 0.2);

  const quitar = alCambiar(aplicar);
  return () => {
    quitar();
    gsap.set(cartas, { clearProps: 'x,y,rotation' });
  };
}

// Cada título sube letra por letra desde su máscara.
// En celular los títulos suben por renglón: es más rápido de leer y más ligero.
function titulos(ancho) {
  qq('[data-titulo]').forEach((titulo) => {
    SplitText.create(titulo, {
      type: ancho ? 'lines,chars' : 'lines',
      mask: 'lines',
      aria: 'auto',
      onSplit: (self) =>
        gsap.from(ancho ? self.chars : self.lines, {
          yPercent: 110,
          duration: ancho ? 0.6 : 0.5,
          stagger: ancho ? 0.012 : 0.06,
          ease: 'power4.out',
          scrollTrigger: { trigger: titulo, start: 'top 88%', once: true },
        }),
    });
  });
}

function semana() {
  gsap.from('[data-dia]', {
    y: 70,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: 'power3.out',
    scrollTrigger: { trigger: '[data-semana]', start: 'top 82%', once: true },
  });
}

// Los cromos se reparten desde la izquierda; las filas de cartón solo asoman.
function baraja() {
  const activo = q('[data-panel].es-activo');
  if (!activo) return;
  ScrollTrigger.batch(qq('.cromo', activo), {
    start: 'top 88%',
    once: true,
    onEnter: (lote) =>
      gsap.fromTo(
        lote,
        { x: -90, y: 30, rotation: -9, opacity: 0 },
        { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out', clearProps: 'x,y,rotation,opacity' },
      ),
  });
  ScrollTrigger.batch(qq('[data-fila]', activo), {
    start: 'top 94%',
    once: true,
    onEnter: (lote) => gsap.fromTo(lote, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out', clearProps: 'y,opacity' }),
  });

  // En táctil no hay cursor: el foil avanza con el scroll.
  if (!matchMedia('(hover: hover)').matches) {
    qq('.cromo').forEach((cromo) => {
      ScrollTrigger.create({
        trigger: cromo,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => cromo.style.setProperty('--py', `${self.progress * 100}%`),
      });
    });
  }
}

function contadores() {
  qq('[data-contar]').forEach((el) => {
    const meta = Number(el.dataset.contar);
    const valor = { n: 0 };
    gsap.to(valor, {
      n: meta,
      duration: 1.1,
      ease: 'power2.out',
      snap: { n: 50 },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate() {
        el.textContent = `$${valor.n.toLocaleString('es-MX')}`;
      },
    });
  });
}

function pippen() {
  // Pippen sube desde la orilla de la sección y termina parado sobre la foto de la mesa.
  gsap.fromTo(
    '[data-pippen-figura]',
    { y: 110, scale: 0.94 },
    { y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-pippen]', start: 'top 85%', end: 'top 15%', scrub: 0.5 } },
  );
  gsap.from('.ficha > div', {
    x: 30,
    opacity: 0,
    duration: 0.45,
    stagger: 0.07,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.ficha', start: 'top 88%', once: true },
  });
}

// La foto se abre desde una franja: es el único respiro sin texto de la página.
function mesa() {
  const marco = q('[data-mesa-marco]');
  gsap
    .timeline({ scrollTrigger: { trigger: '[data-mesa]', start: 'top 92%', end: 'center 45%', scrub: 0.5 } })
    .fromTo(marco, { clipPath: 'inset(0% 0% 62% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
    .fromTo(q('img', marco), { scale: 1.22 }, { scale: 1, ease: 'none' }, 0);
}

function sedes() {
  qq('[data-sede]').forEach((sede, i) => {
    gsap.from(sede, {
      x: i === 0 ? -60 : 60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: sede, start: 'top 86%', once: true },
    });
  });
}

function cierre() {
  gsap.fromTo(
    '[data-pie-frase]',
    { scale: 0.72, transformOrigin: 'left bottom' },
    { scale: 1, ease: 'none', scrollTrigger: { trigger: '.pie', start: 'top bottom', end: 'top 35%', scrub: 0.4 } },
  );
}
