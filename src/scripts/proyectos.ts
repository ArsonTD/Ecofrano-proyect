/**
 * Galería de proyectos: filtro, "ver más" y modo administrador.
 *
 * Las tarjetas ya vienen hechas desde el build (por eso el sitio se ve completo
 * sin JavaScript). Este archivo solo las muestra, las esconde y —en modo
 * administrador— las edita. Para agregar obras al sitio de verdad, edita
 * `src/data/proyectos.ts`.
 */

const POR_PAGINA = 9;
const MAX_DESTACADOS = 3;
const MAX_FOTO_MB = 5;
const CLAVE = 'flernil:proyectos';

interface Datos {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  anio: number;
  aportes: string[];
  descripcion: string;
  imagen: string;
  destacado: boolean;
  oculto: boolean;
}

/** Lo que el administrador cambió sobre lo que trae el build. */
interface Guardado {
  nuevos: Datos[];
  cambios: Record<string, Partial<Datos>>;
  borrados: string[];
}

const q = <T extends Element = HTMLElement>(sel: string, raiz: ParentNode = document): T => {
  const nodo = raiz.querySelector<T>(sel);
  if (!nodo) throw new Error(`Falta el elemento "${sel}".`);
  return nodo;
};

export function iniciarProyectos(): void {
  const nodo = document.getElementById('cards');
  if (!nodo) return;
  const contenedor = nodo;

  // Molde para las obras que agregue el administrador: una copia limpia de una
  // tarjeta del build, tomada antes de tocar nada.
  const molde = contenedor.querySelector('.card')?.cloneNode(true) as HTMLElement | undefined;

  let filtro = 'Todas';
  let limite = POR_PAGINA;
  let admin = false;
  let editando: HTMLElement | null = null;
  let foto = '';

  /* ---------------- guardar y recuperar ---------------- */

  const guardado: Guardado = (() => {
    try {
      const crudo = localStorage.getItem(CLAVE);
      if (crudo) {
        const g = JSON.parse(crudo) as Partial<Guardado>;
        return { nuevos: g.nuevos ?? [], cambios: g.cambios ?? {}, borrados: g.borrados ?? [] };
      }
    } catch {
      // Sin almacenamiento o datos dañados: se arranca con lo del build.
    }
    return { nuevos: [], cambios: {}, borrados: [] };
  })();

  function guardar(): void {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(guardado));
    } catch {
      // Cuota llena o modo privado: los cambios duran esta sesión.
    }
  }

  /* ---------------- leer y escribir una tarjeta ---------------- */

  function leer(card: HTMLElement): Datos {
    return {
      id: card.dataset.id ?? '',
      nombre: q('h3', card).textContent ?? '',
      tipo: card.dataset.tipo ?? '',
      ubicacion: card.dataset.ubicacion ?? '',
      anio: Number(card.dataset.anio),
      aportes: [...card.querySelectorAll('.tags span')].map((s) => s.textContent ?? ''),
      descripcion: q('.desc', card).textContent ?? '',
      imagen: q<HTMLImageElement>('img', card).src,
      destacado: card.dataset.destacado === 'si',
      oculto: card.dataset.oculto === 'si',
    };
  }

  function escribir(card: HTMLElement, d: Datos): void {
    card.dataset.id = d.id;
    card.dataset.tipo = d.tipo;
    card.dataset.ubicacion = d.ubicacion;
    card.dataset.anio = String(d.anio);
    card.dataset.destacado = d.destacado ? 'si' : '';
    card.dataset.oculto = d.oculto ? 'si' : '';
    card.classList.toggle('oculto', d.oculto);

    q('h3', card).textContent = d.nombre;
    q('.meta', card).textContent = `${d.tipo} · ${d.ubicacion}`;
    q('.yr', card).textContent = String(d.anio);
    q('.star', card).hidden = !d.destacado;
    q('[data-accion="visibilidad"]', card).textContent = d.oculto ? 'Mostrar' : 'Ocultar';

    const desc = q('.desc', card);
    desc.textContent = d.descripcion;
    desc.hidden = !d.descripcion;

    const tags = q('.tags', card);
    tags.replaceChildren(
      ...d.aportes.map((a) => {
        const span = document.createElement('span');
        span.textContent = a;
        return span;
      }),
    );

    // Solo las fotos subidas por el administrador reemplazan la del build; esas
    // no tienen versiones responsive, así que hay que quitar el srcset.
    if (d.imagen.startsWith('data:')) {
      const img = q<HTMLImageElement>('img', card);
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      img.src = d.imagen;
      img.alt = `${d.nombre} — obra con participación de Encofrado Flernil`;
    }
  }

  const tarjetas = () => [...contenedor.querySelectorAll<HTMLElement>('.card')];

  /** Destacadas primero, luego de la obra más reciente a la más antigua. */
  function ordenar(): void {
    const orden = tarjetas().sort((a, b) => {
      const da = a.dataset.destacado === 'si';
      const db = b.dataset.destacado === 'si';
      if (da !== db) return da ? -1 : 1;
      return Number(b.dataset.anio) - Number(a.dataset.anio);
    });
    contenedor.append(...orden);
  }

  /* ---------------- filtro, paginación y contadores ---------------- */

  function actualizar(): void {
    let pasan = 0;
    let visibles = 0;
    const porTipo: Record<string, number> = {};

    for (const card of tarjetas()) {
      const publicada = admin || card.dataset.oculto !== 'si';
      if (publicada) {
        visibles++;
        const tipo = card.dataset.tipo ?? '';
        porTipo[tipo] = (porTipo[tipo] ?? 0) + 1;
      }
      const pasa = publicada && (filtro === 'Todas' || card.dataset.tipo === filtro);
      card.hidden = !pasa || pasan >= limite;
      if (pasa) pasan++;
    }

    for (const chip of document.querySelectorAll<HTMLElement>('#chips .chip')) {
      const tipo = chip.dataset.tipo ?? '';
      const activo = tipo === filtro;
      chip.classList.toggle('on', activo);
      chip.setAttribute('aria-pressed', String(activo));
      q('.n', chip).textContent = String(tipo === 'Todas' ? visibles : (porTipo[tipo] ?? 0));
    }

    q('#empty').hidden = pasan > 0;
    q('#moreWrap').hidden = pasan <= limite;

    const contador = document.querySelector('[data-dato="Obras entregadas"]');
    if (contador) contador.textContent = String(visibles);
  }

  /* ---------------- estado guardado ---------------- */

  for (const card of tarjetas()) {
    const id = card.dataset.id ?? '';
    if (guardado.borrados.includes(id)) card.remove();
    else if (guardado.cambios[id]) escribir(card, { ...leer(card), ...guardado.cambios[id] });
  }

  for (const datos of guardado.nuevos) {
    if (!molde) break;
    const card = molde.cloneNode(true) as HTMLElement;
    escribir(card, datos);
    contenedor.prepend(card);
  }

  if (guardado.nuevos.length || guardado.borrados.length) ordenar();
  actualizar();

  /* ---------------- filtros y modo administrador ---------------- */

  q('#chips').addEventListener('click', (e) => {
    const chip = (e.target as HTMLElement).closest<HTMLElement>('.chip');
    if (!chip?.dataset.tipo) return;
    filtro = chip.dataset.tipo;
    limite = POR_PAGINA;
    actualizar();
  });

  q('#moreBtn').addEventListener('click', () => {
    limite += POR_PAGINA;
    actualizar();
  });

  const interruptor = q('#adminToggle');
  const alternarAdmin = () => {
    admin = !admin;
    interruptor.classList.toggle('on', admin);
    interruptor.setAttribute('aria-checked', String(admin));
    document.body.classList.toggle('admin', admin);
    actualizar();
  };
  interruptor.addEventListener('click', alternarAdmin);
  interruptor.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      alternarAdmin();
    }
  });

  /* ---------------- acciones sobre una tarjeta ---------------- */

  contenedor.addEventListener('click', (e) => {
    const boton = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-accion]');
    const card = boton?.closest<HTMLElement>('.card');
    if (!boton || !card) return;

    const datos = leer(card);
    const esNueva = guardado.nuevos.some((n) => n.id === datos.id);

    switch (boton.dataset.accion) {
      case 'visibilidad':
        escribir(card, { ...datos, oculto: !datos.oculto });
        anotar(datos.id, { oculto: !datos.oculto }, esNueva);
        actualizar();
        break;

      case 'eliminar':
        if (
          !confirm(
            `¿Eliminar "${datos.nombre}" del sitio? Esta acción se puede deshacer volviendo a agregarla.`,
          )
        ) {
          return;
        }
        card.remove();
        if (esNueva) guardado.nuevos = guardado.nuevos.filter((n) => n.id !== datos.id);
        else guardado.borrados.push(datos.id);
        delete guardado.cambios[datos.id];
        guardar();
        actualizar();
        break;

      case 'editar':
        abrirModal(card);
        break;
    }
  });

  /** Anota el cambio: si la obra es del build va como parche, si no se reescribe. */
  function anotar(id: string, parche: Partial<Datos>, esNueva: boolean): void {
    if (esNueva) {
      const nueva = guardado.nuevos.find((n) => n.id === id);
      if (nueva) Object.assign(nueva, parche);
    } else {
      guardado.cambios[id] = { ...guardado.cambios[id], ...parche };
    }
    guardar();
  }

  /* ---------------- modal ---------------- */

  const modal = q('#modal');
  const aviso = q('#mAviso');
  const prev = q<HTMLImageElement>('#p-prev');
  const entradaFoto = q<HTMLInputElement>('#p-foto');
  const desc = q<HTMLTextAreaElement>('#p-desc');
  let focoPrevio: HTMLElement | null = null;

  function abrirModal(card: HTMLElement | null): void {
    focoPrevio = document.activeElement as HTMLElement | null;
    editando = card;
    const d = card ? leer(card) : null;
    foto = d?.imagen ?? '';

    q('#mTitle').textContent = card ? 'Editar proyecto' : 'Agregar proyecto';
    q('#mSave').textContent = card ? 'Guardar cambios' : 'Publicar proyecto';
    q<HTMLInputElement>('#p-nombre').value = d?.nombre ?? '';
    q<HTMLSelectElement>('#p-tipo').value = d?.tipo ?? '';
    q<HTMLInputElement>('#p-anio').value = d ? String(d.anio) : '';
    q<HTMLInputElement>('#p-ubi').value = d?.ubicacion ?? '';
    desc.value = d?.descripcion ?? '';
    q('#cnt').textContent = String(desc.value.length);
    q<HTMLSelectElement>('#p-estado').value = d?.oculto ? 'oculto' : 'publicado';
    q<HTMLSelectElement>('#p-dest').value = d?.destacado ? 'si' : 'no';

    for (const casilla of document.querySelectorAll<HTMLInputElement>('#p-aportes input')) {
      casilla.checked = d?.aportes.includes(casilla.value) ?? false;
    }

    prev.src = foto;
    entradaFoto.value = '';
    limpiarErrores();

    modal.hidden = false;
    q<HTMLInputElement>('#p-nombre').focus();
  }

  function cerrarModal(): void {
    modal.hidden = true;
    editando = null;
    foto = '';
    focoPrevio?.focus();
  }

  function limpiarErrores(): void {
    for (const campo of modal.querySelectorAll('.f')) campo.classList.remove('bad');
    aviso.hidden = true;
    aviso.textContent = '';
  }

  function marcarError(campo: string, mensaje: string): void {
    const envoltura = document.getElementById(`f-${campo}`);
    if (!envoltura) return;
    envoltura.classList.add('bad');
    q('.err', envoltura).textContent = mensaje;
  }

  q('#addBtn').addEventListener('click', () => abrirModal(null));
  q('#mClose').addEventListener('click', cerrarModal);
  q('#mCancel').addEventListener('click', cerrarModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) cerrarModal();
  });

  desc.addEventListener('input', () => {
    q('#cnt').textContent = String(desc.value.length);
  });

  // La foto se reduce a 900 px en el navegador antes de guardarse.
  entradaFoto.addEventListener('change', async () => {
    const archivo = entradaFoto.files?.[0];
    if (!archivo) return;

    if (archivo.size > MAX_FOTO_MB * 1024 * 1024) {
      entradaFoto.value = '';
      aviso.textContent = `La foto pesa más de ${MAX_FOTO_MB} MB. Elige otra o redúcela antes de subirla.`;
      aviso.hidden = false;
      return;
    }

    try {
      foto = await optimizar(archivo);
      prev.src = foto;
      document.getElementById('f-imagen')?.classList.remove('bad');
      aviso.hidden = true;
    } catch {
      entradaFoto.value = '';
      aviso.textContent = 'No se pudo procesar la foto. Intenta con otra.';
      aviso.hidden = false;
    }
  });

  q('#mSave').addEventListener('click', () => {
    limpiarErrores();

    const nombre = q<HTMLInputElement>('#p-nombre').value.trim();
    const tipo = q<HTMLSelectElement>('#p-tipo').value;
    const anio = Number.parseInt(q<HTMLInputElement>('#p-anio').value, 10);
    const ubicacion = q<HTMLInputElement>('#p-ubi').value.trim();

    let ok = true;
    if (nombre.length <= 1) {
      marcarError('nombre', 'La obra necesita un nombre para publicarse.');
      ok = false;
    }
    if (!tipo) {
      marcarError('tipo', 'Elige el tipo: alimenta el filtro de la galería.');
      ok = false;
    }
    if (!Number.isInteger(anio) || anio < 1990 || anio > 2035) {
      marcarError('anio', 'Escribe un año entre 1990 y 2035.');
      ok = false;
    }
    if (ubicacion.length <= 1) {
      marcarError('ubicacion', 'Indica provincia o zona.');
      ok = false;
    }
    if (!foto) {
      marcarError('imagen', 'Agrega al menos una foto: una obra sin foto no se publica.');
      ok = false;
    }
    if (!ok) {
      modal.querySelector<HTMLElement>('.bad input, .bad select')?.focus();
      return;
    }

    const destacado = q<HTMLSelectElement>('#p-dest').value === 'si';
    if (destacado) {
      const yaDestacadas = tarjetas().filter(
        (c) => c.dataset.destacado === 'si' && c !== editando,
      ).length;
      if (yaDestacadas >= MAX_DESTACADOS) {
        aviso.textContent = `Ya hay ${MAX_DESTACADOS} obras destacadas. Quita una antes de destacar esta.`;
        aviso.hidden = false;
        return;
      }
    }

    const datos: Datos = {
      id: editando?.dataset.id ?? `nueva-${Date.now().toString(36)}`,
      nombre,
      tipo,
      ubicacion,
      anio,
      aportes: [...document.querySelectorAll<HTMLInputElement>('#p-aportes input:checked')].map(
        (c) => c.value,
      ),
      descripcion: desc.value.trim(),
      imagen: foto,
      destacado,
      oculto: q<HTMLSelectElement>('#p-estado').value === 'oculto',
    };

    if (editando) {
      const esNueva = guardado.nuevos.some((n) => n.id === datos.id);
      escribir(editando, datos);
      if (esNueva) {
        const i = guardado.nuevos.findIndex((n) => n.id === datos.id);
        guardado.nuevos[i] = datos;
      } else {
        guardado.cambios[datos.id] = datos;
      }
    } else {
      if (!molde) return;
      const card = molde.cloneNode(true) as HTMLElement;
      escribir(card, datos);
      contenedor.prepend(card);
      guardado.nuevos.unshift(datos);
      filtro = 'Todas';
      limite = POR_PAGINA;
    }

    guardar();
    ordenar();
    cerrarModal();
    actualizar();
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/** Reduce la foto a 900 px de ancho y la recodifica a JPEG. */
function optimizar(archivo: File): Promise<string> {
  return new Promise((resolver, rechazar) => {
    const lector = new FileReader();
    lector.onerror = () => rechazar(new Error('lectura'));
    lector.onload = () => {
      const imagen = new Image();
      imagen.onerror = () => rechazar(new Error('imagen'));
      imagen.onload = () => {
        const ancho = Math.min(900, imagen.width);
        const lienzo = document.createElement('canvas');
        lienzo.width = ancho;
        lienzo.height = Math.round((imagen.height * ancho) / imagen.width);

        const ctx = lienzo.getContext('2d');
        if (!ctx) return rechazar(new Error('canvas'));
        ctx.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
        resolver(lienzo.toDataURL('image/jpeg', 0.72));
      };
      imagen.src = String(lector.result);
    };
    lector.readAsDataURL(archivo);
  });
}
