// Angular Imports
import {NgModule} from "@angular/core";
// This Module's Components
import {AreeCellComponent} from "./cell.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AreeCellComponent,
  ],
  exports: [
    AreeCellComponent
  ]
})
export class AreeCellModule {

}
