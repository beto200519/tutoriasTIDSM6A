import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../dashboard.component';

// Importar jsPDF y html2canvas
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dashboard-buttons-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-buttons-panel.component.html',
  styleUrls: ['./dashboard-buttons-panel.component.scss']
})
export class DashboardButtonsPanelComponent {
  @Input() usuarios: Usuario[] = [];
  @Output() onGenerarPDF = new EventEmitter<string>();

  private estudiantes = [
    { matricula: 'L532410062', nombre: 'Estudiante 1' },
    { matricula: 'L532410063', nombre: 'Estudiante 2' },
    { matricula: 'L532410074', nombre: 'Estudiante 3' },
    { matricula: 'L532410064', nombre: 'Estudiante 4' },
    { matricula: 'L532410066', nombre: 'Estudiante 5' },
    { matricula: 'L531910155', nombre: 'Estudiante 6' },
    { matricula: 'L532410067', nombre: 'Estudiante 7' },
    { matricula: 'L532410068', nombre: 'Estudiante 8' },
    { matricula: 'L532410069', nombre: 'Estudiante 9' },
    { matricula: 'L532410071', nombre: 'Estudiante 10' },
    { matricula: 'L532410072', nombre: 'Estudiante 11' },
    { matricula: 'L532410073', nombre: 'Estudiante 12' },
    { matricula: 'L532410171', nombre: 'Estudiante 13' },
    { matricula: 'L532410075', nombre: 'Estudiante 14' },
    { matricula: 'L532410076', nombre: 'Estudiante 15' },
    { matricula: 'L532410077', nombre: 'Estudiante 16' },
    { matricula: 'L532410078', nombre: 'Estudiante 17' },
    { matricula: 'L531610016', nombre: 'Estudiante 18' },
    { matricula: 'L532410079', nombre: 'Estudiante 19' },
    { matricula: 'L532410080', nombre: 'Estudiante 20' },
    { matricula: 'L532410081', nombre: 'Estudiante 21' },
    { matricula: 'L532410082', nombre: 'Estudiante 22' },
    { matricula: 'L532410083', nombre: 'Estudiante 23' },
    { matricula: 'L532410070', nombre: 'Estudiante 24' },
    { matricula: 'L532410084', nombre: 'Estudiante 25' },
    { matricula: 'L532410166', nombre: 'Estudiante 26' }
  ];

  private resumenCompetencias = [
    {
      nombreMateria: 'Seguridad en el desarrollo de aplicaciones',
      competencia: 1,
      num10: 5, num9: 17, num8: 3, num7: 1, num6: 0, SinCal: 0
    },
    {
      nombreMateria: 'Seguridad en el desarrollo de aplicaciones',
      competencia: 2,
      num10: 12, num9: 9, num8: 4, num7: 0, num6: 1, SinCal: 0
    },
    {
      nombreMateria: 'Planeación y organización del trabajo',
      competencia: 1,
      num10: 3, num9: 11, num8: 12, num7: 0, num6: 0, SinCal: 0
    },
    {
      nombreMateria: 'Planeación y organización del trabajo',
      competencia: 2,
      num10: 6, num9: 6, num8: 14, num7: 0, num6: 0, SinCal: 0
    },
    {
      nombreMateria: 'Planeación y organización del trabajo',
      competencia: 3,
      num10: 19, num9: 5, num8: 2, num7: 0, num6: 0, SinCal: 0
    }
  ];

  generarConteoCalificaciones() {
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const verde = '#198754';

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(verde);
    pdf.text('UNIVERSIDAD TECNOLÓGICA DEL SUR DE SONORA', 105, 20, { align: 'center' });

    pdf.setFontSize(14);
    pdf.text('REPORTE DE CONTEO DE CALIFICACIONES', 105, 30, { align: 'center' });
    pdf.text('GRUPO: IDYGS8A', 105, 40, { align: 'center' });

    const ahora = new Date();
    pdf.setFontSize(10);
    pdf.setTextColor(0);
    pdf.text(`Fecha: ${ahora.toLocaleDateString()}   Hora: ${ahora.toLocaleTimeString()}`, 105, 50, { align: 'center' });

    let y = 70;
    pdf.setFontSize(10);
    pdf.setFillColor(230, 247, 237);
    pdf.rect(10, y - 10, 190, 8, 'F');
    pdf.setTextColor(0);
    pdf.text('Competencia', 15, y - 5);
    pdf.text('10', 50, y - 5);
    pdf.text('9', 65, y - 5);
    pdf.text('8', 80, y - 5);
    pdf.text('7', 95, y - 5);
    pdf.text('6', 110, y - 5);
    pdf.text('Sin Cal.', 140, y - 5);
    y += 5;

    let materiaActual = '';
    const totales = { num10: 0, num9: 0, num8: 0, num7: 0, num6: 0, SinCal: 0 };

    this.resumenCompetencias.forEach(item => {
      if (materiaActual !== item.nombreMateria) {
        materiaActual = item.nombreMateria;
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(verde);
        pdf.text(`Materia: ${materiaActual}`, 15, y);
        y += 7;
      }

      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0);
      pdf.text(`Comp ${item.competencia}`, 15, y);
      pdf.text(item.num10.toString(), 50, y);
      pdf.text(item.num9.toString(), 65, y);
      pdf.text(item.num8.toString(), 80, y);
      pdf.text(item.num7.toString(), 95, y);
      pdf.text(item.num6.toString(), 110, y);
      pdf.text(item.SinCal.toString(), 140, y);

      totales.num10 += item.num10;
      totales.num9 += item.num9;
      totales.num8 += item.num8;
      totales.num7 += item.num7;
      totales.num6 += item.num6;
      totales.SinCal += item.SinCal;

      y += 6;
    });

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(verde);
    pdf.text('TOTAL GENERAL', 15, y + 10);
    pdf.text(totales.num10.toString(), 50, y + 10);
    pdf.text(totales.num9.toString(), 65, y + 10);
    pdf.text(totales.num8.toString(), 80, y + 10);
    pdf.text(totales.num7.toString(), 95, y + 10);
    pdf.text(totales.num6.toString(), 110, y + 10);
    pdf.text(totales.SinCal.toString(), 140, y + 10);

    pdf.setFontSize(8);
    pdf.setTextColor(0);
    pdf.text('Página 1 de 1', 105, 280, { align: 'center' });

    pdf.save('conteo_calificaciones_IDYGS8A.pdf');
    this.onGenerarPDF.emit('conteo_calificaciones');
  }

  generarListaAsistencia() {
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const verde = '#198754';

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(verde);
    pdf.text('UNIVERSIDAD TECNOLÓGICA DEL SUR DE SONORA', 105, 20, { align: 'center' });

    pdf.setFontSize(14);
    pdf.text('LISTA DE ASISTENCIA', 105, 30, { align: 'center' });
    pdf.text('GRUPO: IDYGS8A', 105, 40, { align: 'center' });

    const ahora = new Date();
    pdf.setFontSize(10);
    pdf.setTextColor(0);
    pdf.text(`Fecha: ${ahora.toLocaleDateString()}`, 105, 50, { align: 'center' });

    let y = 70;
    let page = 1;
    const porPagina = 20;

    pdf.setFontSize(10);
    pdf.setFillColor(230, 247, 237);
    pdf.rect(10, y - 10, 190, 8, 'F');
    pdf.setTextColor(0);
    pdf.text('No.', 15, y - 5);
    pdf.text('Matrícula', 30, y - 5);
    pdf.text('Nombre', 70, y - 5);
    pdf.text('Firma', 160, y - 5);

    y += 5;

    this.estudiantes.forEach((est, i) => {
      pdf.setFont('helvetica', 'normal');
      pdf.text((i + 1).toString(), 15, y);
      pdf.text(est.matricula, 30, y);
      pdf.text(est.nombre, 70, y);
      pdf.line(160, y - 2, 190, y - 2);
      y += 8;

      if ((i + 1) % porPagina === 0 && i < this.estudiantes.length - 1) {
        pdf.setFontSize(8);
        pdf.text(`Página ${page}`, 105, 280, { align: 'center' });
        pdf.addPage();
        page++;
        y = 20;
        pdf.setFillColor(230, 247, 237);
        pdf.rect(10, y - 10, 190, 8, 'F');
        pdf.text('No.', 15, y - 5);
        pdf.text('Matrícula', 30, y - 5);
        pdf.text('Nombre', 70, y - 5);
        pdf.text('Firma', 160, y - 5);
        y += 5;
      }
    });

    pdf.setFontSize(8);
    pdf.text(`Página ${page}`, 105, 280, { align: 'center' });
    pdf.save('lista_asistencia_IDYGS8A.pdf');
    this.onGenerarPDF.emit('lista_asistencia');
  }

  generarConcentradoCalificaciones() {
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const verde = '#198754';

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(verde);
    pdf.text('UNIVERSIDAD TECNOLÓGICA DEL SUR DE SONORA', 148, 15, { align: 'center' });

    pdf.setFontSize(14);
    pdf.text('CONCENTRADO DE CALIFICACIONES', 148, 25, { align: 'center' });
    pdf.text('CUATRIMESTRE ENERO-ABRIL 2025', 148, 35, { align: 'center' });
    pdf.text('GRUPO: IDYGS8A', 148, 45, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text('CARRERA: Ingeniería en Desarrollo y Gestión de Software', 148, 55, { align: 'center' });

    let y = 70;
    pdf.setFontSize(10);
    pdf.setFillColor(230, 247, 237);
    pdf.rect(10, y - 10, 277, 8, 'F');
    pdf.setTextColor(0);
    pdf.text('No.', 15, y - 5);
    pdf.text('Matrícula', 30, y - 5);
    pdf.text('Nombre', 80, y - 5);
    pdf.text('Promedio', 200, y - 5);
    pdf.text('Estatus', 240, y - 5);
    y += 5;

    this.estudiantes.forEach((est, i) => {
      const promedio = Math.floor(Math.random() * 30) + 70;
      pdf.setFont('helvetica', 'normal');
      pdf.text((i + 1).toString(), 15, y);
      pdf.text(est.matricula, 30, y);
      pdf.text(est.nombre, 80, y);
      pdf.text(promedio.toString(), 200, y);
      pdf.text(promedio >= 70 ? 'APROBADO' : 'REPROBADO', 240, y);
      y += 7;
    });

    pdf.save('concentrado_calificaciones_IDYGS8A.pdf');
    this.onGenerarPDF.emit('concentrado_calificaciones');
  }

  generarPDF(contenidoId: string, nombreArchivo: string) {
    const element = document.getElementById(contenidoId);
    if (!element) {
      alert('No se encontró el contenido para el PDF.');
      return;
    }

    element.style.display = 'block';

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(nombreArchivo);

      element.style.display = 'none';
    }).catch((error: any) => {
      alert('Error al generar el PDF: ' + error);
      element.style.display = 'none';
    });
  }

  // Métodos para otros botones
  generarListaUsuarios() {
    this.onGenerarPDF.emit('lista_usuarios');
    console.log('Generando lista de usuarios...');
  }

  generarTutoresPorGrupo() {
    this.onGenerarPDF.emit('tutores_grupo');
    console.log('Generando tutores por grupo...');
  }

  generarTableroIndicadores() {
    this.onGenerarPDF.emit('tablero_indicadores');
    console.log('Generando tablero de indicadores...');
  }

  generarAlumnosReportados() {
    this.onGenerarPDF.emit('alumnos_reportados');
    console.log('Generando alumnos reportados...');
  }

  generarTutoriasIndividuales() {
    this.onGenerarPDF.emit('tutorias_individuales');
    console.log('Generando tutorías individuales...');
  }

  generarReportesGrupales() {
    this.onGenerarPDF.emit('reportes_grupales');
    console.log('Generando reportes grupales...');
  }

  generarEvaluacionTutor() {
    this.onGenerarPDF.emit('evaluacion_tutor');
    console.log('Generando evaluación de tutor...');
  }

  generarInformeTutores() {
    this.onGenerarPDF.emit('informe_tutores');
    console.log('Generando informe de tutores...');
  }

  generarEstadoCuestionarios() {
    this.onGenerarPDF.emit('estado_cuestionarios');
    console.log('Generando estado de cuestionarios...');
  }

  generarTutoriasGrupales() {
    this.onGenerarPDF.emit('tutorias_grupales');
    console.log('Generando tutorías grupales...');
  }

  generarAsesoriaAcademica() {
    this.onGenerarPDF.emit('asesoria_academica');
    console.log('Generando asesoría académica...');
  }
}