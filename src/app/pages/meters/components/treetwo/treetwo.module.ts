// Angular Imports
import {NgModule} from '@angular/core';

// This Module's Components
import {TreetwoComponent} from './treetwo.component';
import {NodeModule} from "./component/node/node.module";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    NodeModule,
    CommonModule
  ],
  declarations: [
    TreetwoComponent,
  ],
  exports: [
    TreetwoComponent,
  ]
})
export class TreetwoModule {

}
