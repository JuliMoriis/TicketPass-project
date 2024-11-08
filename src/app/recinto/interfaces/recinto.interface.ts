import { Direccion } from "./direccion.interface";
import { Sector } from "./sector.interface";

export interface Recinto {
  id?: number,
  nombreRecinto: string,
  direccion: Direccion,
  urlImg: string,
  urlMapaSectores?: string,
  capacidadTotal: number,
  sectores: Sector[]
}
