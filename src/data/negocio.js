// Datos del negocio. Edita aquí sucursales, horarios, promociones y eventos.

export const negocio = {
  nombre: 'Las Chicago',
  completo: 'Las Chicago - Alitas y Costillas',
  facebook: 'https://www.facebook.com/LasChicagoAlitasCostillas',
  tiktok: 'https://www.tiktok.com/@laschicagoalitasy',
  seguidores: '2.4 mil',
};

// Horario por día: 0 = domingo ... 6 = sábado; null = cerrado. Formato de 24 horas.
const normal = ['15:00', '22:30'];
const largo = ['15:00', '23:59'];

export const sucursales = [
  {
    id: 'santa-cruz',
    nombre: 'Santa Cruz de Abajo',
    direccion: 'Calle Miguel Hidalgo 775, Santa Cruz de Abajo, Texcoco, Méx., 56205',
    whatsapp: '525510957150',
    telefono: '55 1095 7150',
    mapa: 'Calle Miguel Hidalgo 775, 56205 Santa Cruz de Abajo, Texcoco, México',
    horario: { 0: normal, 1: null, 2: normal, 3: normal, 4: normal, 5: largo, 6: largo },
  },
  {
    id: 'chiconcuac',
    nombre: 'Chiconcuac',
    direccion: 'Prol. Hidalgo Sur 17, Chiconcuac de Juárez, Méx., 56210',
    whatsapp: '525571167121',
    telefono: '55 7116 7121',
    mapa: 'Prol. Hidalgo Sur 17, Chiconcuac de Juárez, 56210, México',
    horario: { 0: normal, 1: null, 2: normal, 3: normal, 4: normal, 5: normal, 6: normal },
  },
];

// '15:00' -> '3:00 p. m.'
export function hora12(hora) {
  const [h, m] = hora.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a. m.' : 'p. m.'}`;
}

// Junta los días seguidos con el mismo horario, de lunes a domingo.
const DIAS = [[1, 'Lunes'], [2, 'Martes'], [3, 'Miércoles'], [4, 'Jueves'], [5, 'Viernes'], [6, 'Sábado'], [0, 'Domingo']];

export function horarioAgrupado(horario) {
  const grupos = [];
  for (const [dia, nombre] of DIAS) {
    const texto = horario[dia] ? `${hora12(horario[dia][0])} a ${hora12(horario[dia][1])}` : 'Cerrado';
    const ultimo = grupos.at(-1);
    if (ultimo?.texto === texto) {
      ultimo.hasta = nombre;
      ultimo.dias.push(dia);
    } else {
      grupos.push({ desde: nombre, hasta: nombre, texto, dias: [dia] });
    }
  }
  return grupos.map((g) => ({ ...g, etiqueta: g.desde === g.hasta ? g.desde : `${g.desde} ${g.dias.length === 2 ? "y" : "a"} ${g.hasta.toLowerCase()}` }));
}

// Semana de promociones: el índice es el día (0 = domingo).
export const semana = [
  { dia: 1, letra: 'L', nombre: 'Lunes' },
  {
    dia: 2,
    letra: 'M',
    nombre: 'Martes',
    promo: { grande: '$50', titulo: 'Comida en $50', detalle: 'Martes y miércoles. Aplica restricciones.' },
  },
  {
    dia: 3,
    letra: 'M',
    nombre: 'Miércoles',
    promo: { grande: '$50', titulo: 'Comida en $50', detalle: 'Martes y miércoles. Aplica restricciones.' },
  },
  {
    dia: 4,
    letra: 'J',
    nombre: 'Jueves',
    promo: {
      grande: '2×1',
      titulo: 'Alitas y costillas al 2×1',
      detalle: 'Válido en órdenes de 6 pzs.',
    },
  },
  { dia: 5, letra: 'V', nombre: 'Viernes' },
  { dia: 6, letra: 'S', nombre: 'Sábado' },
  { dia: 0, letra: 'D', nombre: 'Domingo' },
];

// Se oculta solo cuando pasa la fecha "hasta".
export const evento = {
  hasta: '2026-11-01',
  titulo: 'Concurso de disfraces y calaveritas',
  premios: [
    { lugar: '1.er lugar', monto: 5000 },
    { lugar: '2.º lugar', monto: 2000 },
    { lugar: '3.er lugar', monto: 1000 },
  ],
  fechas: [
    { sucursal: 'santa-cruz', cuando: 'Sábado 31 de octubre', lugar: 'Santa Cruz de Abajo' },
    { sucursal: 'chiconcuac', cuando: 'Domingo 1 de noviembre', lugar: 'Chiconcuac' },
  ],
  notas: 'Mayores de 12 años. Solo 15 lugares por sucursal. Todos los integrantes se llevan un dulcero.',
};
