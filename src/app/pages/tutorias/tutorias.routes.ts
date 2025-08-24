// src/app/pages/tutorias/tutorias.routes.ts
import { Permissions as AppPermissions } from '../../core/data';
import { Routes } from '@angular/router';
import { ListaTutoriasGrupalesComponent } from '../access/lista-tutorias-grupales/lista-tutorias-grupales.component';
import { TutoriaGrupalComponent } from './tutoria-grupal/tutoria-grupal.component';
import { EtiquetasFormComponent } from './etiquetas-form/etiquetas-form.component';
export const tutoriasRoutes: Routes = [
  {
    path: '',
    children: [
      
       {
        path: 'dashboarddd',
        component: EtiquetasFormComponent,
        data: { permissions: [AppPermissions.AccessGroupsModule] }
      },
      {
        path: 'lista-tutorias-grupales',
        component: ListaTutoriasGrupalesComponent,
        data: { permissions: [AppPermissions.AccessGroupsModule] }
      },
      {
        path: 'Asignacion-de-tutoriass',
        component: TutoriaGrupalComponent,
        data: { permissions: [AppPermissions.AccessGroupsModule] }
      }
      

    ]
  }
];
