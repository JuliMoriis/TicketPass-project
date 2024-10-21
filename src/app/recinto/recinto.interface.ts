import { Direccion } from "./direccion.interface";
import { Sector } from "./sector.interface";

export interface Recinto {
  id?: number,
  nombre: string,
  direccion: Direccion,
  urlImg: string,
  sectores: Sector[]
}
