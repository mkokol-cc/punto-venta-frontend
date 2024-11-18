import { Cliente } from "./cliente";
import { DetalleVenta } from "./detalle-venta";
import { TipoPago } from "./tipo-pago";

export interface Venta {
    id?:string,
    cliente?:Cliente,
    detalleVenta:DetalleVenta[],
    fechaHora?:string,
    tipoPago:TipoPago
}
