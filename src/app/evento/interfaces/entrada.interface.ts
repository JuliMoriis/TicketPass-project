import { Asiento } from "../../recinto/interfaces/asiento.interface";
import { Fecha } from "./fecha.interface";

export interface Entrada{
    id?: number,
    nombreSector: string,
    precio: number,
    disponibles:number,
    asientos: Asiento[]
}
