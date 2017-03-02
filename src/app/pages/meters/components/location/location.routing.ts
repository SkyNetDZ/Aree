import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location.component'

const routes: Routes = [
   {
    path: '',
    component: LocationComponent,
    children: [
      {path: 'app-location', component: LocationComponent},
    ]
  }
];

export const LocationRoutes = RouterModule.forChild(routes);
