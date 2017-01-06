import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { HeatmapService } from './heatmap.service';



@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeatmapChartComponent implements OnInit {

  @ViewChild('heatmapchart') private chartContainer: ElementRef;
  @ViewChild('rect') private card: any;
  @Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 20, left: 100, right: 10 };
  private chart: any;
  private width: number;
  private height: number;
  private colors: any;
  private gridSize: number;
  private legendElementWidth: number;
  private buckets: number;
  private days: any;
  private times: any;
  private colorScale: any;
  private legend: any;
  private cards: any;
  private svg: any;
  private element: any;

  constructor(private _dataService: HeatmapService) {

  }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      // this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      // this.updateChart();
    }
  }

  createChart() {
    this.initSvg();
    this.drawLabels();
    this.drawCards();
    this.drawLegend();
  }

  responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style('width')),
      height = parseInt(svg.style('height')),
      aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on('resize.' + container.attr('id'), resize);

    // get width of container and resize svg to fit it
    function resize() {
      var targetWidth = parseInt(container.style('width'));
      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth / aspect));
    }
  }

  initSvg() {
    this.element = this.chartContainer.nativeElement;
    this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
    this.height = 1000;
    this.days = d3.timeDays(new Date(2016, 9, 1), new Date(2016, 10, 1));
    this.times = d3.timeHours(new Date(2016, 9, 1), new Date(2016, 9, 2));
    this.gridSize = Math.floor(this.width / 24);
    this.legendElementWidth = this.gridSize * 2;
    this.buckets = 9;
    this.colorScale = d3.scaleSequential(d3.interpolateRgb('rgb(255,255,255)', 'rgb(255,0,0)'))
      .domain([0, d3.max(this.data, d => d.v)]);

    this.svg = d3.select(this.element).append('svg')
      .attr('width', this.element.offsetWidth)
      .attr('height', 1050)
      .call(this.responsivefy);
  }

  drawLabels() {
    let dayLabels = this.svg.selectAll('.dayLabel')
      .data(this.days)
      .enter().append('text')
      .text((d, i) => d3.timeFormat('%d/%m/%Y')(this.days[i]))
      .attr('x', 0)
      .attr('y', (d, i) => i * this.days.length)
      .style('text-anchor', 'end')
      .style('fill', 'black')
      .attr('transform', 'translate(-6,' + this.days.length / 1.5 + ')')
      .attr('class', (d, i) =>
        (i >= 0 && i <= 4)
          ?
          'dayLabel mono axis axis-workweek' : 'dayLabel mono axis');

    let timeLabels = this.svg.selectAll('.timeLabel')
      .data(this.times)
      .enter().append('text')
      .text((d, i) => d3.timeFormat('%H')(this.times[i]))
      .attr('x', (d, i) => i * this.gridSize)
      .attr('y', 0)
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .attr('transform', 'translate(' + this.gridSize / 2 + ', -6)')
      .attr('class',
      (d, i) => ((i >= 7 && i <= 16)
        ?
        'timeLabel mono axis axis-worktime' : 'timeLabel mono axis'));
  }

  drawCards() {

    let tip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    this.cards = this.svg.selectAll('.hour')
      .data(this.data,
      d => new Date(parseInt((d.d).substr(6, 24))).getDay() +
        ':'
        + new Date(parseInt((d.d).substr(6, 24))).getHours());

    this.cards.append('title');

    this.cards.enter().append('rect')
      .attr('x', d => (new Date(parseInt((d.d).substr(6))).getHours()) * this.gridSize)
      .attr('y', d => (new Date(parseInt((d.d).substr(6))).getDate() - 1) * this.days.length)
      .attr('class', 'hour bordered')
      .attr('width', this.gridSize)
      .attr('height', this.days.length)
      .style('fill', d => this.colorScale(d.v))
      .on('mouseout', function (d) {
        tip.style('display', 'none');
      })
      .on('mouseover', function (d) {
        // TODO :
        // d3.select(this)
        // .attr('border', '2px solid black');
        tip.transition()
          .duration(200)
          .style('opacity', .9)
          .style('display', 'block');
        tip.html('Date : ' +
          d3.timeFormat('%d/%m/%Y')(
            new Date(parseInt((d.d).substr(6)))) +
          '</br> Heurs : ' +
          d3.timeFormat('%H')(
            new Date(parseInt((d.d).substr(6)))) + 'h ' +
          '</br> ' +
          d.v.toPrecision(4) + ' kWh')
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
          .style('background', d3.event.target.style.fill);
      });


    this.cards.transition().duration(1000)
      .style('fill', d => this.colorScale(d.v));

    this.cards.select('title').text(d => d.v);

    this.cards.exit().remove();
  }

  drawLegend() {

    let numStops = 10;
    let countRange = this.colorScale.domain();
    countRange[2] = countRange[1] - countRange[0];
    let countPoint = [];
    for (var i = 0; i < numStops; i++) {
      countPoint.push(i * countRange[2] / (numStops - 1) + countRange[0]);
    }

    this.svg.append('defs')
      .append('linearGradient')
      .attr('id', 'legend-consommation')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '0%')
      .selectAll('stop')
      .data(d3.range(numStops))
      .enter().append('stop')
      .attr('offset', (d, i) => countPoint[i] / numStops)
      .attr('stop-color', (d, i) => this.colorScale(countPoint[i]));

    this.legend = this.svg.selectAll('.legend')
      .data([0])
      .enter()
      .append('g')
      .attr('class', 'legend');

    this.legend.append('rect')
      .attr('x', 0)
      .attr('y', this.height - 30)
      .attr('width', this.legendElementWidth)
      .attr('height', this.gridSize / 2)
      .style('fill', 'url(#legend-consommation)');


    let xScale = d3.scaleLinear()
      .range([-this.legendElementWidth / 2, this.legendElementWidth / 2])
      .domain([0, d3.max(this.data, d => d.v)]);

    //Define x-axis
    let xAxis = d3.axisBottom(xScale).ticks(6);

    this.legend.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(63,' + (this.height) + ')')
      .call(xAxis);

    this.legend.exit().remove();


  }
}
