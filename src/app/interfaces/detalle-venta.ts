import { Articulo } from "./articulo";

export interface DetalleVenta {
    id:string,
    articulo:Articulo,
    precio:number,
    cantidad:string,
}
