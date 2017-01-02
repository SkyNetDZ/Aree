// Angular Imports
import {NgModule} from "@angular/core";
// This Module's Components
import {AreeHeaderComponent} from "./header.component";
import {CommonModule} from "@angular/common";
import {AreeCellModule} from "../cell/cell.module";

@NgModule({
  imports: [
    CommonModule,
    AreeCellModule
  ],
  declarations: [
    AreeHeaderComponent
  ],
  exports: [
    AreeHeaderComponent,
  ]
})
export class AreeHeaderModule {

}
