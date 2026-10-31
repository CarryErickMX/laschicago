// Alineación: estado del pedido, panel y mensaje de WhatsApp.
import gsap from 'gsap';
import { sucursales } from '../data/negocio.js';

const LLAVE = 'las-chicago-pedido';
const q = (sel, raiz = document) => raiz.querySelector(sel);
const qq = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
const moneda = (n) => `$${n.toLocaleString('es-MX')}`;
const mueve = () => matchMedia('(prefers-reduced-motion: no-preference)').matches;

const estado = cargar();

function cargar() {
  try {
    const guardado = JSON.parse(localStorage.getItem(LLAVE));
    if (guardado && Array.isArray(guardado.lineas)) return { sucursal: '', nombre: '', notas: '', ...guardado };
  } catch {}
  return { lineas: [], sucursal: '', nombre: '', notas: '' };
}

function guardar() {
  try {
    localStorage.setItem(LLAVE, JSON.stringify(estado));
  } catch {}
}

const dialogo = q('[data-pedido]');
const dock = q('[data-dock]');
const anuncio = q('[data-anuncio]');
const listaLineas = q('[data-lineas]');
const enviar = q('[data-enviar]');
const ayuda = q('[data-ayuda]');

const cantidad = () => estado.lineas.reduce((s, l) => s + l.cantidad, 0);
const total = () => estado.lineas.reduce((s, l) => s + l.cantidad * l.precio, 0);
const nombreLinea = (l) => [l.nombre, l.detalle, l.sabor].filter(Boolean).join(' · ');

function mensaje() {
  const s = sucursales.find((x) => x.id === estado.sucursal);
  const partes = [`Hola Las Chicago, quiero hacer un pedido${s ? ` en ${s.nombre}` : ''}:`, ''];
  estado.lineas.forEach((l) => partes.push(`${l.cantidad} × ${nombreLinea(l)}: ${moneda(l.cantidad * l.precio)}`));
  partes.push('', `Total estimado: ${moneda(total())}`);
  if (estado.nombre.trim()) partes.push(`Nombre: ${estado.nombre.trim()}`);
  if (estado.notas.trim()) partes.push(`Notas: ${estado.notas.trim()}`);
  return partes.join('\n');
}

function pintarLineas() {
  listaLineas.replaceChildren(
    ...estado.lineas.map((l, i) => {
      const li = document.createElement('li');
      li.className = 'linea-pedido';

      const texto = document.createElement('div');
      const nombre = document.createElement('b');
      nombre.textContent = l.nombre;
      const detalle = document.createElement('small');
      detalle.textContent = [l.detalle, l.sabor].filter(Boolean).join(' · ');
      texto.append(nombre, detalle);

      const pasos = document.createElement('div');
      pasos.className = 'pasos';
      const menos = botonPaso('−', `Quitar uno de ${l.nombre}`, () => cambiar(i, -1));
      const num = document.createElement('span');
      num.textContent = l.cantidad;
      const mas = botonPaso('+', `Agregar uno de ${l.nombre}`, () => cambiar(i, 1));
      pasos.append(menos, num, mas);

      const subtotal = document.createElement('b');
      subtotal.className = 'linea-pedido__precio';
      subtotal.textContent = moneda(l.cantidad * l.precio);

      li.append(texto, pasos, subtotal);
      return li;
    }),
  );
}

function botonPaso(signo, etiqueta, accion) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = signo;
  b.setAttribute('aria-label', etiqueta);
  b.addEventListener('click', accion);
  return b;
}

function pintar() {
  const n = cantidad();
  qq('[data-cuenta]').forEach((el) => (el.textContent = n));
  qq('[data-total]').forEach((el) => (el.textContent = moneda(total())));
  dock.hidden = n === 0;
  q('[data-vacio]').hidden = n > 0;
  q('[data-con-items]').hidden = n === 0;
  q('[data-pie]').hidden = n === 0;
  pintarLineas();
  actualizarEnvio();
  guardar();
}

function actualizarEnvio() {
  const s = sucursales.find((x) => x.id === estado.sucursal);
  const texto = mensaje();
  q('[data-mensaje]').textContent = texto;
  if (s) {
    enviar.href = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(texto)}`;
    enviar.setAttribute('aria-disabled', 'false');
    ayuda.textContent = `Se abrirá WhatsApp con ${s.nombre}.`;
  } else {
    enviar.removeAttribute('href');
    enviar.setAttribute('aria-disabled', 'true');
    ayuda.textContent = 'Elige sucursal para enviar.';
  }
}

function cambiar(i, delta) {
  estado.lineas[i].cantidad += delta;
  if (estado.lineas[i].cantidad <= 0) estado.lineas.splice(i, 1);
  pintar();
}

function agregar(boton) {
  const { id, nombre, detalle, precio, sabores } = boton.dataset;
  const sabor = sabores ? document.getElementById(sabores)?.value ?? '' : '';
  const linea = estado.lineas.find((l) => l.id === id && l.detalle === detalle && l.sabor === sabor);
  if (linea) linea.cantidad += 1;
  else estado.lineas.push({ id, nombre, detalle, sabor, precio: Number(precio), cantidad: 1 });
  pintar();
  anuncio.textContent = `${nombre} agregado. ${cantidad()} en tu alineación.`;
  volarAlDock(boton);
}

// El cromo vuela al dock: confirma dónde quedó lo que acabas de agregar.
function volarAlDock(boton) {
  const destino = dock.hidden ? null : dock.getBoundingClientRect();
  if (!destino) return;
  if (!mueve()) return;
  const origen = boton.getBoundingClientRect();
  const foto = boton.closest('[data-cromo]')?.querySelector('img');
  const ficha = document.createElement('div');
  ficha.className = 'ficha-vuelo';
  if (foto) ficha.style.backgroundImage = `url(${foto.currentSrc || foto.src})`;
  document.body.append(ficha);
  gsap.set(ficha, { x: origen.left, y: origen.top - 40, rotation: -8 });
  gsap.to(ficha, {
    x: destino.left + 12,
    y: destino.top,
    rotation: 6,
    scale: 0.45,
    duration: 0.55,
    ease: 'power3.inOut',
    onComplete() {
      ficha.remove();
      gsap.fromTo(dock, { scale: 1.06 }, { scale: 1, duration: 0.3, ease: 'power3.out', clearProps: 'scale' });
    },
  });
}

function abrir() {
  if (!dialogo.open) dialogo.showModal();
}

document.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-agregar]');
  if (boton) return agregar(boton);
  if (e.target.closest('[data-abrir-pedido]')) return abrir();
  if (e.target.closest('[data-cerrar-pedido]')) return dialogo.close();
  if (e.target === dialogo) return dialogo.close();
  const pedirEn = e.target.closest('[data-pedir-en]');
  if (pedirEn) {
    estado.sucursal = pedirEn.dataset.pedirEn;
    qq('[data-sucursal]').forEach((r) => (r.checked = r.value === estado.sucursal));
    pintar();
    abrir();
  }
});

// Un enlace sin href no navega; aquí se evita además el foco muerto y se avisa qué falta.
enviar.addEventListener('click', (e) => {
  if (enviar.getAttribute('aria-disabled') === 'true') {
    e.preventDefault();
    q('.elige')?.scrollIntoView({ block: 'center', behavior: mueve() ? 'smooth' : 'auto' });
    q('[data-sucursal]')?.focus();
  }
});

q('[data-vaciar]').addEventListener('click', () => {
  estado.lineas = [];
  pintar();
});

qq('[data-sucursal]').forEach((r) => {
  r.checked = r.value === estado.sucursal;
  r.addEventListener('change', () => {
    estado.sucursal = r.value;
    pintar();
  });
});

const campoNombre = q('[data-cliente]');
const campoNotas = q('[data-notas]');
campoNombre.value = estado.nombre;
campoNotas.value = estado.notas;
campoNombre.addEventListener('input', () => {
  estado.nombre = campoNombre.value;
  actualizarEnvio();
  guardar();
});
campoNotas.addEventListener('input', () => {
  estado.notas = campoNotas.value;
  actualizarEnvio();
  guardar();
});

enviar.setAttribute('tabindex', '0');
enviar.setAttribute('role', 'link');
pintar();
