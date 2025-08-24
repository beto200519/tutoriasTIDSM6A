// pdf.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  readonly SAMPLE_PDF_PATH = '/assets/reports/sample-report.pdf';

  openSamplePdf(): void {
    window.open(this.SAMPLE_PDF_PATH, '_blank');
  }

  generatePDF(elementId: string, filename: string = 'reporte.pdf'): Promise<void> {
    return new Promise((resolve, reject) => {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Elemento con ID '${elementId}' no encontrado.`);
        reject(`Elemento con ID '${elementId}' no encontrado.`);
        return;
      }

      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
        resolve();
      }).catch(error => {
        console.error('Error al generar PDF:', error);
        reject(error);
      });
    });
  }
}