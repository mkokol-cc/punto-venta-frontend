import { DetalleCombo } from "./detalle-combo";

export interface Articulo {
    id: number,
    codigo:string,
    nombre:string,
    descripcion:string,
    stock: number,
    costo: number,
    recargo: number,
    esCombo: boolean,
    productos: DetalleCombo[]
}