import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { PageContentComponent } from '../../../layouts/main-layout/components';
import { RouterModule } from '@angular/router';

interface ChartData {
  label: string;
  value: number;
}

interface MetricCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  change?: number;
}

interface Beca {
  tipo: string;
  cantidad: number;
}

interface DiversidadEtnica {
  tipo: string;
  cantidad: number;
  porcentaje: number;
}

interface ProgresoAcademico {
  tipo: string;
  valor: string | number;
}

@Component({
  selector: 'app-director-dashboard',
  standalone: true,
  imports: [CommonModule, PageContentComponent, RouterModule],
  templateUrl: './etiquetas-form.component.html'
})
export class EtiquetasFormComponent implements AfterViewInit {

  @ViewChild('chartTutorias') chartTutorias!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartAtencion') chartAtencion!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartCalificaciones') chartCalificaciones!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartReprobacionCuatrimestre') chartReprobacionCuatrimestre!: ElementRef<HTMLCanvasElement>;

  // Métricas principales (solo 3 tarjetas, eliminando Eficiencia Terminal)
  metrics: MetricCard[] = [
    { title: 'Total Alumnos', value: 1247, icon: 'bi-people', color: 'primary', change: +2.5 },
    { title: 'Total Maestros', value: 48, icon: 'bi-person-badge', color: 'success', change: 0 },
    { title: 'Grupos', value: 42, icon: 'bi-collection', color: 'info', change: +3 }
  ];

  // Estadísticas académicas
  academicStats = [
    { title: 'Aprobados', value: 89, percentage: 89, color: 'success' },
    { title: 'Reprobados', value: 112, percentage: 11, color: 'danger' },
    { title: 'Promedio General', value: 8.2, percentage: 82, color: 'primary' },
    { title: 'Deserción', value: 35, percentage: 3.5, color: 'warning' }
  ];

  // Datos para gráficas
  chartTutoringStatus: ChartData[] = [
    { label: 'Pendientes', value: 15 },
    { label: 'En Proceso', value: 8 },
    { label: 'Completadas', value: 67 }
  ];

  attentionTypes: ChartData[] = [
    { label: 'Asesorías Académicas', value: 45 },
    { label: 'Problemas Personales', value: 28 },
    { label: 'Orientación Vocacional', value: 32 },
    { label: 'Problemas Económicos', value: 19 }
  ];

  calificacionesData: ChartData[] = [
    { label: '6-7', value: 85 },
    { label: '7-8', value: 156 },
    { label: '8-9', value: 289 },
    { label: '9-10', value: 412 }
  ];

  // Nuevos datos para reprobación por cuatrimestre
  reprobacionPorCuatrimestre: ChartData[] = [
    { label: '1°', value: 15 },
    { label: '2°', value: 12 },
    { label: '3°', value: 18 },
    { label: '4°', value: 10 },
    { label: '5°', value: 8 },
    { label: '6°', value: 7 },
    { label: '7°', value: 9 },
    { label: '8°', value: 6 },
    { label: '9°', value: 5 },
    { label: '10°', value: 4 },
    { label: '11°', value: 3 }
  ];

  // Nuevas tablas de indicadores
  becas: Beca[] = [
    { tipo: 'Excelencia Académica', cantidad: 45 },
    { tipo: 'Apoyo Económico', cantidad: 32 },
    { tipo: 'Deportiva', cantidad: 18 },
    { tipo: 'Cultural', cantidad: 12 }
  ];

  diversidadEtnica: DiversidadEtnica[] = [
    { tipo: 'Indígenas', cantidad: 28, porcentaje: 2.2 },
    { tipo: 'Afrodescendientes', cantidad: 45, porcentaje: 3.6 },
    { tipo: 'Otras etnias', cantidad: 37, porcentaje: 3.0 },
    { tipo: 'Sin especificar', cantidad: 1137, porcentaje: 91.2 }
  ];

  progresoAcademico: ProgresoAcademico[] = [
    { tipo: 'Promedio General', valor: 8.2 },
    { tipo: 'Alumnos Destacados (9+)', valor: '32%' },
    { tipo: 'Alumnos en Riesgo', valor: 67 }
  ];

  // Últimas alertas
  alertas = [
    { type: 'warning', message: '5 alumnos con riesgo de baja académica', time: 'Hace 2h' },
    { type: 'danger', message: '3 grupos con reprobación >30%', time: 'Hace 4h' },
    { type: 'info', message: 'Reunión de consejo técnico mañana', time: 'Hace 6h' }
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createCharts();
    }, 100);
  }

  private createCharts(): void {
    // Gráfica de Tutorías
    new Chart(this.chartTutorias.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.chartTutoringStatus.map((d: ChartData) => d.label),
        datasets: [{
          data: this.chartTutoringStatus.map((d: ChartData) => d.value),
          backgroundColor: ['#ffc107', '#17a2b8', '#28a745'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: { position: 'bottom', labels: { padding: 20 } }
        }
      }
    });

    // Gráfica de Tipos de Atención
    new Chart(this.chartAtencion.nativeElement, {
      type: 'bar',
      data: {
        labels: this.attentionTypes.map((d: ChartData) => d.label),
        datasets: [{
          label: 'Cantidad',
          data: this.attentionTypes.map((d: ChartData) => d.value),
          backgroundColor: '#20c997',
          borderWidth: 0,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { beginAtZero: true, grid: { display: false } },
          y: { grid: { display: false } }
        }
      }
    });

    // Gráfica de Calificaciones
    new Chart(this.chartCalificaciones.nativeElement, {
      type: 'pie',
      data: {
        labels: this.calificacionesData.map((d: ChartData) => d.label),
        datasets: [{
          data: this.calificacionesData.map((d: ChartData) => d.value),
          backgroundColor: ['#dc3545', '#ffc107', '#17a2b8', '#28a745'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

    // Gráfica de Reprobación por Cuatrimestre
    new Chart(this.chartReprobacionCuatrimestre.nativeElement, {
      type: 'bar',
      data: {
        labels: this.reprobacionPorCuatrimestre.map((d: ChartData) => d.label),
        datasets: [{
          label: 'Alumnos Reprobados',
          data: this.reprobacionPorCuatrimestre.map((d: ChartData) => d.value),
          backgroundColor: '#6f42c1',
          borderWidth: 0,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { display: false } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Métodos de utilidad
  getChangeIcon(change: number): string {
    return change >= 0 ? 'bi-arrow-up' : 'bi-arrow-down';
  }

  getChangeColor(change: number): string {
    return change >= 0 ? 'text-success' : 'text-danger';
  }

  // Calcular total de becas
  getTotalBecas(): number {
    return this.becas.reduce((total, beca) => total + beca.cantidad, 0);
  }
}