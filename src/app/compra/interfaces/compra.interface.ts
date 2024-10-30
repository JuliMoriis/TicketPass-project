import { Fecha } from './../../evento/interfaces/fecha.interface';
export interface Compra {
  id?: string,
  fechaDeCompra: Date,
  cliente: {
    idCliente?: string,
    nombre: string,
    email: string
  },
  evento: {
    idEvento?: string,
    nombreEvento: string,
    fechaEvento: Date | null
  },
  entrada: {
    sector: string,
    butaca?: number,
    precioUnitario: number
  },
  cantidad: number,
  precioTotal: number,
  estado: boolean
}
