import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
  HostListener
} from "@angular/core";
import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import {Consumption} from "./data";


@Component({
  selector: 'aree-chart-bar',
  template: require('./charts.html'),
  // changeDetection : changeDetectionStrategy.OnPush

  // styleUrls : ['./charts.scss']
})
export class BarChart implements OnInit {

  public width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private chartBar;

  @Input() chartConfiguration: Object;
  @Input() chartClass: string;
  @Input() chartData: Consumption[];
  @Input() title: string;
  @Output() onChartReady = new EventEmitter<any>();

  @ViewChild('barChart') private _selector: ElementRef;

  constructor() {
  }


  ngOnChanges(changes: SimpleChanges) {
    this.chartData = changes['chartData']['currentValue'];
  }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }


  ngAfterViewInit() {
    this.onChartReady.emit(this.chartBar);
  }

  private initSvg() {
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.chartData.map((d) => this.formatDateChart(d.d)));
    this.y.domain([0, d3Array.max(this.chartData, (d) => d.v)]);
  }

  private drawAxis() {
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));
    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y).ticks(10, ""))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Energy Final (Kwah)");
  }

  private drawBars() {
    this.g.selectAll(".bar")
      .data(this.chartData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => this.x(this.formatDateChart(d.d)))
      .attr("y", (d) => this.y(d.v))
      .attr("width", this.x.bandwidth())
      .attr("height", (d) => this.height - this.y(d.v));
  }

  private formatDateChart(date: string) {
    let dateF = new Date(parseInt(date.substr(6, 24)));
    return dateF.getDay() + '-' + (dateF.getMonth() + 1);
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    console.log(this.width);

  }
}
