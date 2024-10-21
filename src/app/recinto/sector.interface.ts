import { Asiento } from "./asiento.interface";

export interface Sector {
  id?: number,
  nombre: string,
  capacidad: number,
  numerado: boolean,
  asientos: Asiento[]
}
