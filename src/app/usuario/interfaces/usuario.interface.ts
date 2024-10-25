import { Direccion } from "../../recinto/interfaces/direccion.interface";

export interface Usuario{
    id?: number,
    nombre: string,
    apellido: string,
    telefono: number,
    email: string,
    direccion : Direccion,
    nombreUsuario: string,
    contrasenia:string
}