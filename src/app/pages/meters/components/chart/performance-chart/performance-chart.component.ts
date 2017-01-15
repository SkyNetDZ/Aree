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
  private value: number = 200;
  private y: any;

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
    this.drawIndecator();
  }

  initSvg() {

    let element = this.chartContainer.nativeElement;
    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', 1000)
      .attr('height', 700);

    this.y = d3.scaleQuantile().domain([0, 500]).range([0, 500]);

    let maxs = [
      {label: '0 -50', max: 180, color: 'green', index: 'A'},
      {label: '51-90', max: 200, color: 'blue', index: 'B'},
      {label: '91-150', max: 220, color: 'green', index: 'C'},
      {label: '151-230', max: 240, color: 'yellow', index: 'D'},
      {label: '231-330', max: 260, color: 'orange', index: 'E'},
      {label: '331-450', max: 280, color: 'red', index: 'F'},
      {label: '> 450', max: 300, color: 'brown', index: 'G'}
    ];

    let barh = this.svg.append('g');

    let g = barh.selectAll('g')
      .data(maxs)
      .enter()
      .append('g');

    g
      .append('rect')
      .attr('y', (d, i) => i * 70)
      .style('width', (d, i) => d.max)
      .style('fill', d => d.color)
      .style('margin-top', 10)
      .style('margin-bottom', 10)
      .style('height', 60)
      .style('border', '2px ridge white')
      .attr('class', 'bar');

    g
      .append('polyline')
      .attr('y', (d, i) => i * 70)
      .style('width', d => d.max)
      .style('fill', d => d.color)
      .style('stroke-width', 3)
      .attr('points', (d, i) =>
      ((d.max) + ',' + (i * 70) + ',' +
      (20 + d.max)) + ',' + ((i * 140) + 60) / 2 + ',' +
      (d.max) + ',' + ((i * 70) + 60));

    g
      .append('text')
      .text((d) => d.label)
      .attr('y', (d, i) => (i * 70) + 35)
      .attr('x', 50)
      .style('text-anchor', 'middle')
      .style('fill', 'white');

    g
      .append('text')
      .text((d) => d.index)
      .attr('y', (d, i) => (i * 70) + 35)
      .attr('x', (d, i) => d.max - 20)
      .style('text-anchor', 'middle')
      .style('fill', 'white');


    this.svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + 360 + ',0)')
      .call(d3.axisLeft(this.y).tickSizeInner(0))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'translate(400,0)')
      // .attr('y', 6)
      // .attr('dy', '0.71em')
      .attr('text-anchor', 'end');
  }

  drawIndecator() {
    let indecator = this.svg.append('g');
    indecator
      .append('rect')
      .attr('y', this.y.quantiles() - 30)
      .attr('x', 400)
      .style('width', 100)
      .style('fill', 'white')
      .style('margin-top', 10)
      .style('margin-bottom', 10)
      .style('height', 60)
      .style('border', '2px ridge white')
      .attr('class', 'bar');

    indecator
      .append('polyline')
      .attr('y', this.y.quantiles() - 30)
      .style('width', 100)
      .style('fill', 'white')
      .style('stroke-width', 3)
      .style('stroke', 'white')
      .attr('points', `400,` + (this.y.quantiles() - 30 + 1) + `,370,` + this.y.quantiles() + `,400,` + (30 + parseInt(this.y.quantiles())));

    indecator
      .append('text')
      .text('200')
      .attr('y', 100 + 30)
      .attr('x', 400 + 30)
      .attr('color', 'black');


  }

}
