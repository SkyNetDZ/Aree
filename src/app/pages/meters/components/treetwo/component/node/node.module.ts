// Angular Imports
import {NgModule} from '@angular/core';

// This Module's Components
import {NodeComponent} from './node.component';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NodeComponent,
  ],
  exports: [
    NodeComponent,
  ]
})
export class NodeModule {

}
