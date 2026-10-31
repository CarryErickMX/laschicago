// Comportamiento de los cromos: voltear, inclinar y foil que sigue al cursor.
import gsap from 'gsap';

export function actualizarCaras(cromo) {
  const rig = cromo.querySelector('.cromo__rig');
  const manual = cromo.hasAttribute('data-volteado');
  const porScroll = rig?.dataset.scrollVolteado === '1';
  const mostrandoReverso = manual !== porScroll;
  cromo.querySelector('[data-frente]').inert = mostrandoReverso;
  cromo.querySelector('[data-reverso]').inert = !mostrandoReverso;
}

document.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-voltear]');
  if (!boton) return;
  const cromo = boton.closest('[data-cromo]');
  cromo.toggleAttribute('data-volteado');
  actualizarCaras(cromo);
  const destino = cromo.querySelector(boton.closest('[data-frente]') ? '[data-reverso] [data-voltear]' : '[data-frente] [data-voltear]');
  destino?.focus({ preventScroll: true });
});

const conCursor = matchMedia('(hover: hover) and (pointer: fine)').matches;
const mueve = matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (conCursor && mueve) {
  document.querySelectorAll('[data-cromo]').forEach((cromo) => {
    const tilt = cromo.querySelector('.cromo__tilt');
    const rotX = gsap.quickTo(tilt, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotY = gsap.quickTo(tilt, 'rotationY', { duration: 0.5, ease: 'power3.out' });

    cromo.addEventListener('pointermove', (e) => {
      // Sobre un botón el cromo se queda quieto para no mover el objetivo del clic.
      if (e.target.closest('button, select')) return;
      const r = cromo.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      rotY((x - 0.5) * 14);
      rotX((0.5 - y) * 14);
      cromo.style.setProperty('--px', `${x * 100}%`);
      cromo.style.setProperty('--py', `${y * 100}%`);
    });
    cromo.addEventListener('pointerleave', () => {
      rotX(0);
      rotY(0);
    });
  });
}
