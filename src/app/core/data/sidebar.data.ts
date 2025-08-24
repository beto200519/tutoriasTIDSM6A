import { SideBarModel } from '../models';
import { Permissions } from './roles-permissions.enum';

export const sideBarData: SideBarModel = {
	groups: [
		{
			text: 'Administración',
			items: [
				{
				text: 'DIRECTOR',
				icon: 'mdi mdi-school',
				permissions: [Permissions.AccessGroupsModule],
				items: [
				{
					text: 'dashboard',
					route: '/app/tutorias/dashboarddd',
					permissions: [Permissions.AccessGroupsModule],
					},
					{
					text: 'Lista Tutorías Grupales',
					route: '/app/tutorias/lista-tutorias-grupales',
					permissions: [Permissions.AccessGroupsModule],
					},
					{
					text: 'Asignacion de tutoria',
					route: '/app/tutorias/Asignacion-de-tutoriass',
					permissions: [Permissions.AccessGroupsModule],
					}
					
				]
				},

				{
					text: 'Acceso',
					icon: 'mdi mdi-account-group',
					permissions: [
						Permissions.AccessUsersModule,
						Permissions.AccessRolesModule,
						Permissions.AccessPermissionsModule,
						Permissions.AccessGroupsModule,
					],
					items: [
							{
							text: 'Pagina Principal',
							route: '/app/accesos/dashboard',
							permissions: [Permissions.AccessUsersModule],
						},
						{
							text: 'Usuarios',
							route: '/app/accesos/usuarios',
							permissions: [Permissions.AccessUsersModule],
						},
						{
							text: 'Roles',
							route: '/app/accesos/roles',
							permissions: [Permissions.AccessRolesModule],
						},
						{
							text: 'Permisos',
							route: '/app/accesos/permisos',
							permissions: [Permissions.AccessPermissionsModule],
						},
						{
							text: 'Grupos',
							route: '/app/accesos/grupos',
							permissions: [Permissions.AccessGroupsModule],
						},
				
					],
				},
			],
		},
		{
			text: 'Cerrar Sesión',
			items: [
				{
					text: 'Salir del Sistema',
					icon: 'fa fa-sign-out-alt',
					onClick: 'logout',
				},
			],
		},
	],
};
