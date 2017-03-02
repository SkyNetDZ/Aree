import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './meter.routing';
import { MetersService } from './components/meters/meters.service';
import { Meters } from './components/meters/meters.component';
import { Meter } from './meter.component';
import { JsonpModule, HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePicker } from './components/datePicker/datePicker.component';
import { Splitter } from './components/splitter/splitter.component';
import { Animate } from './components/animate/animate.component';
import { MultiChartComponent } from './components/multi-chart/multi-chart.component';
import { AreeTreeModule } from './components/tree/tree.module';
import { TableModule } from './components/table/table.module';
import { TableComponent } from './components/table/table.component';
// import {TestComponent} from './components/table/table.component';
import { HeatmapChartComponent } from './components/chart/heatmap-chart/heatmap-chart.component';
import { LineChartComponent } from './components/chart/line-chart/line-chart.component';
import { BarChartComponent } from './components/chart/bar-chart/bar-chart.component';
import { HeatmapService } from './components/chart/heatmap-chart/heatmap.service';
import {PerformanceChartComponent} from './components/chart/performance-chart/performance-chart.component';
import {ConfColumnService} from "./components/table/conf-column/conf-column.service";
import {DataGridComponent} from "./components/dataGrid/dataGrid.component";
import { DataTableModule } from "./components/data-table/data-table.module";
import {LocationModule} from './components/location/location.module';
import { GroupModule} from './components/group/group.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    JsonpModule,
    HttpModule,
    NgbModule.forRoot(),
    AreeTreeModule,
    TableModule,
    DataTableModule,
    LocationModule,
    GroupModule
  ],
  declarations: [
    Meter,
    Meters,
    MultiChartComponent,
    TableComponent,
    BarChartComponent,
    HeatmapChartComponent,
    LineChartComponent,
    PerformanceChartComponent,
    DataGridComponent
  ],
  providers: [
    MetersService,
    HeatmapService
  ]
})
export default class MetersModule {
}
