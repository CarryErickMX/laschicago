// Datos del negocio. Edita aquí sucursales, horarios, promociones y eventos.

export const negocio = {
  nombre: 'Las Chicago',
  completo: 'Las Chicago - Alitas y Costillas',
  facebook: 'https://www.facebook.com/LasChicagoAlitasCostillas',
  tiktok: 'https://www.tiktok.com/@laschicagoalitasy',
  seguidores: '2.4 mil',
};

// horario: null muestra "Confirma por WhatsApp".
// Para activar abierto/cerrado usa, por ejemplo:
// horario: { 0: ['13:00', '22:00'], 1: null, 2: ['13:00', '22:00'], ... } (0 = domingo, null = cerrado)
export const sucursales = [
  {
    id: 'santa-cruz',
    nombre: 'Santa Cruz de Abajo',
    direccion: 'Calle Miguel Hidalgo 775, Santa Cruz de Abajo, Texcoco, Méx.',
    whatsapp: '525510957150',
    telefono: '55 1095 7150',
    mapa: 'Calle Miguel Hidalgo 775, Santa Cruz de Abajo, Texcoco, México',
    horario: null,
  },
  {
    id: 'chiconcuac',
    nombre: 'Chiconcuac',
    direccion: 'Prol. Hidalgo Sur 17, Chiconcuac de Juárez, Méx., 56210',
    whatsapp: '525571167121',
    telefono: '55 7116 7121',
    mapa: 'Prol. Hidalgo Sur 17, Chiconcuac de Juárez, 56210, México',
    horario: null,
  },
];

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
