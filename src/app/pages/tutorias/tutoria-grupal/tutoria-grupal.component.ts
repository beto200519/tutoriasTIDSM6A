import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PageContentComponent } from "../../../layouts/main-layout/components";

interface Student {
  matricula: string;
  nombre: string;
  grupo?: string;
}

interface Teacher {
  id: number;
  nombre: string;
  email: string;
}

interface Subject {
  id: number;
  nombre: string;
  codigo: string;
}

interface Group {
  id: number;
  nombre: string;
  semestre: string;
}

interface AdviceModel {
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;
  horas: number;
  horaInicio: string;
  horaFin: string;
  profesorEmail: string;
  materiaId: number;
  grupoId?: number;
  estudiantes?: Student[];
  // Firma de índice más específica
  [key: string]: boolean | number | string | undefined | Student[] | Subject[] | Group[];
}

@Component({
  selector: 'app-tutoria-grupal',
  standalone: true,
  imports: [CommonModule, FormsModule, PageContentComponent],
  templateUrl: './tutoria-grupal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutoriaGrupalComponent implements OnInit {
  // Estados
  isStudentView: boolean = false;
  isLoading: boolean = false;
  
  // Datos
  profesores: Teacher[] = [];
  materias: Subject[] = [];
  grupos: Group[] = [];
  estudiantes: Student[] = [];
  estudiantesSeleccionados: Student[] = [];
  
  // Modelo
  modelo: AdviceModel = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    horas: 1,
    horaInicio: '09:00',
    horaFin: '10:00',
    profesorEmail: '',
    materiaId: 0
  };

  // Días de la semana para iterar - ahora con tipo específico
  diasSemana: { id: string; label: string; selected: boolean }[] = [
    { id: 'lunes', label: 'Lunes', selected: false },
    { id: 'martes', label: 'Martes', selected: false },
    { id: 'miercoles', label: 'Miércoles', selected: false },
    { id: 'jueves', label: 'Jueves', selected: false },
    { id: 'viernes', label: 'Viernes', selected: false },
    { id: 'sabado', label: 'Sábado', selected: false }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarProfesores();
    this.cargarMaterias();
    this.cargarGrupos();
  }

  // === MÉTODOS DE CARGA DE DATOS ===
  cargarProfesores() {
    this.isLoading = true;
    this.http.get<Teacher[]>('Teacher/getTeachers').subscribe({
      next: (data) => {
        this.profesores = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando profesores', error);
        this.isLoading = false;
      }
    });
  }

  cargarMaterias() {
    this.http.get<Subject[]>('Subject/getSubjectByDirector').subscribe({
      next: (data) => this.materias = data,
      error: (error) => console.error('Error cargando materias', error)
    });
  }

  cargarGrupos() {
    this.http.get<Group[]>('Group/getGroupByDirector').subscribe({
      next: (data) => this.grupos = data,
      error: (error) => console.error('Error cargando grupos', error)
    });
  }

  cargarEstudiantes() {
    this.isLoading = true;
    this.http.get<Student[]>('Canalize/getStudent').subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando estudiantes', error);
        this.isLoading = false;
      }
    });
  }

  // === MÉTODOS DE INTERACCIÓN ===
  seleccionarEstudiante(estudiante: Student) {
    const existe = this.estudiantesSeleccionados.find(e => e.matricula === estudiante.matricula);
    if (!existe) {
      this.estudiantesSeleccionados.push({...estudiante});
    }
  }

  removerEstudiante(index: number) {
    this.estudiantesSeleccionados.splice(index, 1);
  }

  toggleDia(dia: { id: string; label: string; selected: boolean }) {
    // Usar una aserción de tipo segura
    const key = dia.id as keyof AdviceModel;
    
    // Verificar que la propiedad existe y es booleana
    if (key in this.modelo && typeof this.modelo[key] === 'boolean') {
      // Hacer el toggle de forma segura con aserción de tipo
      (this.modelo[key] as boolean) = !(this.modelo[key] as boolean);
      dia.selected = this.modelo[key] as boolean;
    }
  }

  // === MÉTODOS DE UTILIDAD ===
  getIniciales(nombre: string): string {
    return nombre
      .split(' ')
      .map(palabra => palabra.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getIconoEstado(valor: boolean): string {
    return valor ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-secondary';
  }

  // === ENVÍO DE DATOS ===
  enviarAsesoria() {
    this.isLoading = true;
    
    if (this.isStudentView) {
      this.modelo.estudiantes = this.estudiantesSeleccionados;
    }

    this.http.post('Director/SaveNewAdvice', this.modelo).subscribe({
      next: (respuesta: any) => this.mostrarExito(respuesta),
      error: (error) => this.mostrarError(error),
      complete: () => this.isLoading = false
    });
  }

  mostrarExito(mensaje: string) {
    console.log('Éxito:', mensaje);
    // Aquí podrías implementar un toast o modal de éxito
  }

  mostrarError(error: any) {
    console.error('Error:', error);
    // Aquí podrías implementar un toast o modal de error
  }

  cambiarVista(esIndividual: boolean) {
    this.isStudentView = esIndividual;
    if (esIndividual) {
      this.cargarEstudiantes();
    }
  }
}