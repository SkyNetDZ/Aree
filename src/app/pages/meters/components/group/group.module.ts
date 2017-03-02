import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { DataTableModule} from '../data-table/data-table.module';
// import { ChartModule } from '../chart/chart.module';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule
  ],
  declarations: [GroupComponent]
})
export class GroupModule { }