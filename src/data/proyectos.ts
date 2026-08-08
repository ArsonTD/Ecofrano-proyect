/**
 * Las obras que se muestran en la galería.
 *
 * PARA AGREGAR UN PROYECTO:
 *   1. Copia la foto en  src/assets/proyectos/
 *   2. Impórtala arriba, junto a las demás.
 *   3. Agrega un objeto a la lista PROYECTOS.
 * Nada más. El filtro, el conteo y el orden se ajustan solos.
 */

import hotelCatalonia from '@/assets/proyectos/catalonia-bayahibe.webp';
import bocaDelMar3 from '@/assets/proyectos/boca-del-mar-3.webp';
import costaCaribe from '@/assets/proyectos/costa-caribe-juan-dolio.webp';
import delMare from '@/assets/proyectos/del-mare.webp';
import greenViewTower from '@/assets/proyectos/green-view-tower.webp';
import insignia from '@/assets/proyectos/insignia-pedralbes.webp';
import laSirena from '@/assets/proyectos/la-sirena.webp';
import liveAqua from '@/assets/proyectos/live-aqua.webp';
import nyMets from '@/assets/proyectos/ny-mets.webp';
import royare from '@/assets/proyectos/royare-puerto-plata.webp';
import theSeed from '@/assets/proyectos/the-seed.webp';
import torreIcono from '@/assets/proyectos/torre-icono.webp';
import torreTrinomar from '@/assets/proyectos/torre-trinomar.webp';
import vejezPuntaCana from '@/assets/proyectos/vejez-punta-cana.webp';

/** Tipos de obra. Alimentan los botones de filtro. */
export const TIPOS = [
  'Hotelero',
  'Torre residencial',
  'Apartamentos',
  'Obra civil',
] as const;

/** Lo que aporta Flernil en la obra. Se muestran como etiquetas. */
export const APORTES = [
  'Encofrado',
  'Andamios',
  'Terminación',
  'Acarreo',
  'Personal',
] as const;

export type Tipo = (typeof TIPOS)[number];
export type Aporte = (typeof APORTES)[number];

export interface Proyecto {
  id: string;
  nombre: string;
  tipo: Tipo;
  /** Provincia o zona. */
  ubicacion: string;
  anio: number;
  aportes: Aporte[];
  imagen: ImageMetadata;
  /** Opcional. Se muestra bajo el título. */
  descripcion?: string;
  /** Fija la obra arriba del todo. Máximo 3. */
  destacado?: boolean;
  /** No se publica, pero sigue en la lista. */
  oculto?: boolean;
}

export const PROYECTOS: Proyecto[] = [
  {
    id: 'vejez-punta-cana',
    nombre: 'Vejez de Punta Cana',
    tipo: 'Hotelero',
    ubicacion: 'Punta Cana, La Altagracia',
    anio: 2019,
    aportes: ['Encofrado', 'Personal'],
    imagen: vejezPuntaCana,
  },
  {
    id: 'live-aqua',
    nombre: 'Live Aqua',
    tipo: 'Hotelero',
    ubicacion: 'Punta Cana, La Altagracia',
    anio: 2021,
    aportes: ['Encofrado', 'Andamios', 'Terminación'],
    imagen: liveAqua,
  },
  {
    id: 'del-mare',
    nombre: 'Apartamentos Proyecto del Mare',
    tipo: 'Apartamentos',
    ubicacion: 'Rep. Dominicana',
    anio: 2020,
    aportes: ['Encofrado', 'Acarreo'],
    imagen: delMare,
  },
  {
    id: 'royare-puerto-plata',
    nombre: 'Royare Puerto Plata',
    tipo: 'Hotelero',
    ubicacion: 'Puerto Plata',
    anio: 2020,
    aportes: ['Encofrado', 'Andamios'],
    imagen: royare,
  },
  {
    id: 'boca-del-mar-3',
    nombre: 'Boca del Mar 3',
    tipo: 'Apartamentos',
    ubicacion: 'Boca Chica, Santo Domingo',
    anio: 2022,
    aportes: ['Encofrado', 'Terminación'],
    imagen: bocaDelMar3,
  },
  {
    id: 'catalonia-bayahibe',
    nombre: 'Hotel Catalonia Bayahíbe',
    tipo: 'Hotelero',
    ubicacion: 'Bayahíbe, La Altagracia',
    anio: 2018,
    aportes: ['Encofrado', 'Andamios', 'Personal'],
    imagen: hotelCatalonia,
  },
  {
    id: 'costa-caribe-juan-dolio',
    nombre: 'Costa Caribe Juan Dolio',
    tipo: 'Apartamentos',
    ubicacion: 'Juan Dolio, San Pedro de Macorís',
    anio: 2021,
    aportes: ['Encofrado', 'Acarreo'],
    imagen: costaCaribe,
  },
  {
    id: 'green-view-tower',
    nombre: 'Green View Tower',
    tipo: 'Torre residencial',
    ubicacion: 'Santo Domingo',
    anio: 2022,
    aportes: ['Encofrado', 'Andamios'],
    imagen: greenViewTower,
  },
  {
    id: 'torre-icono',
    nombre: 'Torre Icono',
    tipo: 'Torre residencial',
    ubicacion: 'Santo Domingo',
    anio: 2023,
    aportes: ['Encofrado', 'Andamios', 'Personal'],
    imagen: torreIcono,
  },
  {
    id: 'torre-trinomar',
    nombre: 'Torre Trinomar',
    tipo: 'Torre residencial',
    ubicacion: 'Santo Domingo',
    anio: 2023,
    aportes: ['Encofrado', 'Terminación'],
    imagen: torreTrinomar,
  },
  {
    id: 'la-sirena',
    nombre: 'Proyecto La Sirena',
    tipo: 'Obra civil',
    ubicacion: 'Rep. Dominicana',
    anio: 2024,
    aportes: ['Encofrado', 'Acarreo', 'Personal'],
    imagen: laSirena,
  },
  {
    id: 'ny-mets',
    nombre: 'NY Mets',
    tipo: 'Obra civil',
    ubicacion: 'Boca Chica, Santo Domingo',
    anio: 2024,
    aportes: ['Encofrado', 'Andamios'],
    imagen: nyMets,
  },
  {
    id: 'the-seed',
    nombre: 'Proyecto The Seed',
    tipo: 'Obra civil',
    ubicacion: 'Rep. Dominicana',
    anio: 2025,
    aportes: ['Encofrado', 'Terminación'],
    imagen: theSeed,
  },
  {
    id: 'insignia-pedralbes',
    nombre: 'Proyecto Insignia by Pedralbes',
    tipo: 'Torre residencial',
    ubicacion: 'Santo Domingo',
    anio: 2025,
    aportes: ['Encofrado', 'Andamios', 'Acarreo'],
    imagen: insignia,
  },
];

/** Publicadas, destacadas primero y luego de la más reciente a la más vieja. */
export const publicados = (): Proyecto[] =>
  PROYECTOS.filter((p) => !p.oculto).sort((a, b) =>
    a.destacado === b.destacado ? b.anio - a.anio : a.destacado ? -1 : 1,
  );
