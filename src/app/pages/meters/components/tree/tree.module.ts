// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { AreeTreeComponent } from './tree.component';
import { TreeModule } from 'angular2-tree-component';
import { CommonModule } from '@angular/common';
import { AreeCellModule } from './component/cell/cell.module';
import { AreeHeaderModule } from './component/header/header.module';


@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    AreeCellModule,
    AreeHeaderModule
  ],
  declarations: [
    AreeTreeComponent
  ],
  exports: [
    AreeTreeComponent
  ]
})
export class AreeTreeModule {

}
