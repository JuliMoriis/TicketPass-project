import { Entrada } from "./entrada.interface";

export interface Evento {
    id?: number,
    nombreEvento: string,
    artista_banda: string,
    duracion: string,
    UrlBanner: string,
    recinto_id: number,
    entradas: Entrada[]
}
