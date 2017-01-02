import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ChartComponent} from "./chart.component";
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import {LineChartComponent} from "./line-chart/line-chart.component";
import {HeatmapChartComponent} from "./heatmap-chart/heatmap-chart.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChartComponent,
    BarChartComponent,
    LineChartComponent,
    HeatmapChartComponent
  ]
})
export class ChartModule {
}
