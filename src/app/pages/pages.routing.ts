import {Routes, RouterModule} from "@angular/router";
import {Pages} from "./pages.component";
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module')},
      {path: 'aree-meter', loadChildren: () => System.import('./meters/meter.module')}
      // {path: 'app-location', loadChildren: () => System.import('./location/location.module')},
      // {path: 'app-group', loadChildren: () => System.import('./group/group.module')}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
