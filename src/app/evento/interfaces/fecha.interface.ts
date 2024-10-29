import { Entrada } from "./entrada.interface"

export interface Fecha {
    id?: string,
    fecha : Date,
    hora : string,
    entradas: Entrada[]
    habilitado: number  /* 1 fila habilitada 0 no se puede entrar a la fila */
}
