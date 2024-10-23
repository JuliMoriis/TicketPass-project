import { Entrada } from "./entrada.interface";

export interface Fecha {
    id?: number,
    fecha : Date,
    hora : string,
    entradas: Entrada []
}