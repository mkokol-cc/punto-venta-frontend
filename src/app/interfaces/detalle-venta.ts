import { Articulo } from "./articulo";

export interface DetalleVenta {
    articulo:Articulo,
    precio:number,
    cantidad:string,
}
