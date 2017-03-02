import {Routes, RouterModule} from "@angular/router";
import {Meter} from "./meter.component";
import {Meters} from "./components/meters/meters.component";
import {LocationComponent} from './components/location/location.component';
import {GroupComponent} from './components/group/group.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Meter,
    children: [
      {path: 'aree-meters', component: Meters},
      {path: 'app-location', component: LocationComponent},
      {path: 'app-group', component: GroupComponent},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
