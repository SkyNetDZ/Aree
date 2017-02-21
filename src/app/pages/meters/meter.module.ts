import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './meter.routing';
import { MetersService } from './components/meters/meters.service';
import { GroupsService } from './components/groups/groups.service';
import { Meters } from './components/meters/meters.component';
import { Locations } from './components/locations/locations.component';
import { Groups } from './components/groups/groups.component';
import { LocationsService } from './components/locations/locations.service';
import { Meter } from './meter.component';
import { JsonpModule, HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BarChart } from './components/charts/charts.component';
import { Filterchart } from './components/filterChart/filterChart.component';
import { FilterChartService } from './components/filterChart/filterChart.service';
import { DatePicker } from './components/datePicker/datePicker.component';
import { Splitter } from './components/splitter/splitter.component';
import { Animate } from './components/animate/animate.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { DragtestComponent } from './components/dragtest/dragtest.component';
import { MultiChartComponent } from './components/multi-chart/multi-chart.component';
import { AreeTreeModule } from './components/tree/tree.module';
import { TableModule } from './components/table/table.module';
import { TableComponent } from './components/table/table.component';
// import {TestComponent} from './components/table/table.component';
import { ChartModule } from './components/chart/chart.module';
import { HeatmapChartComponent } from './components/chart/heatmap-chart/heatmap-chart.component';
import { LineChartComponent } from './components/chart/line-chart/line-chart.component';
import { BarChartComponent } from './components/chart/bar-chart/bar-chart.component';
import { HeatmapService } from './components/chart/heatmap-chart/heatmap.service';
import {PerformanceChartComponent} from './components/chart/performance-chart/performance-chart.component';
import {ConfColumnService} from "./components/table/conf-column/conf-column.service";
import {DataGridComponent} from "./components/dataGrid/dataGrid.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    JsonpModule,
    HttpModule,
    NgbModule.forRoot(),
    DragulaModule,
    AreeTreeModule,
    TableModule
  ],
  declarations: [
    Meter,
    Meters,
    Locations,
    Groups,
    BarChart,
    Filterchart,
    DatePicker,
    Splitter,
    Animate,
    DragtestComponent,
    MultiChartComponent,
    TableComponent,
    BarChartComponent,
    HeatmapChartComponent,
    LineChartComponent,
    PerformanceChartComponent,
    DataGridComponent
    // TestComponent
  ],
  providers: [
    MetersService,
    GroupsService,
    LocationsService,
    FilterChartService,
    HeatmapService
  ]
})
export default class MetersModule {
}
