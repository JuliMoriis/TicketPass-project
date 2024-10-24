import { Asiento } from "../../recinto/interfaces/asiento.interface";

export interface Entrada{
    id?: number,
    sector_id: number,
    precio: number,
    disponibles:number,
    asientos: Asiento[]
}