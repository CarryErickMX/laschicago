// La mano de cromos de la portada: solo el cromo del centro se usa; los de los lados se eligen.
import { actualizarCaras } from './cromos.js';

const raiz = document.querySelector('[data-mano]');
const cartas = [...raiz.querySelectorAll('[data-carta]')];
const total = cartas.length;
const mitad = Math.floor(total / 2);
let centro = Math.max(0, cartas.findIndex((c) => c.querySelector('.cromo--principal')));
const oyentes = new Set();

const posicion = (k) => ((k - centro + total + mitad) % total) - mitad;
const cromoDe = (carta) => carta.querySelector('[data-cromo]');

export const cartaCentral = () => cartas[centro];

export function alCambiar(fn) {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
}

function pintar() {
  cartas.forEach((carta, k) => {
    const p = posicion(k);
    carta.style.setProperty('--i', p);
    carta.dataset.pos = p;
    cromoDe(carta).inert = p !== 0;
    carta.querySelector('[data-elegir]').tabIndex = p === 0 ? -1 : 0;
  });
}

// El cromo que deja el centro regresa a su frente.
function regresarAlFrente(cromo) {
  cromo.removeAttribute('data-volteado');
  const rig = cromo.querySelector('.cromo__rig');
  rig.style.transform = '';
  rig.dataset.scrollVolteado = '0';
  actualizarCaras(cromo);
}

export function elegir(k, conFoco = false) {
  k = (k + total) % total;
  if (k === centro) return;
  regresarAlFrente(cromoDe(cartas[centro]));
  centro = k;
  pintar();
  oyentes.forEach((fn) => fn());
  if (conFoco) cromoDe(cartas[k]).querySelector('[data-frente] [data-agregar]')?.focus({ preventScroll: true });
}

raiz.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-elegir]');
  if (boton) elegir(cartas.indexOf(boton.closest('[data-carta]')), e.detail === 0);
});

// Deslizar con el dedo cambia de cromo; el scroll vertical sigue libre.
let inicio = null;
raiz.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'mouse') inicio = { x: e.clientX, y: e.clientY, t: performance.now() };
});
raiz.addEventListener('pointerup', (e) => {
  if (!inicio) return;
  const dx = e.clientX - inicio.x;
  const dy = e.clientY - inicio.y;
  const rapido = Math.abs(dx) / (performance.now() - inicio.t) > 0.3;
  inicio = null;
  if (Math.abs(dx) > Math.abs(dy) && (Math.abs(dx) > 50 || rapido)) elegir(centro + (dx < 0 ? 1 : -1));
});
raiz.addEventListener('pointercancel', () => (inicio = null));

pintar();
