import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { DataTableModule} from '../data-table/data-table.module';
// import { ChartModule } from '../chart/chart.module';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
  ],
  declarations: [
    LocationComponent
    ]
})
export class LocationModule { }