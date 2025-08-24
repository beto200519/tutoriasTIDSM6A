import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

interface CuatrimestreModel {
  id: number;
  _Year: number;
  _PeriodDescription: string;
  _Close: boolean;
}

@Component({
  selector: 'app-seleccionar-cuatrimestre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccionar-cuatrimestre.component.html',
  styleUrls: ['./seleccionar-cuatrimestre.component.scss']
})
export class SeleccionarCuatrimestreComponent {
  cuatrimestres: CuatrimestreModel[] = [
    { id: 1, _Year: 2025, _PeriodDescription: 'SEPTIEMBRE-DICIEMBRE', _Close: false },
    { id: 2, _Year: 2025, _PeriodDescription: 'ENERO-ABRIL', _Close: false },
    { id: 3, _Year: 2025, _PeriodDescription: 'MAYO-AGOSTO', _Close: false },
    { id: 4, _Year: 2024, _PeriodDescription: 'ENERO-ABRIL', _Close: true },
    { id: 5, _Year: 2024, _PeriodDescription: 'MAYO-AGOSTO', _Close: true },
    { id: 6, _Year: 2023, _PeriodDescription: 'ENERO-ABRIL', _Close: true },
    { id: 7, _Year: 2023, _PeriodDescription: 'SEPTIEMBRE-DICIEMBRE', _Close: true }
  ];

  filterClose: boolean = false;

  get cuatrimestresFiltrados(): CuatrimestreModel[] {
    return this.cuatrimestres
      .filter((c: CuatrimestreModel) => c._Close === this.filterClose)
      .sort((a, b) => b._Year - a._Year);
  }

  get cuatrimestresCerradosCount(): number {
    return this.cuatrimestres.filter(c => c._Close).length;
  }

  constructor(
    private router: Router,
    private dialogRef: DynamicDialogRef
  ) {}

  cambiarFiltro(close: boolean): void {
    this.filterClose = close;
  }

  seleccionarCuatrimestre(): void {
    this.dialogRef.close();
    this.router.navigate(['/app']);
  }
}
