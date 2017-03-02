import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation, NgZone } from '@angular/core';
import * as d3 from 'd3';

export enum Periods {
  Year = <any>"7",
  Month = <any>"6",
  Week = <any>"5",
  Day = <any>"4",
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class BarChartComponent implements OnInit {

  @ViewChild('barchart') private chartContainer: ElementRef;
  @Input() data: Array<any>;
  @Input() dateStart: string;
  @Input() dateEnd: string;
  @Input() duration: number;
  // dateStart : string = "2016-03-01";
  // dateEnd :string = "2017-03-01";
  // duration = 7;
  period: any = "2";
  periods = [Periods.Day, Periods.Year, Periods.Month, Periods.Week];
  private margin: any = { top: 20, bottom: 20, left: 50, right: 20 };
  private padding: number = 20;
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private timeFormat: string;

  constructor(private ngZone: NgZone) {
    d3.timeFormatDefaultLocale({
      dateTime: "%x, %X",
      date: "%-m/%-d/%Y",
      time: "%-I:%M:%S %p",
      periods: ["AM", "PM"],
      days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      shortDays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      months: ["January", "February", "March", "April", "May", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"],
      shortMonths: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jui", "Aoû", "Sep", "Oct", "Nov", "Dec"]
    });

    window.onresize
      = (e) => {
        ngZone.run(() => {
          this.width = window.innerWidth;
          this.height = window.innerHeight;
          // console.log(this.width);
          // console.log(this.height);
        });
      };
  }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngAfterViewInit(){
    console.log(this.chartContainer)
  }

  ngOnChanges(changes) {
    if (changes.data != null) {
      this.data = changes.data.currentValue;
    }
     if (changes.duration != null) {
      this.duration = changes.duration.currentValue;
    }
    if (this.chart) {
        this.updateChart();
      }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    // let svg = d3.select(element).append('svg')
    //   .attr('width', element.offsetWidth)
    //   .attr('height', element.offsetHeight)
    //   .call(this.responsivefy);

    let svg = d3.select(element).append('svg')
      .attr('width', 1000)
      .attr('height', 400)
      .call(this.responsivefy);
    this.width = +svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +svg.attr("height") - this.margin.top - this.margin.bottom;

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    let xDomain;
    // define X & Y domains
    var today = new Date();
    switch (this.duration) {
      case Periods.Day:
        xDomain = d3.timeHours(new Date(today.getFullYear(), today.getMonth(), today.getDate()), new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
        this.timeFormat = '%H';
        break;
      case Periods.Week:
        xDomain = d3.timeDays(d3.timeMonday(new Date), new Date(d3.timeMonday(new Date).getFullYear(), d3.timeMonday(new Date).getMonth(), d3.timeMonday(new Date).getDate() + 7))
        this.timeFormat = '%A.%d';
        break;
      case Periods.Month:
        xDomain = d3.timeDays(d3.timeMonth(new Date(today.getFullYear(), today.getMonth(), 1)), new Date(today.getFullYear(), today.getMonth() + 1, 2))
        this.timeFormat = '%d.%m';
        break;
      case Periods.Year:
        xDomain = d3.timeMonths(new Date(today.getFullYear(), 0, 1), new Date(today.getFullYear(), 11, 31))
        this.timeFormat = '%m.%Y';
        break;
    }


    this.data = this.groupedDataByTimeFormat(this.data, this.timeFormat);
    console.log(this.data);
    // let xDomain = this.data.map(d => d.key);
    let yDomain = [0, d3.max(this.data, d => d.value)];

    // create scales
    this.xScale = d3.scaleBand().padding(0.2).domain(xDomain).range([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale).tickFormat(d3.timeFormat(this.timeFormat)));

    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));

  }

  updateChart() {
    let xDomain;
    // define X & Y domains
    var today = new Date();
    switch (this.duration) {
      case Periods.Day:
        xDomain = d3.timeHours(new Date(today.getFullYear(), today.getMonth(), today.getDate()), new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
        this.timeFormat = '%H';
        break;
      case Periods.Week:
        xDomain = d3.timeDays(d3.timeMonday(new Date), new Date(d3.timeMonday(new Date).getFullYear(), d3.timeMonday(new Date).getMonth(), d3.timeMonday(new Date).getDate() + 7))
        this.timeFormat = '%A.%d';
        break;
      case Periods.Month:
        xDomain = d3.timeDays(d3.timeMonth(new Date(today.getFullYear(), today.getMonth(), 1)), new Date(today.getFullYear(), today.getMonth() + 1, 2))
        this.timeFormat = '%d.%b';
        break;
      case Periods.Year:
        xDomain = d3.timeMonths(new Date(today.getFullYear(), 0, 1), new Date(today.getFullYear(), 11, 31))
        this.timeFormat = '%b.%Y';
        break;
    }

    this.data = this.groupedDataByTimeFormat(this.data,this.timeFormat);
    let yDomain = [0, d3.max(this.data, d => d.value)];
    this.xScale.domain(xDomain);
    this.yScale.domain([0, d3.max(this.data, d => d.value)]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale).tickFormat(d3.timeFormat(this.timeFormat)));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar')
      .data(this.data);

    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(new Date(parseInt(d.key))))
      .attr('y', d => this.yScale(d.value))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => Math.abs(this.height - this.yScale(d.value)))
      .style('fill', (d, i) => this.colors(i));


    let tip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.xScale(new Date(parseInt(d.key))))
      .attr('y', d => this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', d => Math.abs(this.height - this.yScale(d.value)))
      .on('click', (d) => {
          //this.duration --;
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
            new Date(parseInt((d.key).substr(6)))) + '<br>'
          + d.value.toPrecision(4) + ' kWh')
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
          .style('padding', 5 + 'px')
          .style('background', 'white');
      })
      .transition()
      .delay((d, i) => i * 10)
  }


  // buildDate(date: string) {
  //   if (date != null) {
  //     let dateF = new Date(parseInt(date.substr(6, 24)));
  //     let year = dateF.getFullYear();
  //     let month = dateF.getMonth();
  //     let dated = dateF.getDate();
  //     let hours = dateF.getHours();
  //     return new Date(year, month, dated, hours);
  //   } else {
  //     return date;
  //   }
  // }

  responsivefy(svg) {
    // get container + svg aspect ratio
    let container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style('width')),
      height = parseInt(svg.style('height')),
      aspect = width / height;

    svg.attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize);

    d3.select(window).on('resize.' + container.attr('id'), resize);

    function resize() {
      let targetWidth = parseInt(container.style('width'));
      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth / aspect));
    }
  }


  groupedDataByTimeFormat(data, dateFormat) {
    if(data[0].d != null){
         let groupedData;
    if (dateFormat != null && dateFormat != '') {
      let formatDate = d3.timeFormat(dateFormat);
      groupedData = d3.nest()
        .key((d) => parseInt((d.d).substr(6, 24)))
        .rollup((d) => d3.sum(d, (g) => g.v))
        .entries(data);
    } else {
      groupedData = data;
    }
    return groupedData;
    }else{
      return data;
    }
  }
}
