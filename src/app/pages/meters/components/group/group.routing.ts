import { Routes, RouterModule } from '@angular/router';
import { GroupComponent} from './group.component'

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    children: [
      {path: 'app-group', component: GroupComponent},
    ]
  }
];

export const GroupRoutes = RouterModule.forChild(routes);
