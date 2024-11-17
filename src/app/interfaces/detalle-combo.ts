import { Articulo } from "./articulo";

export interface DetalleCombo {
    id?:number,
    articulo:Articulo,
    cantidad:number
}
