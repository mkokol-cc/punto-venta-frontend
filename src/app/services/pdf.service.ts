import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  generatePdfWithRepeatedBarcode(codigo: string, cantidad: number): void {
    const doc = new jsPDF();

    // Dimensiones de la página
    const pageWidth = doc.internal.pageSize.getWidth(); // Ancho total de la página
    const pageHeight = doc.internal.pageSize.getHeight(); // Alto total de la página
    const margin = 10; // Márgenes (izquierdo/derecho/superior/inferior)
    const padding = 5; // Espaciado interno de cada celda

    // Configuración dinámica: Número de códigos por fila y columna
    const codesPerRow = 4; // Cantidad de celdas horizontales
    const codesPerColumn = 7; // Cantidad de celdas verticales

    // Calcular dimensiones dinámicas del tamaño de cada celda (incluyendo padding)
    const cellWidth = (pageWidth - margin * 2) / codesPerRow; // Ancho total de cada celda
    const cellHeight = (pageHeight - margin * 2) / codesPerColumn; // Alto total de cada celda

    // Calcular el tamaño del código de barras dentro de cada celda (excluyendo padding)
    const barcodeWidth = cellWidth - padding * 2;
    const barcodeHeight = cellHeight - padding * 2;

    let currentX = margin;
    let currentY = margin;

    // Crear el código de barras como imagen (canvas)
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, codigo, { format: 'CODE128' });
    const barcodeImage = canvas.toDataURL('image/png');

    // Dibujar el código de barras repetido según la cantidad especificada
    for (let i = 0; i < cantidad; i++) {
      // Dibujar un rectángulo para representar la celda (opcional, solo para visualización)
      doc.rect(currentX, currentY, cellWidth, cellHeight);

      // Agregar el código de barras al PDF, ajustando con el padding
      doc.addImage(
        barcodeImage,
        'PNG',
        currentX + padding, // Ajustar X con padding
        currentY + padding, // Ajustar Y con padding
        barcodeWidth,       // Ancho reducido por el padding
        barcodeHeight       // Alto reducido por el padding
      );

      // Ajustar posición para el siguiente código
      currentX += cellWidth;

      // Mover a la siguiente fila si no hay espacio para más columnas
      if ((i + 1) % codesPerRow === 0) {
        currentX = margin;
        currentY += cellHeight;
      }

      // Agregar una nueva página si no hay más espacio para filas
      if ((i + 1) % (codesPerRow * codesPerColumn) === 0 && i + 1 < cantidad) {
        doc.addPage();
        currentX = margin;
        currentY = margin;
      }
    }
    const date = new Date()
    const nombreDocumento = "COD-" + codigo + "_" + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + "_" + date.getHours() + "-" + date.getMinutes()
    // Guardar el PDF generado
    doc.save(nombreDocumento+'.pdf');
  }
}
