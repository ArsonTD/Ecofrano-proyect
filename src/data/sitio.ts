/** Datos de la empresa y textos institucionales. Todo lo editable está aquí. */

import andyRoberto from '@/assets/equipo/andy-roberto.webp';
import elviraBerihuete from '@/assets/equipo/elvira-berihuete.webp';
import francisPeguero from '@/assets/equipo/francis-peguero.webp';
import orlandoFlernil from '@/assets/equipo/orlando-flernil.webp';
import yeniferVizcaino from '@/assets/equipo/yenifer-vizcaino.webp';

const WHATSAPP = '(809) 995-6312';
const ADMIN = '(809) 345-5587';
const soloNumeros = (t: string) => t.replace(/\D/g, '');

export const EMPRESA = {
  nombre: 'Encofrado Flernil',
  razonSocial: 'Encofrado Flernil SRL',
  desde: 2007,
  rnc: '000-00000-0',
  correo: 'encofradoflernil@gmail.com',
  instagram: '@encofradoflernil',
  instagramUrl: 'https://instagram.com/encofradoflernil',
  telefono: WHATSAPP,
  telefonoAdmin: ADMIN,
  telefonoHref: `tel:+1${soloNumeros(WHATSAPP)}`,
  telefonoAdminHref: `tel:+1${soloNumeros(ADMIN)}`,
  whatsapp: `https://wa.me/1${soloNumeros(WHATSAPP)}?text=${encodeURIComponent('Hola, quiero solicitar una cotización.')}`,
  cobertura: 'Todo el territorio dominicano',
  plazo: 'menos de 24 horas laborables',
};

/** Años de experiencia, calculados. No hay que actualizarlo a mano cada enero. */
export const ANIOS = new Date().getFullYear() - EMPRESA.desde;

export const EQUIPO = [
  { nombre: 'Orlando Flernil', cargo: 'Fundador y CEO', foto: orlandoFlernil },
  {
    nombre: 'Elvira Berihuete',
    cargo: 'Fundadora y asistente administrativa',
    foto: elviraBerihuete,
  },
  { nombre: 'Andy Roberto', cargo: 'Ingeniero de costo y presupuesto', foto: andyRoberto },
  { nombre: 'Francis Peguero', cargo: 'Director de proyectos', foto: francisPeguero },
  { nombre: 'Ing. Yenifer Vizcaíno', cargo: 'Dirección técnica', foto: yeniferVizcaino },
];

export const PILARES = [
  {
    titulo: 'Misión',
    texto:
      'Realizar proyectos de construcción con excelencia en la calidad, garantizando un servicio agradable con el mejor ambiente y adaptándonos a las necesidades de nuestros clientes.',
  },
  {
    titulo: 'Visión',
    texto:
      'Ser reconocidos como una empresa constructora líder en el mercado, ofreciendo diseños y estructuras al servicio de nuestros colaboradores, con la gestión y el manejo de recursos que garantizan y consolidan nuestros ideales.',
  },
  {
    titulo: 'Alcance',
    texto:
      'Dirección, administración, presupuesto y ejecución en campo, con cobertura en todo el territorio dominicano.',
  },
];

export const VALORES = [
  'Integridad y honestidad',
  'Excelencia en el trabajo',
  'Confianza y credibilidad',
  'Respeto por la comunidad y el medio ambiente',
  'Solidaridad con la vida deportiva',
];

export const CONTACTO = [
  {
    titulo: 'WhatsApp · respuesta más rápida',
    valor: EMPRESA.telefono,
    href: EMPRESA.whatsapp,
    externo: true,
  },
  { titulo: 'Teléfono administración', valor: EMPRESA.telefonoAdmin, href: EMPRESA.telefonoAdminHref },
  { titulo: 'Correo', valor: EMPRESA.correo, href: `mailto:${EMPRESA.correo}` },
  { titulo: 'Instagram', valor: EMPRESA.instagram, href: EMPRESA.instagramUrl, externo: true },
  {
    titulo: 'Horario de atención',
    valor: 'Lunes a viernes, 8:00 a.m. – 5:00 p.m.<br>Sábados, 8:00 a.m. – 12:00 m.',
  },
  { titulo: 'Cobertura', valor: EMPRESA.cobertura },
];
