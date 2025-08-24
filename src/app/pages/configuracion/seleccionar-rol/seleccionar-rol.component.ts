import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SeleccionarCuatrimestreComponent } from '../seleccionar-cuatrimestre/seleccionar-cuatrimestre.component';

@Component({
  selector: 'app-seleccionar-rol',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccionar-rol.component.html',
  styleUrls: ['./seleccionar-rol.component.scss']
})
export class SeleccionarRolComponent {

  // Inyecta los servicios necesarios
  private dialogService = inject(DialogService);
  private dialogRef = inject(DynamicDialogRef); // Esto permite cerrar el diálogo actual

  // Lista de roles disponibles
  roles = [
    { nombre: 'Administrador', icono: 'mdi mdi-account-cog' },
    { nombre: 'Tutor', icono: 'mdi mdi-account-supervisor' },
    { nombre: 'Estudiante', icono: 'mdi mdi-account-school' }
  ];

  // Método que se llama al seleccionar un rol
  seleccionarRol() {
    // Cierra el diálogo actual (este componente está dentro de un diálogo)
    this.dialogRef.close();

    // Abre el siguiente diálogo
    this.dialogService.open(SeleccionarCuatrimestreComponent, {
      width: '1000px',
      styleClass: 'rounded-4',
      modal: true,
      dismissableMask: true,
      showHeader: false
    });
  }
}
