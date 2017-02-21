import {Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation, NgZone} from '@angular/core';
import * as d3 from 'd3';

export enum Periods {
  Year = <any> "1",
  Month = <any> "2",
  Week = <any> "3",
  Day = <any> "4",
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {

  @ViewChild('barchart') private chartContainer: ElementRef;
  @Input() data: Array<any>;
  dateStart = new Date(2015, 0, 1);
  dateEnd = new Date(2015, 11, 31);
  period: any = "2";
  periods = [Periods.Day, Periods.Year, Periods.Month, Periods.Week];
  private margin: any = {top: 20, bottom: 20, left: 50, right: 20};
  private padding: number = 20;
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor(private ngZone: NgZone) {
    window.onresize
      = (e) => {
      ngZone.run(() => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      });
    };
  }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .call(this.responsivefy);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    let xDomain;

    // define X & Y domains
    switch (this.period) {
      case Periods.Day :
        xDomain = d3.timeDays(this.dateStart, this.dateEnd);
        break;
      case Periods.Week :
        xDomain = d3.timeWeeks(this.dateStart, this.dateEnd);
        break;
      case Periods.Month:
        xDomain = d3.timeMonths(this.dateStart, this.dateEnd);
        break;
      case Periods.Year :
        xDomain = d3.timeYears(this.dateStart, this.dateEnd);
        break;
    }

    let yDomain = [0, d3.max(this.data, d => d.v)];

    // create scales
    this.xScale = d3.scaleBand().padding(0.2).domain(xDomain).range([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale).tickFormat(d3.timeFormat('%m/%Y')));

    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));

  }

  updateChart() {
    // update scales & axis
    let xDomain;

    // define X & Y domains
    switch (this.period) {
      case Periods.Day :
        xDomain = d3.timeDays(this.dateStart, this.dateEnd);
        break;
      case Periods.Week :
        xDomain = d3.timeWeeks(this.dateStart, this.dateEnd);
        break;
      case Periods.Month:
        xDomain = d3.timeMonths(this.dateStart, this.dateEnd);
        break;
      case Periods.Year :
        xDomain = d3.timeYears(this.dateStart, this.dateEnd);
        break;
    }

    this.xScale.domain(xDomain);
    this.yScale.domain([0, d3.max(this.data, d => d.v)]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale).tickFormat(d3.timeFormat('%m/%Y')));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar')
      .data(this.data);

    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(this.buildDate(d.d)))
      .attr('y', d => this.yScale(d.v))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => Math.abs(this.height - this.yScale(d.v)))
      .style('fill', (d, i) => this.colors(i));


    let tip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.xScale(this.buildDate(d.d)))
      .attr('y', d => this.yScale(d.v))
      .attr('width', this.xScale.bandwidth())
      .attr('height', d => Math.abs(this.height - this.yScale(d.v)))
      .on('click', (d) => {
        console.log(d.d);
        console.log(d.v)
      })
      .style('fill', (d, i) => this.colors(i))
      .on('mouseout', function (d) {
        tip.style('display', 'none');
      })
      .on('mouseover', function (d) {
        tip.transition()
          .duration(200)
          .style('opacity', .9)
          .style('display', 'block');
        tip.html('Date : ' +
          d3.timeFormat('%d/%m/%Y')(
            new Date(parseInt((d.d).substr(6)))) + '<br>'
          + d.v.toPrecision(4) + ' kWh')
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
          .style('padding', 5 + 'px')
          .style('background', 'white');
      })
      .transition()
      .delay((d, i) => i * 10)
  }


  buildDate(date: string) {
    let dateF = new Date(parseInt(date.substr(6, 24)));
    let year = dateF.getFullYear();
    let month = dateF.getMonth();
    let dated = dateF.getDate();
    return new Date(year, month, dated);
  }

  responsivefy(svg) {
    // get container + svg aspect ratio
    let container = d3.select(svg.node().parentNode),
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
      let targetWidth = parseInt(container.style('width'));
      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth / aspect));
    }
  }

}
