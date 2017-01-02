// Angular Imports
import {NgModule} from "@angular/core";
// This Module's Components
import {AreeColumnComponent} from "./column.component";
import {CommonModule} from "@angular/common";
import {AreeCellModule} from "../cell/cell.module";

@NgModule({
  imports: [
    CommonModule,
    AreeCellModule
  ],
  declarations: [
    AreeColumnComponent,
  ],
  exports: [
    AreeColumnComponent,
  ]
})
export class AreeColumnModule {

}
