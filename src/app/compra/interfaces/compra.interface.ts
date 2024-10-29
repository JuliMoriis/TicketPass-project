import { Fecha } from './../../evento/interfaces/fecha.interface';
export interface Compra {
  id?: string,
  fecha: Date,
  cliente: {
    idCliente: string,
    nombre: string,
    email: string
  },
  evento: {
    idEvento: string,
    nombreEvento: string,
    fechaEvento: Date
  },
  entrada: {
    sector: string,
    butaca?: number
  },
  precioTotal: number,
  estado: boolean
}
