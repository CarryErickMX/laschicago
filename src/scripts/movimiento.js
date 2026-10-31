// Coreografía del sitio con GSAP. Todo el contenido es visible sin este archivo.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { actualizarCaras } from './cromos.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

const q = (s, r = document) => r.querySelector(s);
const qq = (s, r = document) => [...r.querySelectorAll(s)];

document.fonts.ready.then(() => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      ancho: '(min-width: 761px) and (prefers-reduced-motion: no-preference)',
      angosto: '(max-width: 760px) and (prefers-reduced-motion: no-preference)',
    },
    (ctx) => {
      portada(ctx.conditions.ancho);
      titulos();
      semana();
      baraja();
      contadores();
      pippen();
      mesa();
      sedes();
      cierre();
    },
  );

  ScrollTrigger.refresh();
});

// Reparto inicial de la mano y, en pantallas anchas, el volteo con scroll.
function portada(ancho) {
  const raiz = q('[data-inicio]');
  const cartas = qq('[data-carta]', raiz);
  const lineas = qq('.linea', raiz);
  const principal = q('.cromo--principal', raiz);
  const cartaPrincipal = principal.closest('[data-carta]');
  const otras = cartas.filter((c) => c !== cartaPrincipal);
  const rig = q('.cromo__rig', principal);
  // Posición del abanico antes del reparto: el scroll debe partir de aquí, no del mazo.
  const base = otras.map((c) => ({ x: gsap.getProperty(c, 'x'), y: gsap.getProperty(c, 'y'), rotation: gsap.getProperty(c, 'rotation') }));

  const entrada = gsap.timeline({ defaults: { ease: 'power4.out' } });
  entrada
    .from(lineas, { yPercent: 40, opacity: 0, duration: 0.8, stagger: 0.08 })
    .from(cartas, { y: 420, x: 0, rotation: 0, duration: 0.9, stagger: { each: 0.06, from: 'center' } }, 0.1)
    .from('.inicio__repisa', { yPercent: 100, duration: 0.6 }, 0.5);

  const alActualizar = (self) => {
    const volteado = self.progress > 0.5 ? '1' : '0';
    if (rig.dataset.scrollVolteado !== volteado) {
      rig.dataset.scrollVolteado = volteado;
      actualizarCaras(principal);
    }
  };

  // En celular no se fija la pantalla: el cromo se voltea en los primeros toques de scroll.
  if (!ancho) {
    gsap.to(rig, { rotationY: 180, ease: 'power1.inOut', scrollTrigger: { start: 50, end: 300, scrub: 0.4, onUpdate: alActualizar } });
    return;
  }

  const giro = gsap.timeline({
    scrollTrigger: {
      trigger: raiz,
      start: () => `top ${q('.barra').offsetHeight}px`,
      end: '+=110%',
      pin: true,
      scrub: 0.6,
      onUpdate: alActualizar,
    },
  });
  otras.forEach((carta, i) => {
    const lado = i < 2 ? -1 : 1;
    giro.fromTo(
      carta,
      base[i],
      { x: base[i].x + lado * 560, y: base[i].y + 240, rotation: base[i].rotation * 2.2, ease: 'power2.in', duration: 1, immediateRender: false },
      0,
    );
  });
  giro.to(rig, { rotationY: 180, ease: 'power2.inOut', duration: 0.8 }, 0.2);
}

// Cada título sube letra por letra desde su máscara.
function titulos() {
  qq('[data-titulo]').forEach((titulo) => {
    SplitText.create(titulo, {
      type: 'lines,chars',
      mask: 'lines',
      aria: 'auto',
      onSplit: (self) =>
        gsap.from(self.chars, {
          yPercent: 110,
          duration: 0.7,
          stagger: 0.016,
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
