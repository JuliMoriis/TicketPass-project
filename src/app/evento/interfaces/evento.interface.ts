import { Fecha } from "./fecha.interface";

export interface Evento {
    id?: string,
    nombreEvento: string,
    artista_banda: string,
    duracion: string,
    UrlBanner: string,
    recinto_id: number,
    fechas: Fecha[],
    alta: number  /*1 habilitado, cuado se elimina en 0  */
}
