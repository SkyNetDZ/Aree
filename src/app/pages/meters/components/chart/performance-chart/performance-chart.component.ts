import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
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

  constructor() { }

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
    this.drawHBar();
  }

  initSvg() {

    let element = this.chartContainer.nativeElement;
    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', 1000)
      .attr('height', 700)
      .attr('transform', 'translate(50,50)');
    
    let y = d3.scaleQuantile().domain([0, 500]).range([500, 0]);

    let maxs = [
      { label: '0 -50', max: 180, color: 'green' },
      { label: '51-90', max: 200, color: 'blue' },
      { label: '91-150', max: 220, color: 'green' },
      { label: '151-230', max: 240, color: 'yellow' },
      { label: '231-330', max: 260, color: 'orange' },
      { label: '331-450', max: 280, color: 'red' },
      { label: '> 450', max: 300, color: 'brown' }
    ];

    this.svg.selectAll('rect')
      .data(maxs)
      .enter()
      .append('rect')
      .attr('y', (d, i) => i * 70)
      .style('width', (d,i) => d.max)
      .style('fill', d => d.color)
      .style('margin-top', 10)
      .style('margin-bottom', 10)
      .style('height', 60)
      .style('border','2px ridge white')
      .attr('class', 'bar');


     this.svg.selectAll('polyline')
      .data(maxs)
      .enter()
      .append('polyline')
      .attr('y', (d, i) => i * 70)
      .style('width', d => d.max)
      .style('fill', d => d.color)
      .style('stroke-width',3)
      .style('stroke','white')
      .attr('points', (d ,i) => 
      ((d.max)+','+ (i*70)+','+
      (20+d.max))+','+((i*140)+60)/2 +','+
      (d.max)+','+((i*70)+60));//(d.max, i * 60),(d.max, i*60 + 50),(50 , (i*60 + 50 + i*60 / 2 )

      this.svg.selectAll('text')
      .data(maxs)
      .enter()
      .append('text')
      .text((d) => d.label)
      .attr('y', (d, i) => (i * 70) + 35)
      .attr('x', 50)
      .style('text-anchor', 'middle')
      .style('fill', 'white');

      this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisRight(y).ticks(10, ''))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'translate(400,0)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');
 }

  drawHBar() {

  }

}
