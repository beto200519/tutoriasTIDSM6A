import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { GroupsComponent } from './groups/groups.component';
import { Permissions as AppPermissions } from '../../core/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
 import { ListaTutoriasGrupalesComponent } from './lista-tutorias-grupales/lista-tutorias-grupales.component';
export const accessRoutes: Routes = [
  {
    path: '',
    children: [
     
      {
        path: 'pagina-principal',
        component: DashboardComponent,
        data: { permissions: [AppPermissions.AccessRolesModule] },
      },
      {
        path: 'usuarios',
        data: { permissions: [AppPermissions.AccessUsersModule] },
        children: [
          { path: '', component: UsersComponent },
          { path: 'crear', component: UserFormComponent },
          { path: 'editar/:id', component: UserFormComponent },
        ],
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: { permissions: [AppPermissions.AccessRolesModule] },
      },
      {
        path: 'permisos',
        component: PermissionsComponent,
        data: { permissions: [AppPermissions.AccessPermissionsModule] },
      },
      {
        path: 'grupos',
        component: GroupsComponent,
        data: { permissions: [AppPermissions.AccessGroupsModule] },
      },
      {
  path: 'tutorias-grupales',
  component: ListaTutoriasGrupalesComponent,
  data: { permissions: [AppPermissions.AccessGroupsModule] },
},

     
    ],
  },
];
