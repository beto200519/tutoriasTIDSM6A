import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageContentComponent } from '../../layouts/main-layout/components/page-content/page-content.component';
import { InputComponent } from '../../shared/components';
import { UserState } from '../../shared/states/user.state';
import { CommonModule, JsonPipe } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		PageContentComponent,
		FormsModule,
		ReactiveFormsModule,
		InputComponent,

		JsonPipe
	],
})
export class ProfileComponent {
  fechaHoy: string = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  maestros = [
    {
      nombre: 'Mtro. Sergio Pablo Mariscal Alvarado',
      materia: 'Rector',
      email: 'smariscaluts.edu.mx',
      extension: 'Ext. 106',
    },
    {
      nombre: 'Mtra. Laura Martínez',
      materia: 'Programación Web',
      email: 'lmartinezuts.edu.mx',
      extension: 'Ext. 205',
    },
    {
      nombre: 'Ing. Carlos Rodríguez',
      materia: 'Base de Datos',
      email: 'crodriguezuts.edu.mx',
      extension: 'Ext. 312',
    },
    {
      nombre: 'Mtro. Javier López',
      materia: 'Matemáticas',
      email: 'jlopezuts.edu.mx',
      extension: 'Ext. 418',
    },
  ];

  generarPDF() {
    const element = document.getElementById('horarioPDF');
    if (!element) {
      alert('No se encontró el contenido para el PDF.');
      return;
    }

    // Mostrar el contenido (por si está oculto con display:none)
    element.style.display = 'block';

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('horario_clases.pdf');

      // Volver a ocultar el contenido para PDF
      element.style.display = 'none';
    }).catch((error) => {
      alert('Error al generar el PDF: ' + error);
      element.style.display = 'none';
    });
  }
}