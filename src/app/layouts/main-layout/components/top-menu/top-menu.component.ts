// src/app/layouts/main-layout/components/top-menu/top-menu.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, UsersService } from '../../../../core/services';
import { AppState } from '../../../../shared/states/app.state';
import { UserState } from '../../../../shared/states/user.state';
import { SeleccionarCuatrimestreComponent } from '../../../../pages/configuracion/seleccionar-cuatrimestre/seleccionar-cuatrimestre.component';
import { SeleccionarRolComponent } from '../../../../pages/configuracion/seleccionar-rol/seleccionar-rol.component';

@Component({
  selector: 'app-top-menu',
  standalone: true, // ✅ debe estar presente
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  imports: [
    RouterLink,
    FormsModule,
    AsyncPipe,
    TitleCasePipe,
  ],
  providers: [DialogService]
})
export class TopMenuComponent {
  private _auth = inject(AuthService);
  private _usr = inject(UsersService);
  public $app = inject(AppState);
  public $user = inject(UserState);
  private dialogService = inject(DialogService);

  logout() {
    this._auth.logOut();
  }

  abrirSeleccionarRol() {
    this.dialogService.open(SeleccionarRolComponent, {
      width: '1000px',
      styleClass: 'rounded-4',
      modal: true,
      dismissableMask: true,
      showHeader: false,
    });
  }
  abrirSeleccionarCuatrimestre() {
    this.dialogService.open(SeleccionarCuatrimestreComponent, {
      width: '1000px',
      styleClass: 'rounded-4',
      modal: true,
      dismissableMask: true,
      showHeader: false,
    });
  }

}
