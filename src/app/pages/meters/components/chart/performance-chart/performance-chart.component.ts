import {Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PerformanceChartComponent implements OnInit {

  @ViewChild('performancechart') chartContainer: ElementRef;
  @Input() data: Array<any>;
  private svg: any;
  private value: number = 100;
  private y: any;
  private scale: any;
  private targetAnalyse: any;// nomber of columns
  private heightBar: number = 60; // heightBars
  private title: string = 'Chart Title';
  private defaultColor: any;
  private marginBar = {top: 10, bottom: 10};
  private targetMeusureCount: number = 3;
  private offsetAxis: number = 360;
  private indecatorWidth: number = 100;

  constructor() {
  }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      // this.updateChart();
    }
  }

  ngOnChanges() {
    // if (this.chart) {
    //   // this.updateChart();
    // }
  }

  createChart() {
    this.initSvg();
    for (var _i = 1; _i < this.targetMeusureCount; _i++) {
      this.offsetAxis = _i * this.offsetAxis;
      this.drawIndecator();
    }

  }

  initSvg() {

    let element = this.chartContainer.nativeElement;
    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', 1000)
      .attr('height', 700);

    let domain = [50, 90, 150, 230, 330, 450, 1000];

    this.scale = d3.scaleLinear().domain(domain).range([0, 500]);

    let generator = d3.scaleLinear()
      .domain([0, (domain.length - 1) / 2, domain.length - 1])
      .range([
        'blue',
        'yellow',
        'brown']
      )
      .interpolate(d3.interpolateCubehelix);

    let range = d3.range(domain.length).map(generator);

    console.log(range);

    this.y = d3.scaleQuantile().domain(domain).range(range);

    console.log(this.y(51));
    console.log(this.y.invertExtent("rgb(0, 255, 255)"));
    console.log(d3.quantile(domain, 51));


    let maxs = [
      {label: '< 50', max: 180, color: 50, index: 'A'},//[50,55,7]
      {label: '51-90', max: 200, color: 90, index: 'B'},//[56,61]
      {label: '91-150', max: 220, color: 150, index: 'C'},
      {label: '151-230', max: 240, color: 230, index: 'D'},
      {label: '231-330', max: 260, color: 330, index: 'E'},
      {label: '331-450', max: 280, color: 450, index: 'F'},
      {label: '> 450', max: 300, color: 10000, index: 'G'}
    ];

    let barh = this.svg.append('g')
      .attr('transform', 'translate(10,50)')
      .attr('border', '12px solid black');

    let g = barh.selectAll('g')
      .data(maxs)
      .enter()
      .append('g');

    g
      .append('rect')
      .attr('y', (d, i) => i * 70)
      .style('width', (d, i) => d.max)
      .style('fill', d => this.y(d.color))
      .style('margin-top', this.marginBar.top)
      .style('margin-bottom', this.marginBar.bottom)
      .style('height', this.heightBar)
      .style('border', '2px ridge white')
      .attr('class', 'bar');

    g
      .append('polyline')
      .attr('y', (d, i) => i * 70)
      .style('width', d => d.max)
      .style('fill', d => this.y(d.color))
      .style('stroke-width', 3)
      .attr('points', (d, i) =>
      ((d.max) + ',' + (i * 70) + ',' +
      (20 + d.max)) + ',' + ((i * 140) + 60) / 2 + ',' +
      (d.max) + ',' + ((i * 70) + 60));

    g
      .append('text')
      .text((d) => d.index + ` (` + d.label + `)`)
      .attr('y', (d, i) => (i * 70) + 35)
      .attr('x', (d, i) => d.max - 50)
      .style('text-anchor', 'middle')
      .style('font-size', 21)
      .style('font-weight', 'bold')
      .style('fill', 'white');

    this.svg.append('text')
      .text(this.title)
      .attr('y', (maxs.length + 1) * 70)
      .style('font-size', 20);

    this.svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + this.offsetAxis + ',30)')
      .call(d3.axisRight(d3.scaleLinear().domain([0, 500]).range([0, 500])).ticks(0))
      .append('text')
      .text('title')
      .attr('class', 'axis-title')
      .attr('text-anchor', 'end');

  }

  drawIndecator() {
    let indecator = this.svg.append('g');
    indecator
      .append('rect')
      .attr('y', this.value)
      .attr('x', this.offsetAxis)
      .style('width', this.indecatorWidth)
      .style('fill', this.y(this.value))
      .style('margin-top', 10)
      .style('margin-bottom', 10)
      .style('height', this.heightBar)
      .style('border', '2px ridge white')
      .attr('class', 'bar');

    indecator
      .append('polyline')
      .attr('y', this.value)
      .style('width', 100)
      .style('fill', this.y(this.value))
      .attr('points', this.offsetAxis + `,` + (this.value + 1) + `,` + (this.offsetAxis - 30) + `,` + (this.value + 30) + `,` + this.offsetAxis + `,` + (this.value + 60));

    indecator
      .append('text')
      .text(this.value)
      .attr('y', this.value + (this.heightBar / 2))
      .attr('x', 400 + 30)
      .style('font-size', 21)
      .style('font-weight', 'bold')
      .attr('color', 'black');

  }

}
