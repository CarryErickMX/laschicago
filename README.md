# Las Chicago: sitio web

Sitio de Las Chicago - Alitas y Costillas, hecho con Astro y GSAP. No necesita servidor ni base de datos.

## Probarlo

```bash
npm install
```

```bash
npm run dev
```

Abre http://localhost:4321.

## Publicarlo

Cada `git push` a `main` publica el sitio en GitHub Pages: https://carryerickmx.github.io/laschicago/

## Editar contenido

| Qué cambiar | Archivo |
| --- | --- |
| Platillos y precios | `src/data/menu.js` |
| Direcciones, WhatsApp y horarios | `src/data/negocio.js` |
| Promociones de la semana | `src/data/negocio.js` |
| Eventos (se ocultan solos al pasar la fecha) | `src/data/negocio.js` |

### Horarios

Cada sucursal tiene `horario: null`, y el sitio pide confirmarlo por WhatsApp. Cuando el negocio dé sus horarios, llena el campo como indica el comentario en `negocio.js`. El sitio mostrará "Abierto ahora" o "Cerrado ahora" según la hora del centro de México.
