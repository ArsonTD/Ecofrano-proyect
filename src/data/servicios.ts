/** Los 8 servicios del catálogo. `icono` son los trazos de un SVG 24×24. */

export interface Servicio {
  nombre: string;
  descripcion: string;
  icono: string;
}

export const SERVICIOS: Servicio[] = [
  {
    nombre: 'Encofrado',
    descripcion:
      'Encofrado de todo tipo de estructuras de hormigón: muros, columnas, losas y vigas.',
    icono:
      '<rect x="3" y="4" width="7" height="16"/><rect x="14" y="4" width="7" height="16"/><path d="M10 9h4M10 15h4"/>',
  },
  {
    nombre: 'Terminación y piscinas',
    descripcion:
      'Terminación de albañilería y piscinas con diseños modernos y contemporáneos.',
    icono:
      '<path d="M3 15c3-2 5 2 8 0s5-2 8 0"/><path d="M3 19c3-2 5 2 8 0s5-2 8 0"/><path d="M5 11V5h14v6"/>',
  },
  {
    nombre: 'Alquiler de madera',
    descripcion: 'Alquiler de maderas en general para encofrado y apuntalamiento.',
    icono:
      '<rect x="3" y="6" width="18" height="4"/><rect x="3" y="12" width="18" height="4"/><path d="M7 6v4M14 12v4"/>',
  },
  {
    nombre: 'Andamios metálicos',
    descripcion: 'Alquiler de todo tipo de andamios metálicos para la construcción.',
    icono:
      '<rect x="3" y="4" width="18" height="16"/><path d="M3 12h18M12 4v16M3 4l9 8M21 4l-9 8"/>',
  },
  {
    nombre: 'Acarreo',
    descripcion: 'Acarreo de todo tipo, incluyendo materiales para la construcción.',
    icono:
      '<path d="M2 16V7h11v9"/><path d="M13 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  },
  {
    nombre: 'Andamios de carga y fachada',
    descripcion:
      'Estructuras reforzadas para soportar pesos pesados y permitir trabajos exteriores en altura.',
    icono:
      '<path d="M4 21V6h9v15"/><path d="M13 11h7v10h-7"/><path d="M4 11h9M4 16h9"/>',
  },
  {
    nombre: 'Casetones',
    descripcion:
      'Casetones para losas aligeradas, disponibles en alquiler para todo tipo de vaciado.',
    icono:
      '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  },
  {
    nombre: 'Moldes',
    descripcion:
      'Formas rígidas diseñadas para obtener acabados precisos y uniformes en el vaciado de concreto.',
    icono: '<path d="M4 4h16v4H8v12H4z"/><path d="M12 12h8v8h-8z"/>',
  },
];
