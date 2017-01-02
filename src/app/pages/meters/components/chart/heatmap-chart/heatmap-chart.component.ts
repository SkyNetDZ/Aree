import {Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeatmapChartComponent implements OnInit {

  @ViewChild('chart') private chartContainer: ElementRef;
  // @Input() private data: Array<any>;
  private data: Array<any> =
    [{day: 1, hour: 1, value: 16}, {day: 1, hour: 2, value: 20}, {day: 1, hour: 3, value: 0}, {
      day: 1,
      hour: 4,
      value: 0
    }, {day: 1, hour: 5, value: 0}, {day: 1, hour: 6, value: 2}, {day: 1, hour: 7, value: 0}, {
      day: 1,
      hour: 8,
      value: 9
    }, {day: 1, hour: 9, value: 25}, {day: 1, hour: 10, value: 49}, {day: 1, hour: 11, value: 57}, {
      day: 1,
      hour: 12,
      value: 61
    }, {day: 1, hour: 13, value: 37}, {day: 1, hour: 14, value: 66}, {day: 1, hour: 15, value: 70}, {
      day: 1,
      hour: 16,
      value: 55
    }, {day: 1, hour: 17, value: 51}, {day: 1, hour: 18, value: 55}, {day: 1, hour: 19, value: 17}, {
      day: 1,
      hour: 20,
      value: 20
    }, {day: 1, hour: 21, value: 9}, {day: 1, hour: 22, value: 4}, {day: 1, hour: 23, value: 0}, {
      day: 1,
      hour: 24,
      value: 12
    }, {day: 2, hour: 1, value: 6}, {day: 2, hour: 2, value: 2}, {day: 2, hour: 3, value: 0}, {
      day: 2,
      hour: 4,
      value: 0
    }, {day: 2, hour: 5, value: 0}, {day: 2, hour: 6, value: 2}, {day: 2, hour: 7, value: 4}, {
      day: 2,
      hour: 8,
      value: 11
    }, {day: 2, hour: 9, value: 28}, {day: 2, hour: 10, value: 49}, {day: 2, hour: 11, value: 51}, {
      day: 2,
      hour: 12,
      value: 47
    }, {day: 2, hour: 13, value: 38}, {day: 2, hour: 14, value: 65}, {day: 2, hour: 15, value: 60}, {
      day: 2,
      hour: 16,
      value: 50
    }, {day: 2, hour: 17, value: 65}, {day: 2, hour: 18, value: 50}, {day: 2, hour: 19, value: 22}, {
      day: 2,
      hour: 20,
      value: 11
    }, {day: 2, hour: 21, value: 12}, {day: 2, hour: 22, value: 9}, {day: 2, hour: 23, value: 0}, {
      day: 2,
      hour: 24,
      value: 13
    }, {day: 3, hour: 1, value: 5}, {day: 3, hour: 2, value: 8}, {day: 3, hour: 3, value: 8}, {
      day: 3,
      hour: 4,
      value: 0
    }, {day: 3, hour: 5, value: 0}, {day: 3, hour: 6, value: 2}, {day: 3, hour: 7, value: 5}, {
      day: 3,
      hour: 8,
      value: 12
    }, {day: 3, hour: 9, value: 34}, {day: 3, hour: 10, value: 43}, {day: 3, hour: 11, value: 54}, {
      day: 3,
      hour: 12,
      value: 44
    }, {day: 3, hour: 13, value: 40}, {day: 3, hour: 14, value: 48}, {day: 3, hour: 15, value: 54}, {
      day: 3,
      hour: 16,
      value: 59
    }, {day: 3, hour: 17, value: 60}, {day: 3, hour: 18, value: 51}, {day: 3, hour: 19, value: 21}, {
      day: 3,
      hour: 20,
      value: 16
    }, {day: 3, hour: 21, value: 9}, {day: 3, hour: 22, value: 5}, {day: 3, hour: 23, value: 4}, {
      day: 3,
      hour: 24,
      value: 7
    }, {day: 4, hour: 1, value: 0}, {day: 4, hour: 2, value: 0}, {day: 4, hour: 3, value: 0}, {
      day: 4,
      hour: 4,
      value: 0
    }, {day: 4, hour: 5, value: 0}, {day: 4, hour: 6, value: 2}, {day: 4, hour: 7, value: 4}, {
      day: 4,
      hour: 8,
      value: 13
    }, {day: 4, hour: 9, value: 26}, {day: 4, hour: 10, value: 58}, {day: 4, hour: 11, value: 61}, {
      day: 4,
      hour: 12,
      value: 59
    }, {day: 4, hour: 13, value: 53}, {day: 4, hour: 14, value: 54}, {day: 4, hour: 15, value: 64}, {
      day: 4,
      hour: 16,
      value: 55
    }, {day: 4, hour: 17, value: 52}, {day: 4, hour: 18, value: 53}, {day: 4, hour: 19, value: 18}, {
      day: 4,
      hour: 20,
      value: 3
    }, {day: 4, hour: 21, value: 9}, {day: 4, hour: 22, value: 12}, {day: 4, hour: 23, value: 2}, {
      day: 4,
      hour: 24,
      value: 8
    }, {day: 5, hour: 1, value: 2}, {day: 5, hour: 2, value: 0}, {day: 5, hour: 3, value: 8}, {
      day: 5,
      hour: 4,
      value: 2
    }, {day: 5, hour: 5, value: 0}, {day: 5, hour: 6, value: 2}, {day: 5, hour: 7, value: 4}, {
      day: 5,
      hour: 8,
      value: 14
    }, {day: 5, hour: 9, value: 31}, {day: 5, hour: 10, value: 48}, {day: 5, hour: 11, value: 46}, {
      day: 5,
      hour: 12,
      value: 50
    }, {day: 5, hour: 13, value: 66}, {day: 5, hour: 14, value: 54}, {day: 5, hour: 15, value: 56}, {
      day: 5,
      hour: 16,
      value: 67
    }, {day: 5, hour: 17, value: 54}, {day: 5, hour: 18, value: 23}, {day: 5, hour: 19, value: 14}, {
      day: 5,
      hour: 20,
      value: 6
    }, {day: 5, hour: 21, value: 8}, {day: 5, hour: 22, value: 7}, {day: 5, hour: 23, value: 0}, {
      day: 5,
      hour: 24,
      value: 8
    }, {day: 6, hour: 1, value: 2}, {day: 6, hour: 2, value: 0}, {day: 6, hour: 3, value: 2}, {
      day: 6,
      hour: 4,
      value: 0
    }, {day: 6, hour: 5, value: 0}, {day: 6, hour: 6, value: 0}, {day: 6, hour: 7, value: 4}, {
      day: 6,
      hour: 8,
      value: 8
    }, {day: 6, hour: 9, value: 8}, {day: 6, hour: 10, value: 6}, {day: 6, hour: 11, value: 14}, {
      day: 6,
      hour: 12,
      value: 12
    }, {day: 6, hour: 13, value: 9}, {day: 6, hour: 14, value: 14}, {day: 6, hour: 15, value: 0}, {
      day: 6,
      hour: 16,
      value: 4
    }, {day: 6, hour: 17, value: 7}, {day: 6, hour: 18, value: 6}, {day: 6, hour: 19, value: 0}, {
      day: 6,
      hour: 20,
      value: 0
    }, {day: 6, hour: 21, value: 0}, {day: 6, hour: 22, value: 0}, {day: 6, hour: 23, value: 0}, {
      day: 6,
      hour: 24,
      value: 0
    }, {day: 7, hour: 1, value: 7}, {day: 7, hour: 2, value: 6}, {day: 7, hour: 3, value: 0}, {
      day: 7,
      hour: 4,
      value: 0
    }, {day: 7, hour: 5, value: 0}, {day: 7, hour: 6, value: 0}, {day: 7, hour: 7, value: 0}, {
      day: 7,
      hour: 8,
      value: 0
    }, {day: 7, hour: 9, value: 0}, {day: 7, hour: 10, value: 0}, {day: 7, hour: 11, value: 2}, {
      day: 7,
      hour: 12,
      value: 2
    }, {day: 7, hour: 13, value: 5}, {day: 7, hour: 14, value: 6}, {day: 7, hour: 15, value: 0}, {
      day: 7,
      hour: 16,
      value: 4
    }, {day: 7, hour: 17, value: 0}, {day: 7, hour: 18, value: 2}, {day: 7, hour: 19, value: 10}, {
      day: 7,
      hour: 20,
      value: 7
    }, {day: 7, hour: 21, value: 0}, {day: 7, hour: 22, value: 19}, {day: 7, hour: 23, value: 9}, {
      day: 7,
      hour: 24,
      value: 4
    }];
  private margin: any = {top: 20, bottom: 20, left: 50, right: 20};
  private padding: number = 20;
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

  constructor() {
  }

  ngOnInit() {
    this.createChart();
    // if (this.data) {
    //   // this.updateChart();
    // }
  }

  ngOnChanges() {
    if (this.chart) {
      // this.updateChart();
    }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.gridSize = Math.floor(this.width / 24);
    this.legendElementWidth = this.gridSize * 2;
    this.buckets = 9;
    this.colors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'];
    this.days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    this.times = ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12a', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p', '12p'];

    let data = [];
    d3.tsv('./data/data.tsv', function (error, d) {
      d.forEach(x => {
        data.push(x);
      });
      console.log(JSON.stringify(data));
    });
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', 400);

    // chart plot area
    this.chart = svg.append('g')
    // .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // day and time labels
    let dayLabels = svg.selectAll('.dayLabel')
      .data(this.days)
      .enter().append('text')
      .text((d, i) => '"' + this.days[i] + '"')
      .attr('x', 0)
      .attr('y', (d, i) => i * this.gridSize)
      .style('text-anchor', 'end')
      .style('fill', 'black')
      .attr('transform', 'translate(-6,' + this.gridSize / 1.5 + ')')
      .attr('class', (d, i) => (i >= 0 && i <= 4) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis');

    let timeLabels = svg.selectAll('.timeLabel')
      .data(this.times)
      .enter().append('text')
      .text((d, i) => this.times[i])
      .attr('x', (d, i) => i * this.gridSize)
      .attr('y', 0)
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .attr('transform', 'translate(' + this.gridSize / 2 + ', -6)')
      .attr('class', (d, i) => ((i >= 7 && i <= 16) ? 'timeLabel mono axis axis-worktime' : 'timeLabel mono axis'));

    this.colorScale = d3.scaleQuantile()
      .domain([0, this.buckets - 1, d3.max(this.data, d => d.value)])
      .range(this.colors);

    console.log(this.colorScale.quantiles());

    this.cards = svg.selectAll('.hour')
      .data(this.data, d => d.day + ':' + d.hour);

    this.cards.append('title');

    this.cards.enter().append('rect')
      .attr('x', d => (d.hour - 1) * this.gridSize)
      .attr('y', d => (d.day - 1) * this.gridSize)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('class', 'hour bordered')
      .attr('width', this.gridSize)
      .attr('height', this.gridSize)
      .style('fill', d => this.colorScale(d.value));

    // this.cards.transition().duration(1000)
    //   .style('fill', d => this.colorScale(d.value));

    this.cards.select('title').text(d => d.value);

    this.cards.exit().remove();

    this.legend = svg.selectAll('.legend')
      .data([0].concat(this.colorScale.quantiles()));


    this.legend.enter().append('g')
      .attr('class', 'legend');

    this.legend.append('rect')
      .attr('x', (d, i) => this.legendElementWidth * i)
      .attr('y', this.height)
      .attr('width', this.legendElementWidth)
      .attr('height', this.gridSize / 2)
      .style('fill', (d, i) => this.colors[i]);

    this.legend.append('text')
      .attr('class', 'mono')
      .text(d => '≥ ' + Math.round(d))
      .attr('x', (d, i) => this.legendElementWidth * i)
      .attr('y', this.height + this.gridSize);

    this.legend.exit().remove();

  }
}
