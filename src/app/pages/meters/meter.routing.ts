import {Routes, RouterModule} from "@angular/router";
import {Groups} from "./components/groups/groups.component";
import {Locations} from "./components/locations/locations.component";
import {Meter} from "./meter.component";
import {Meters} from "./components/meters/meters.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Meter,
    children: [
      {path: 'aree-meters', component: Meters},
      {path: 'aree-location', component: Locations},
      {path: 'aree-group', component: Groups}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
