/**
 * Galería de proyectos: filtro por tipo y "ver más".
 *
 * Las tarjetas ya vienen hechas desde el build (por eso el sitio se ve completo
 * sin JavaScript). Este archivo solo las muestra y las esconde. Las obras se
 * agregan en `src/data/proyectos.ts`.
 */

const POR_PAGINA = 9;

const q = <T extends Element = HTMLElement>(sel: string, raiz: ParentNode = document): T => {
  const nodo = raiz.querySelector<T>(sel);
  if (!nodo) throw new Error(`Falta el elemento "${sel}".`);
  return nodo;
};

export function iniciarProyectos(): void {
  const contenedor = document.getElementById('cards');
  if (!contenedor) return;

  let filtro = 'Todas';
  let limite = POR_PAGINA;

  const tarjetas = [...contenedor.querySelectorAll<HTMLElement>('.card')];

  function actualizar(): void {
    let pasan = 0;

    for (const card of tarjetas) {
      const pasa = filtro === 'Todas' || card.dataset.tipo === filtro;
      card.hidden = !pasa || pasan >= limite;
      if (pasa) pasan++;
    }

    for (const chip of document.querySelectorAll<HTMLElement>('#chips .chip')) {
      const activo = chip.dataset.tipo === filtro;
      chip.classList.toggle('on', activo);
      chip.setAttribute('aria-pressed', String(activo));
    }

    q('#empty').hidden = pasan > 0;
    q('#moreWrap').hidden = pasan <= limite;
  }

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

  actualizar();
}
