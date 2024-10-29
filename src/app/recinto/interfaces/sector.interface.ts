import { Asiento } from "./asiento.interface";

export interface Sector {
  id?: string,
  nombreSector: string,
  capacidad: number,
  numerado: boolean,
  asientos: Asiento[]
}
