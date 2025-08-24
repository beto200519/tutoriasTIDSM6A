import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../dashboard.component';

@Component({
  selector: 'app-dashboard-table-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-table-panel.component.html',
  styleUrls: ['./dashboard-table-panel.component.scss']
})
export class DashboardTablePanelComponent {
  @Input() usuarios: Usuario[] = [];
  @Input() filteredUsuarios: Usuario[] = [];
  @Output() onFiltrar = new EventEmitter<{ grupo: string; nivel: string }>();
  
  selectedGroup: string = 'todos';
  selectedLevel: string = 'todos';
  
  grupos: string[] = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D'];
  niveles: string[] = ['TÉCNICO SUPERIOR UNIVERSITARIO', 'INGENIERÍA', 'LICENCIAS PROFESIONALES'];

  // Devuelve iniciales del nombre
  getInitials(nombre: string): string {
    return nombre
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  // Verifica si tiene muchos reportes
  hasManyReports(numRep: number): boolean {
    return numRep >= 2;
  }

  // Devuelve el icono de estado según el valor
  getStatusIcon(valor: string): string {
    switch (valor.toLowerCase()) {
      case 'sí':
      case 'aprobado':
      case 'completado':
        return 'bi-check-circle-fill text-success';
      case 'no':
      case 'reprobado':
      case 'pendiente':
        return 'bi-x-circle-fill text-danger';
      case 'en proceso':
        return 'bi-exclamation-circle-fill text-warning';
      default:
        return 'bi-dash-circle text-secondary';
    }
  }

  // Filtrar por grupo
  filterByGroup() {
    this.onFiltrar.emit({ grupo: this.selectedGroup, nivel: this.selectedLevel });
  }

  // Filtrar por nivel
  filterByLevel() {
    this.onFiltrar.emit({ grupo: this.selectedGroup, nivel: this.selectedLevel });
  }

  // Generar PDF
  generatePDF() {
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();
    
    // Agregar título
    doc.setFontSize(18);
    doc.text('Reporte de Calificaciones', 105, 15, { align: 'center' });
    
    // Información de filtros aplicados
    doc.setFontSize(12);
    let filterInfo = 'Todos los estudiantes';
    
    if (this.selectedGroup !== 'todos' || this.selectedLevel !== 'todos') {
      filterInfo = 'Filtros aplicados: ';
      if (this.selectedGroup !== 'todos') filterInfo += `Grupo: ${this.selectedGroup} `;
      if (this.selectedLevel !== 'todos') filterInfo += `Nivel: ${this.selectedLevel}`;
    }
    
    doc.text(filterInfo, 105, 22, { align: 'center' });
    
    // Agregar fecha de generación
    const now = new Date();
    doc.setFontSize(10);
    doc.text(`Generado el: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 105, 28, { align: 'center' });
    
    let yPosition = 40;
    
    // Para cada usuario, agregar su información
    this.filteredUsuarios.forEach((usuario, index) => {
      // Si no hay suficiente espacio, agregar nueva página
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Información del estudiante
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`Estudiante: ${usuario.nombre} (${usuario.matricula})`, 14, yPosition);
      doc.setFont(undefined, 'normal');
      
      yPosition += 7;
      doc.text(`Grupo: ${usuario.grupo} | Nivel: ${usuario.nivel}`, 14, yPosition);
      
      yPosition += 7;
      doc.text('Calificaciones:', 14, yPosition);
      
      yPosition += 5;
      // Tabla de calificaciones
      usuario.calificaciones.forEach(cal => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`  - ${cal.materia}: ${cal.calificacion}`, 20, yPosition);
        yPosition += 5;
      });
      
      yPosition += 10;
      
      // Línea separadora
      doc.line(14, yPosition, 196, yPosition);
      yPosition += 15;
    });
    
    // Guardar el PDF
    doc.save(`reporte-calificaciones-${new Date().getTime()}.pdf`);
  }
}