import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '../../core/services';
import { PageTextsPipe } from '../../shared/pipes';
import { AppState } from '../../shared/states/app.state';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { InputComponent } from '../../shared/components';
import { CommonModule } from '@angular/common';
import { SeleccionarRolComponent } from '../configuracion/seleccionar-rol/seleccionar-rol.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PageTextsPipe,
    InputComponent
  ],
  providers: [DialogService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credential: string = '';
  password: string = '';
  submitted = false;
  dialogService = inject(DialogService);

  constructor(
    private _auth: AuthService,
    public router: Router,
    private $app: AppState
  ) {}

  ngOnInit(): void {
    this.$app.hideLoading();
  }

  loginSimulated() {
    this.dialogService.open(SeleccionarRolComponent, {
     
    });
  }

  openContactInfo() {
    this.dialogService.open(ContactInfoComponent, {
      header: 'Información de contacto',
      width: '800px',
    });
  }
}
