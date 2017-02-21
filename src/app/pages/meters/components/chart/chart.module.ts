import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HeatmapChartComponent } from './heatmap-chart/heatmap-chart.component';
import { HeatmapService } from './heatmap-chart/heatmap.service';

@NgModule({
  imports: [
    CommonModule,
    NgModule
  ],
  declarations: [
    ChartComponent,
    BarChartComponent,
    LineChartComponent,
    HeatmapChartComponent
  ],
  providers: [
    HeatmapService
  ]
})
export class ChartModule {
}
