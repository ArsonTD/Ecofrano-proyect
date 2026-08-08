# Encofrado Flernil SRL

Sitio de una página, migrado a [Astro](https://astro.build) desde
`Prototipo_Sitio_Encofrado_Flernil.html` (ese archivo queda como referencia).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # revisa dist/ antes de publicar
```

---

## Agregar un proyecto

Es lo único que se hace seguido, así que va primero.

1. Copia la foto en `src/assets/proyectos/`
2. Abre [`src/data/proyectos.ts`](src/data/proyectos.ts), importa la foto arriba
   junto a las demás, y agrega un objeto a la lista:

```ts
import torreNueva from '@/assets/proyectos/torre-nueva.webp';

// ...dentro de PROYECTOS:
{
  id: 'torre-nueva',
  nombre: 'Torre Nueva',
  tipo: 'Torre residencial',        // Hotelero | Torre residencial | Apartamentos | Obra civil
  ubicacion: 'Santo Domingo',
  anio: 2026,
  aportes: ['Encofrado', 'Andamios'],
  imagen: torreNueva,
  descripcion: 'Opcional.',         // se muestra bajo el título
  destacado: true,                  // opcional, la fija arriba (máximo 3)
  oculto: true,                     // opcional, la deja sin publicar
}
```

3. `npm run build`

El filtro por tipo, el conteo de cada botón, el contador de «obras entregadas»
del banner y el orden se ajustan solos.

---

## Dónde está cada cosa

```
src/
  data/         Todo lo editable sin tocar diseño
    proyectos.ts    las obras (arriba)
    servicios.ts    los 8 servicios
    sitio.ts        teléfonos, correo, equipo, misión/visión, valores
  components/   Una sección = un archivo
  scripts/      El JavaScript de la galería
  styles/       global.css — la hoja de estilos completa
  layouts/      Layout.astro — <head>, título, metadatos
  pages/        index.astro — arma la página con los componentes
  assets/       Las 23 fotos
```

`@/` es un atajo para `src/`, así que `@/data/sitio` = `src/data/sitio.ts`.

---

## Cómo funciona la galería

Las 14 tarjetas se generan en el **build**, con las fotos ya optimizadas por
Astro (varios tamaños vía `srcset`). Eso significa que la página se ve completa
aunque el JavaScript falle, y que Google la puede indexar.

[`src/scripts/proyectos.ts`](src/scripts/proyectos.ts) solo muestra y esconde
esas tarjetas: filtro por tipo, «ver más obras» de 9 en 9, y el modo
administrador.

**Sobre el modo administrador:** los cambios se guardan en el navegador de quien
los hace (`localStorage`), o sea que sirven para enseñar el flujo, no para
publicar de verdad. Las obras que van al sitio se agregan en
`src/data/proyectos.ts`, como arriba.

---

## Antes de publicar

1. **El formulario de contacto no envía nada todavía** — solo muestra la
   confirmación en pantalla. Está marcado con un `TODO` en
   [`src/components/Contacto.astro`](src/components/Contacto.astro); hay que
   apuntarlo al correo de la empresa.
2. **Quitar el aviso de prototipo**: borra la línea `<Aviso />` de
   [`src/pages/index.astro`](src/pages/index.astro).
3. **Completar el RNC** en `src/data/sitio.ts` (hoy dice `000-00000-0`) y
   publicar el aviso de privacidad que enlaza el pie.
4. **Confirmar con el cliente** los años, tipos y ubicaciones de las obras: en el
   dossier venían incompletos.
