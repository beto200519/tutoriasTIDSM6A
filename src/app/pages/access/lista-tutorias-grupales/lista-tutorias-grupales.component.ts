import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageContentComponent } from "../../../layouts/main-layout/components";

interface Student {
  matricula: string;
  nombre: string;
  grupo?: string;
}

interface SelectOption {
  value: string;
  text: string;
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
  materiaId: string;
  grupoId?: string;
  estudiantes?: Student[];
  [key: string]: boolean | number | string | undefined | Student[] | SelectOption[];
}

@Component({
  selector: 'app-tutoria-grupal',
  standalone: true,
  imports: [CommonModule, FormsModule, PageContentComponent],
  templateUrl: './lista-tutorias-grupales.component.html',
  styleUrls: ['./lista-tutorias-grupales.component.scss']
})
export class ListaTutoriasGrupalesComponent implements OnInit {
  // Estados
  isStudentView: boolean = false;
  isLoading: boolean = false;
  
  // Datos hardcodeados
  profesores: SelectOption[] = [
    { value: 'profesor1@email.com', text: 'Dr. Juan Pérez' },
    { value: 'profesor2@email.com', text: 'Dra. María García' },
    { value: 'profesor3@email.com', text: 'Mtro. Carlos López' },
    { value: 'profesor4@email.com', text: 'Mtra. Ana Martínez' }
  ];

  materias: SelectOption[] = [
    { value: '1', text: 'Matemáticas Avanzadas' },
    { value: '2', text: 'Programación Orientada a Objetos' },
    { value: '3', text: 'Bases de Datos' },
    { value: '4', text: 'Inteligencia Artificial' },
    { value: '5', text: 'Desarrollo Web' }
  ];

  grupos: SelectOption[] = [
    { value: '1', text: 'Grupo A - Primer Semestre' },
    { value: '2', text: 'Grupo B - Primer Semestre' },
    { value: '3', text: 'Grupo C - Tercer Semestre' },
    { value: '4', text: 'Grupo D - Quinto Semestre' },
    { value: '5', text: 'Grupo E - Séptimo Semestre' }
  ];

  estudiantes: Student[] = [
    { matricula: '20230001', nombre: 'Ana García López', grupo: 'Grupo A' },
    { matricula: '20230002', nombre: 'Carlos Martínez Ruiz', grupo: 'Grupo A' },
    { matricula: '20230003', nombre: 'María Fernández González', grupo: 'Grupo B' },
    { matricula: '20230004', nombre: 'Juan Rodríguez Sánchez', grupo: 'Grupo B' },
    { matricula: '20230005', nombre: 'Laura Díaz Mendoza', grupo: 'Grupo C' },
    { matricula: '20230006', nombre: 'Pedro Hernández Castro', grupo: 'Grupo C' },
    { matricula: '20230007', nombre: 'Sofía Torres Romero', grupo: 'Grupo D' },
    { matricula: '20230008', nombre: 'Miguel Ángel Vargas', grupo: 'Grupo D' }
  ];

  estudiantesSeleccionados: Student[] = [];
  
  // Horarios disponibles
  horarios = [
    { value: '1', hora: '07:30' },
    { value: '2', hora: '08:20' },
    { value: '3', hora: '09:10' },
    { value: '4', hora: '10:00' },
    { value: '5', hora: '10:50' },
    { value: '6', hora: '11:40' },
    { value: '7', hora: '12:30' },
    { value: '8', hora: '13:20' },
    { value: '9', hora: '14:10' },
    { value: '10', hora: '15:00' },
    { value: '11', hora: '15:50' },
    { value: '12', hora: '16:40' },
    { value: '13', hora: '17:30' },
    { value: '14', hora: '18:20' },
    { value: '15', hora: '19:10' },
    { value: '16', hora: '20:00' },
    { value: '17', hora: '20:50' }
  ];

  // Modelo
  modelo: AdviceModel = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    horas: 1,
    horaInicio: '1',
    horaFin: '2',
    profesorEmail: '',
    materiaId: ''
  };

  // Días de la semana para iterar
  diasSemana = [
    { id: 'lunes', label: 'Lunes', selected: false },
    { id: 'martes', label: 'Martes', selected: false },
    { id: 'miercoles', label: 'Miércoles', selected: false },
    { id: 'jueves', label: 'Jueves', selected: false },
    { id: 'viernes', label: 'Viernes', selected: false },
    { id: 'sabado', label: 'Sábado', selected: false }
  ];

  constructor() {}

  ngOnInit() {
    // No hay llamadas HTTP, todo está hardcodeado
    console.log('Componente inicializado con datos hardcodeados');
  }

  // === MÉTODOS DE UTILIDAD ===
  getIniciales(nombre: string): string {
    if (!nombre) return '';
    return nombre
      .split(' ')
      .map(palabra => palabra.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
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

  toggleDia(dia: any) {
    const key = dia.id as keyof AdviceModel;
    if (key in this.modelo && typeof this.modelo[key] === 'boolean') {
      (this.modelo[key] as boolean) = !(this.modelo[key] as boolean);
      dia.selected = this.modelo[key] as boolean;
    }
  }

  // === ENVÍO DE DATOS (SIMULADO) ===
  enviarAsesoria() {
    this.isLoading = true;
    
    // Simular envío de datos
    setTimeout(() => {
      console.log('Datos a enviar:', {
        ...this.modelo,
        estudiantes: this.isStudentView ? this.estudiantesSeleccionados : undefined
      });
      
      this.mostrarExito('Asesoría guardada exitosamente');
      this.isLoading = false;
    }, 1000);
  }

  mostrarExito(mensaje: string) {
    console.log('Éxito:', mensaje);
    alert(mensaje);
    this.limpiarFormulario();
  }

  mostrarError(error: string) {
    console.error('Error:', error);
    alert(error);
  }

  cambiarVista(esIndividual: boolean) {
    this.isStudentView = esIndividual;
  }

  // Validación para solo números
  soloNumeros(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.modelo = {
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
      horas: 1,
      horaInicio: '1',
      horaFin: '2',
      profesorEmail: '',
      materiaId: ''
    };
    this.estudiantesSeleccionados = [];
    
    // Resetear los días
    this.diasSemana.forEach(dia => dia.selected = false);
  }

  // Método para buscar estudiantes (simulado)
  buscarEstudiantes(termino: string) {
    if (!termino) {
      return this.estudiantes;
    }
    
    return this.estudiantes.filter(estudiante =>
      estudiante.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      estudiante.matricula.includes(termino)
    );
  }

  // Método para filtrar estudiantes en tiempo real
  filtrarEstudiantes(event: Event) {
    const termino = (event.target as HTMLInputElement).value;
    // En una implementación real, aquí filtrarías la lista de estudiantes
    console.log('Buscando estudiantes con término:', termino);
  }
  // Métodos auxiliares para el HTML
getMateriaNombre(materiaId: string): string {
  const materia = this.materias.find(m => m.value === materiaId);
  return materia ? materia.text : '';
}

getGrupoNombre(grupoId?: string): string {
  if (!grupoId) return '';
  const grupo = this.grupos.find(g => g.value === grupoId);
  return grupo ? grupo.text : '';
}

getHorarioNombre(horarioValue: string): string {
  const horario = this.horarios.find(h => h.value === horarioValue);
  return horario ? horario.hora : 'No seleccionado';
}

getDiasSeleccionados(): string {
  const diasSeleccionados = this.diasSemana
    .filter(dia => dia.selected)
    .map(dia => dia.label);
  return diasSeleccionados.length > 0 ? diasSeleccionados.join(', ') : 'Ningún día seleccionado';
}

esFormularioValido(): boolean {
  // Validación básica del formulario
  if (!this.modelo.profesorEmail || !this.modelo.materiaId) {
    return false;
  }
  
  if (!this.isStudentView && !this.modelo.grupoId) {
    return false;
  }
  
  if (this.isStudentView && this.estudiantesSeleccionados.length === 0) {
    return false;
  }
  
  return true;
}
}