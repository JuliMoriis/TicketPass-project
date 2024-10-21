import { Asiento } from "./asiento.interface";

export interface Sector {
  id?: number,
  nombreSector: string,
  capacidad: number,
  numerado: boolean,
  asientos: Asiento[]
}
