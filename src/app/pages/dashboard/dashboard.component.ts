import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardButtonsPanelComponent } from './dashboard-buttons-panel/dashboard-buttons-panel.component';
import { DashboardTablePanelComponent } from './dashboard-table-panel/dashboard-table-panel.component';
import { PageContentComponent } from "../../layouts/main-layout/components";

export interface Usuario {
  matricula: string;
  nombre: string;
  grupo: string;
  nivel: string;
  kardex: string;
  boleta: string;
  asppper: string;
  expclin: string;
  evatutor: string;
  aluvul: string;
  numRep: number;
  canalizar: string;
  entrevista: string;
  calificaciones: {
    materia: string;
    calificacion: number;
  }[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardButtonsPanelComponent, DashboardTablePanelComponent, PageContentComponent],
  template: `
    <app-page-content pageTitle="Dashboard">
      <app-dashboard-buttons-panel 
        [usuarios]="usuarios"
        (onGenerarPDF)="handleGenerarPDF($event)">
      </app-dashboard-buttons-panel>
      <app-dashboard-table-panel 
        [usuarios]="usuarios"
        [filteredUsuarios]="filteredUsuarios"
        (onFiltrar)="handleFiltrar($event)">
      </app-dashboard-table-panel>
    </app-page-content>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  usuarios: Usuario[] = [
    {
      matricula: '2023001',
      nombre: 'Juan Pérez',
      grupo: 'Grupo A',
      nivel: 'INGENIERÍA',
      kardex: 'K-123',
      boleta: 'B-12345',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 0,
      canalizar: 'Pendiente',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 9.5 },
        { materia: 'Programación', calificacion: 8.7 },
        { materia: 'Base de datos', calificacion: 9.0 }
      ]
    },
    {
      matricula: '2023002',
      nombre: 'Ana García López',
      grupo: 'Grupo B',
      nivel: 'TÉCNICO SUPERIOR UNIVERSITARIO',
      kardex: 'K-234',
      boleta: 'B-23456',
      asppper: 'Aprobado',
      expclin: 'Pendiente',
      evatutor: 'Pendiente',
      aluvul: 'Sí',
      numRep: 1,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 8.0 },
        { materia: 'Programación', calificacion: 9.2 },
        { materia: 'Base de datos', calificacion: 8.5 }
      ]
    },
    {
      matricula: '2023003',
      nombre: 'Carlos Rodríguez Sánchez',
      grupo: 'Grupo A',
      nivel: 'INGENIERÍA',
      kardex: 'K-345',
      boleta: 'B-34567',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Reprobado',
      aluvul: 'No',
      numRep: 2,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 7.0 },
        { materia: 'Programación', calificacion: 6.5 },
        { materia: 'Base de datos', calificacion: 7.8 }
      ]
    },
    {
      matricula: '2023004',
      nombre: 'María Fernanda Castillo',
      grupo: 'Grupo C',
      nivel: 'LICENCIAS PROFESIONALES',
      kardex: 'K-456',
      boleta: 'B-45678',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 0,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 9.8 },
        { materia: 'Programación', calificacion: 9.5 },
        { materia: 'Base de datos', calificacion: 9.2 }
      ]
    },
    {
      matricula: '2023005',
      nombre: 'Roberto Jiménez Ruiz',
      grupo: 'Grupo B',
      nivel: 'TÉCNICO SUPERIOR UNIVERSITARIO',
      kardex: 'K-567',
      boleta: 'B-56789',
      asppper: 'Aprobado',
      expclin: 'Pendiente',
      evatutor: 'Aprobado',
      aluvul: 'Sí',
      numRep: 3,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 8.5 },
        { materia: 'Programación', calificacion: 7.8 },
        { materia: 'Base de datos', calificacion: 8.0 }
      ]
    },
    // Usuarios adicionales
    {
      matricula: '2023006',
      nombre: 'Laura Mendoza Ortiz',
      grupo: 'Grupo A',
      nivel: 'INGENIERÍA',
      kardex: 'K-678',
      boleta: 'B-67890',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 1,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 8.8 },
        { materia: 'Programación', calificacion: 9.0 },
        { materia: 'Base de datos', calificacion: 8.7 }
      ]
    },
    {
      matricula: '2023007',
      nombre: 'Miguel Ángel Torres',
      grupo: 'Grupo D',
      nivel: 'LICENCIAS PROFESIONALES',
      kardex: 'K-789',
      boleta: 'B-78901',
      asppper: 'Pendiente',
      expclin: 'Pendiente',
      evatutor: 'Pendiente',
      aluvul: 'Sí',
      numRep: 2,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 7.2 },
        { materia: 'Programación', calificacion: 6.8 },
        { materia: 'Base de datos', calificacion: 7.5 }
      ]
    },
    {
      matricula: '2023008',
      nombre: 'Sofía Ramírez Gómez',
      grupo: 'Grupo C',
      nivel: 'TÉCNICO SUPERIOR UNIVERSITARIO',
      kardex: 'K-890',
      boleta: 'B-89012',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 0,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 9.3 },
        { materia: 'Programación', calificacion: 9.1 },
        { materia: 'Base de datos', calificacion: 9.4 }
      ]
    },
    {
      matricula: '2023009',
      nombre: 'Javier López Morales',
      grupo: 'Grupo B',
      nivel: 'INGENIERÍA',
      kardex: 'K-901',
      boleta: 'B-90123',
      asppper: 'Aprobado',
      expclin: 'Pendiente',
      evatutor: 'Reprobado',
      aluvul: 'Sí',
      numRep: 3,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 6.5 },
        { materia: 'Programación', calificacion: 7.0 },
        { materia: 'Base de datos', calificacion: 6.8 }
      ]
    },
    {
      matricula: '2023010',
      nombre: 'Daniela Castro Ruiz',
      grupo: 'Grupo A',
      nivel: 'LICENCIAS PROFESIONALES',
      kardex: 'K-012',
      boleta: 'B-01234',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 0,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 9.6 },
        { materia: 'Programación', calificacion: 9.3 },
        { materia: 'Base de datos', calificacion: 9.7 }
      ]
    },
    {
      matricula: '2023011',
      nombre: 'Alejandro Mendoza Pérez',
      grupo: 'Grupo D',
      nivel: 'TÉCNICO SUPERIOR UNIVERSITARIO',
      kardex: 'K-123',
      boleta: 'B-12345',
      asppper: 'Pendiente',
      expclin: 'Pendiente',
      evatutor: 'Pendiente',
      aluvul: 'Sí',
      numRep: 1,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 7.8 },
        { materia: 'Programación', calificacion: 7.5 },
        { materia: 'Base de datos', calificacion: 8.0 }
      ]
    },
    {
      matricula: '2023012',
      nombre: 'Gabriela Soto Hernández',
      grupo: 'Grupo C',
      nivel: 'INGENIERÍA',
      kardex: 'K-234',
      boleta: 'B-23456',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 0,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 9.1 },
        { materia: 'Programación', calificacion: 9.4 },
        { materia: 'Base de datos', calificacion: 9.2 }
      ]
    },
    {
      matricula: '2023013',
      nombre: 'Ricardo Flores García',
      grupo: 'Grupo B',
      nivel: 'LICENCIAS PROFESIONALES',
      kardex: 'K-345',
      boleta: 'B-34567',
      asppper: 'Aprobado',
      expclin: 'Pendiente',
      evatutor: 'Reprobado',
      aluvul: 'Sí',
      numRep: 2,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 7.3 },
        { materia: 'Programación', calificacion: 6.9 },
        { materia: 'Base de datos', calificacion: 7.1 }
      ]
    },
    {
      matricula: '2023014',
      nombre: 'Isabel Vargas Torres',
      grupo: 'Grupo A',
      nivel: 'TÉCNICO SUPERIOR UNIVERSITARIO',
      kardex: 'K-456',
      boleta: 'B-45678',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 0,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 8.9 },
        { materia: 'Programación', calificacion: 8.7 },
        { materia: 'Base de datos', calificacion: 9.0 }
      ]
    },
    {
      matricula: '2023015',
      nombre: 'Oscar Navarro López',
      grupo: 'Grupo D',
      nivel: 'INGENIERÍA',
      kardex: 'K-567',
      boleta: 'B-56789',
      asppper: 'Pendiente',
      expclin: 'Pendiente',
      evatutor: 'Pendiente',
      aluvul: 'Sí',
      numRep: 3,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 6.7 },
        { materia: 'Programación', calificacion: 7.2 },
        { materia: 'Base de datos', calificacion: 6.9 }
      ]
    },
    {
      matricula: '2023016',
      nombre: 'Patricia Reyes Mendoza',
      grupo: 'Grupo C',
      nivel: 'LICENCIAS PROFESIONALES',
      kardex: 'K-678',
      boleta: 'B-67890',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 1,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 8.6 },
        { materia: 'Programación', calificacion: 8.9 },
        { materia: 'Base de datos', calificacion: 8.7 }
      ]
    },
    {
      matricula: '2023017',
      nombre: 'Fernando Gutiérrez Castro',
      grupo: 'Grupo B',
      nivel: 'TÉCNICO SUPERIOR UNIVERSITARIO',
      kardex: 'K-789',
      boleta: 'B-78901',
      asppper: 'Aprobado',
      expclin: 'Pendiente',
      evatutor: 'Reprobado',
      aluvul: 'Sí',
      numRep: 2,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 7.4 },
        { materia: 'Programación', calificacion: 7.1 },
        { materia: 'Base de datos', calificacion: 7.6 }
      ]
    },
    {
      matricula: '2023018',
      nombre: 'Lucía Díaz Romero',
      grupo: 'Grupo A',
      nivel: 'INGENIERÍA',
      kardex: 'K-890',
      boleta: 'B-89012',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 0,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 9.2 },
        { materia: 'Programación', calificacion: 9.5 },
        { materia: 'Base de datos', calificacion: 9.3 }
      ]
    },
    {
      matricula: '2023019',
      nombre: 'Arturo Silva Hernández',
      grupo: 'Grupo D',
      nivel: 'LICENCIAS PROFESIONALES',
      kardex: 'K-901',
      boleta: 'B-90123',
      asppper: 'Pendiente',
      expclin: 'Pendiente',
      evatutor: 'Pendiente',
      aluvul: 'Sí',
      numRep: 1,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 7.9 },
        { materia: 'Programación', calificacion: 8.2 },
        { materia: 'Base de datos', calificacion: 8.0 }
      ]
    },
    {
      matricula: '2023020',
      nombre: 'Carmen Ortega Flores',
      grupo: 'Grupo C',
      nivel: 'TÉCNICO SUPERIOR UNIVERSITARIO',
      kardex: 'K-012',
      boleta: 'B-01234',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 0,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 8.8 },
        { materia: 'Programación', calificacion: 9.0 },
        { materia: 'Base de datos', calificacion: 8.9 }
      ]
    },
    {
      matricula: '2023021',
      nombre: 'Manuel Juárez Soto',
      grupo: 'Grupo B',
      nivel: 'INGENIERÍA',
      kardex: 'K-123',
      boleta: 'B-12345',
      asppper: 'Aprobado',
      expclin: 'Pendiente',
      evatutor: 'Reprobado',
      aluvul: 'Sí',
      numRep: 3,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 6.8 },
        { materia: 'Programación', calificacion: 7.3 },
        { materia: 'Base de datos', calificacion: 6.9 }
      ]
    },
    {
      matricula: '2023022',
      nombre: 'Adriana Morales Vargas',
      grupo: 'Grupo A',
      nivel: 'LICENCIAS PROFESIONALES',
      kardex: 'K-234',
      boleta: 'B-23456',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 0,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 9.4 },
        { materia: 'Programación', calificacion: 9.6 },
        { materia: 'Base de datos', calificacion: 9.5 }
      ]
    },
    {
      matricula: '2023023',
      nombre: 'Raúl Herrera Navarro',
      grupo: 'Grupo D',
      nivel: 'TÉCNICO SUPERIOR UNIVERSITARIO',
      kardex: 'K-345',
      boleta: 'B-34567',
      asppper: 'Pendiente',
      expclin: 'Pendiente',
      evatutor: 'Pendiente',
      aluvul: 'Sí',
      numRep: 2,
      canalizar: 'Sí',
      entrevista: 'Pendiente',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 7.6 },
        { materia: 'Programación', calificacion: 7.8 },
        { materia: 'Base de datos', calificacion: 7.5 }
      ]
    },
    {
      matricula: '2023024',
      nombre: 'Teresa Ríos Gutiérrez',
      grupo: 'Grupo C',
      nivel: 'INGENIERÍA',
      kardex: 'K-456',
      boleta: 'B-45678',
      asppper: 'Aprobado',
      expclin: 'Completado',
      evatutor: 'Aprobado',
      aluvul: 'No',
      numRep: 1,
      canalizar: 'No',
      entrevista: 'Completada',
      calificaciones: [
        { materia: 'Matemáticas', calificacion: 8.7 },
        { materia: 'Programación', calificacion: 8.9 },
        { materia: 'Base de datos', calificacion: 8.8 }
      ]
    },
    // ... (todos los demás usuarios)
  ];

  filteredUsuarios: Usuario[] = [...this.usuarios];

  constructor() {
    // Inicializar filteredUsuarios con todos los usuarios
    this.filteredUsuarios = [...this.usuarios];
  }

  handleFiltrar(filtros: { grupo: string; nivel: string }) {
    let filtered = [...this.usuarios];
    
    if (filtros.grupo !== 'todos') {
      filtered = filtered.filter(usuario => usuario.grupo === filtros.grupo);
    }

    if (filtros.nivel !== 'todos') {
      filtered = filtered.filter(usuario => usuario.nivel === filtros.nivel);
    }

    this.filteredUsuarios = filtered;
  }

  handleGenerarPDF(tipo: string) {
    // Aquí puedes manejar diferentes tipos de PDF si es necesario
    console.log('Generando PDF de tipo:', tipo);
  }
}