// Menú tomado de las fotos del menú físico. Cambia aquí precios y platillos.
// cromo: el platillo se muestra como carta con foto. Sin cromo, va en la tabla de precios.

const uno = (precio, label = '') => [{ label, precio }];

const papasIndividuales = {
  id: 'papas-individuales',
  nombre: 'Agrega papas individuales',
  tamanos: uno(15),
};

export const categorias = [
  {
    id: 'fuerte',
    titulo: 'Nuestro fuerte',
    color: 'rojo',
    items: [
      {
        id: 'alitas',
        nombre: 'Alitas',
        tamanos: [
          { label: 'Chicas 6 pzs', precio: 60 },
          { label: 'Medianas 10 pzs', precio: 90 },
          { label: 'Grandes 15 pzs', precio: 135 },
        ],
        cromo: { img: 'alitas', alt: 'Alitas glaseadas con papas sobre papel a cuadros', pos: '60% 60%' },
      },
      {
        id: 'costillas',
        nombre: 'Costillas',
        tamanos: [
          { label: 'Chicas 6 pzs', precio: 70 },
          { label: 'Medianas 10 pzs', precio: 100 },
          { label: 'Grandes 15 pzs', precio: 145 },
        ],
        cromo: { img: 'costillas', alt: 'Costillas asadas con aderezo y lechuga', pos: '45% 50%' },
      },
      {
        id: 'boneless',
        nombre: 'Boneless',
        tamanos: [
          { label: 'Chicas 6 pzs', precio: 65 },
          { label: 'Grandes 12 pzs', precio: 120 },
          { label: 'Búfalo 6 pzs', precio: 85 },
        ],
      },
      {
        id: 'tenders',
        nombre: 'Tenders',
        tamanos: [
          { label: 'Orden 3 pzs', precio: 80 },
          { label: 'Búfalo 3 pzs', precio: 100 },
        ],
      },
      papasIndividuales,
    ],
  },
  {
    id: 'burgers',
    titulo: 'Burgers',
    color: 'mostaza',
    items: [
      {
        id: 'burger-chicago',
        nombre: 'Chicago',
        desc: '150 g de carne, jamón, tocino, salchicha, piña, queso manchego, americano y 1 boneless.',
        tamanos: uno(135),
        cromo: { img: 'burger-chicago', alt: 'Hamburguesa alta con jamón, salchicha, piña y papas', pos: '30% 40%' },
      },
      {
        id: 'burger-pippen',
        nombre: 'Pippen',
        desc: '150 g de carne, 250 g de tocino, jamón, queso manchego, bañada en BBQ.',
        tamanos: uno(120),
        cromo: { img: 'burger-pippen', alt: 'Hamburguesa con carne, queso y salsa BBQ', pos: '50% 50%' },
      },
      {
        id: 'burger-pollo',
        nombre: 'Pollo',
        desc: '2 tiras de pollo empanizado, queso manchego y tocino.',
        tamanos: uno(100),
        cromo: { img: 'burger-pollo', alt: 'Hamburguesa con pollo empanizado, queso y tocino', pos: '50% 50%' },
      },
      { id: 'burger-clasica', nombre: 'Clásica', desc: '150 g de carne, salchicha con queso manchego y queso americano.', tamanos: uno(80) },
      { id: 'burger-hawaiana', nombre: 'Hawaiana', desc: '150 g de carne, jamón, piña, queso manchego y queso americano.', tamanos: uno(90) },
      { id: 'burger-arrachera', nombre: 'Arrachera', desc: '150 g de nuestra rica arrachera, guacamole y queso manchego.', tamanos: uno(120) },
      { id: 'burger-jalapeno', nombre: 'Jalapeño', desc: '150 g de carne y una generosa porción de chiles toreados.', tamanos: uno(115) },
      { id: 'burger-cheese', nombre: 'Cheese', desc: '150 g de carne, croqueta de queso manchego empanizada.', tamanos: uno(115) },
      { id: 'burger-boneless', nombre: 'Boneless', desc: '150 g de carne con salsa BBQ u originales, queso manchego y queso americano.', tamanos: uno(115) },
      { id: 'burger-coronel', nombre: 'Coronel', desc: '150 g de pollo crispy, ensalada de col, queso manchego y queso americano.', tamanos: uno(115) },
      { id: 'burger-ranch', nombre: 'Chicken Ranch', desc: 'Empanada de pollo rellena de jamón y queso manchego, piña, tocino bañado en ranch habanero.', tamanos: uno(120) },
      papasIndividuales,
    ],
  },
  {
    id: 'hotdogs',
    titulo: 'Hot dogs',
    nota: 'Salchicha jumbo. Extras: carne $30, queso $15, piña $15.',
    color: 'azul',
    items: [
      {
        id: 'hotdog-chicago',
        nombre: 'Hot dog Chicago',
        desc: 'Una generosa porción de guacamole y chiles toreados.',
        tamanos: uno(75),
        cromo: { img: 'hotdog', alt: 'Hot dog con guacamole, cebolla y aderezo', pos: '45% 50%' },
      },
      { id: 'hotdog-clasico', nombre: 'Clásico', desc: 'Un clásico de los hot dogs, con pico de gallo y tocino.', tamanos: uno(50) },
      { id: 'hotdog-hawaiano', nombre: 'Hawaiano', desc: 'Deliciosa mezcla de piña, queso y tocino.', tamanos: uno(65) },
      { id: 'extra-carne', nombre: 'Extra de carne', tamanos: uno(30) },
      { id: 'extra-queso', nombre: 'Extra de queso', tamanos: uno(15) },
      { id: 'extra-pina', nombre: 'Extra de piña', tamanos: uno(15) },
    ],
  },
  {
    id: 'entradas',
    titulo: 'Entradas',
    color: 'mostaza',
    items: [
      {
        id: 'banderilla',
        nombre: 'Banderillas',
        desc: 'Salchicha, queso y papas a la francesa.',
        tamanos: [
          { label: 'Clásica', precio: 40 },
          { label: 'Hawaiana', precio: 45 },
          { label: 'Búfalo', precio: 50 },
        ],
        cromo: { img: 'banderilla', alt: 'Banderilla empanizada con papas sobre papel a cuadros', pos: '60% 50%' },
      },
      {
        id: 'papas-gajo',
        nombre: 'Papas gajo',
        tamanos: [
          { label: 'Chicas 250 g', precio: 50 },
          { label: 'Grandes 500 g', precio: 80 },
        ],
        cromo: { img: 'gajo', alt: 'Tazón de papas gajo doradas', pos: '50% 50%' },
      },
      {
        id: 'costilla-elote',
        nombre: 'Costilla de elote',
        desc: 'Original o ranch.',
        tamanos: uno(55),
        cromo: { img: 'elote', alt: 'Costillas de elote con chile sobre lechuga', pos: '45% 50%' },
      },
      {
        id: 'papas-francesa',
        nombre: 'Papas a la francesa',
        tamanos: [
          { label: 'Chicas 250 g', precio: 40 },
          { label: 'Grandes 500 g', precio: 70 },
        ],
        cromo: { img: 'papas-francesa', alt: 'Papas a la francesa onduladas y doradas en plato negro', pos: '50% 50%' },
      },
      { id: 'aros', nombre: 'Aros de cebolla', desc: '6 pzs. Empanizado delicioso y ultra crujiente.', tamanos: uno(50) },
      { id: 'dedos', nombre: 'Dedos de queso', desc: '6 pzs. Crujientes por fuera, explosión de queso por dentro.', tamanos: uno(55) },
      { id: 'jalapeno-bites', nombre: 'Jalapeño bites', desc: '6 pzs. Bolitas crujientes, rellenas de jalapeño, tocino y queso crema.', tamanos: uno(50) },
      { id: 'elote', nombre: 'Elote', desc: '3 pzs.', tamanos: uno(40) },
      { id: 'salchipulpos', nombre: 'Salchipulpos', desc: '3 pzs.', tamanos: uno(35) },
    ],
  },
  {
    id: 'plancha',
    titulo: 'Plancha y grill',
    color: 'tinta',
    items: [
      {
        id: 'cortes',
        nombre: 'Cortes premium',
        boton: 'Agregar rib eye',
        desc: 'Con elote o ensalada y papa gajo.',
        tamanos: [
          { label: 'Rib eye 350 g', precio: 220 },
          { label: 'New York 350 g', precio: 220 },
          { label: 'T-bone 350 g', precio: 200 },
          { label: 'Arrachera 350 g', precio: 200 },
          { label: 'Flechas 3 pzs', precio: 150 },
        ],
        cromo: { img: 'corte', alt: 'Corte a la parrilla con papas gajo y elote en tabla de madera', pos: '55% 50%' },
      },
      { id: 'burrito-carne', nombre: 'Burrito de pastor o arrachera', desc: 'Tortilla de harina, 200 g de carne mezclada con queso manchego y frijoles.', tamanos: uno(85) },
      { id: 'burrito-camaron', nombre: 'Burrito de camarón', desc: 'Tortilla de harina, 200 g de camarón con marinado de la casa, queso manchego y ranch habanero.', tamanos: uno(120) },
      { id: 'gringa', nombre: 'Gringa de pastor o arrachera', desc: 'Tortilla de harina, 200 g de carne con queso manchego.', tamanos: uno(60) },
      { id: 'taco-carne', nombre: 'Taco de pastor o arrachera', desc: '100 g de deliciosa carne y papas.', tamanos: uno(35) },
      { id: 'taco-camaron', nombre: 'Taco de camarón', desc: '100 g de camarón, marinado de la casa, queso manchego y ranch habanero.', tamanos: uno(60) },
    ],
  },
  {
    id: 'peques',
    titulo: 'Los peques',
    color: 'azul',
    items: [
      { id: 'chicaguito', nombre: 'Hamburguesa Chicaguito', desc: '100 g de deliciosa carne, queso americano y papas a la francesa.', tamanos: uno(70) },
      { id: 'empanadita', nombre: 'Empanadita de pollo', desc: 'Pechuga rellena de jamón y queso, acompañada con papas a la francesa.', tamanos: uno(50) },
      {
        id: 'nuggets',
        nombre: 'Nuggets',
        tamanos: [
          { label: 'Chicas 12 pzs', precio: 50 },
          { label: 'Grandes 24 pzs', precio: 75 },
        ],
      },
      { id: 'sincronizada', nombre: 'Sincronizada', desc: 'Tortilla de harina, jamón y queso, acompañada de papas a la francesa.', tamanos: uno(50) },
      { id: 'palomitas-pollo', nombre: 'Palomitas de pollo', tamanos: uno(50) },
    ],
  },
  {
    id: 'bebidas',
    titulo: 'Bebidas',
    color: 'azul',
    items: [
      {
        id: 'malteada',
        nombre: 'Malteadas',
        desc: '450 ml.',
        tamanos: uno(60),
        cromo: { img: 'malteada', alt: 'Malteada alta con chocolate, bombones y galleta', pos: '50% 30%' },
      },
      {
        id: 'limonada',
        nombre: 'Limonada 900 ml',
        tamanos: uno(60),
        sabores: ['Tradicional', 'Rosa', 'Frutos rojos', 'Mango', 'Fresa', 'Eléctrica', 'Naranja', 'Maracuyá', 'Blueberry', 'Cereza negra', 'Conga', 'Guanábana', 'Guayaba', 'Kiwi', 'Mandarina', 'Manzana', 'Zarzamora', 'Tamarindo'],
      },
      { id: 'cherry-bulls', nombre: 'Cherry Bulls', tamanos: uno(60) },
      { id: 'americano', nombre: 'Café americano', desc: '170 ml.', tamanos: uno(35) },
      { id: 'capuchino', nombre: 'Café capuchino', desc: '170 ml.', tamanos: uno(35) },
      { id: 'refresco', nombre: 'Refresco', desc: '355 ml.', tamanos: uno(28) },
      { id: 'agua', nombre: 'Agua', desc: '355 ml.', tamanos: uno(18) },
      { id: 'mineral', nombre: 'Agua mineral', desc: '355 ml.', tamanos: uno(30) },
    ],
  },
  {
    id: 'preparados',
    titulo: 'Preparados',
    nota: 'Con alcohol: solo para mayores de edad.',
    color: 'rojo',
    items: [
      {
        id: 'cantarito',
        nombre: 'Cantarito',
        desc: '1 litro.',
        tamanos: uno(80),
        cromo: { img: 'preparado', alt: 'Vaso alto rojo escarchado con chile y fruta', pos: '50% 30%' },
      },
      {
        id: 'mojito',
        nombre: 'Mojito 900 ml',
        tamanos: uno(90),
        sabores: ['Tradicional', 'Rosa', 'Frutos rojos', 'Mango', 'Fresa', 'Eléctrica', 'Naranja', 'Maracuyá', 'Blueberry', 'Cereza negra', 'Conga', 'Guanábana', 'Guayaba', 'Kiwi', 'Mandarina', 'Manzana', 'Zarzamora', 'Tamarindo', 'Vino tinto'],
      },
      { id: 'sangria', nombre: 'Sangría preparada', desc: '900 ml.', tamanos: uno(50) },
      { id: 'tehuacan', nombre: 'Tehuacán preparado', desc: '900 ml.', tamanos: uno(65) },
      { id: 'pina-colada', nombre: 'Piña colada', desc: '450 ml.', tamanos: uno(80) },
      { id: 'baby-mango', nombre: 'Baby mango', desc: '4 pzs.', tamanos: uno(50) },
      { id: 'bulls', nombre: 'Bulls', desc: '450 ml.', tamanos: uno(55) },
      { id: 'pitufos', nombre: 'Pitufos', desc: '900 ml.', tamanos: uno(90) },
      { id: 'flotante', nombre: 'Flotante', tamanos: uno(60) },
      { id: 'tropicoqueto', nombre: 'Tropicoqueto', tamanos: uno(50) },
      { id: 'paloma', nombre: 'Paloma', tamanos: uno(50) },
      { id: 'flamenco', nombre: 'Flamenco', tamanos: uno(50) },
      {
        id: 'cerveza',
        nombre: 'Cerveza',
        tamanos: [
          { label: 'Chica 355 ml', precio: 40 },
          { label: 'Chica cubana', precio: 50 },
          { label: 'Chica clamato', precio: 55 },
          { label: 'Grande', precio: 75 },
          { label: 'Grande cubana', precio: 85 },
          { label: 'Grande clamato', precio: 90 },
        ],
      },
      {
        id: 'extras-bebida',
        nombre: 'Extras',
        tamanos: [
          { label: 'Escarchado', precio: 10 },
          { label: 'Onza', precio: 20 },
          { label: 'Cubana', precio: 10 },
          { label: 'Clamato', precio: 15 },
        ],
      },
    ],
  },
  {
    id: 'postres',
    titulo: 'Por si no te llenaste',
    color: 'tinta',
    items: [
      { id: 'palomitas-maiz', nombre: 'Palomitas de maíz', tamanos: uno(40) },
      { id: 'maruchan', nombre: 'Maruchan', tamanos: uno(30) },
      { id: 'platanos', nombre: 'Plátanos fritos', tamanos: uno(35) },
      { id: 'flan', nombre: 'Flan napolitano', tamanos: uno(40) },
      { id: 'helado', nombre: 'Helado', tamanos: uno(40) },
    ],
  },
];

export const buscarItem = (id) => categorias.flatMap((c) => c.items).find((i) => i.id === id);

// Cada cromo conserva su número en todo el sitio.
const conCromo = categorias.flatMap((c) => c.items).filter((i) => i.cromo);
export const numeroCromo = (id) => conCromo.findIndex((i) => i.id === id) + 1;

// La posición es un juego de la colección, no un dato del platillo.
const POSICIONES = {
  alitas: 'Base',
  costillas: 'Pívot',
  'burger-chicago': 'Capitana',
  'burger-pippen': 'Mascota',
  'burger-pollo': 'Alero',
  'hotdog-chicago': 'Escolta',
  banderilla: 'Novata',
  'papas-gajo': 'Reserva',
  'costilla-elote': 'Refuerzo',
  'papas-francesa': 'Banca',
  cortes: 'Estrella',
  malteada: 'Medio tiempo',
  cantarito: 'Porra',
};
export const posicionCromo = (id) => POSICIONES[id] ?? 'Reserva';
