import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class PerformanceChartComponent implements OnInit {

  @ViewChild('performancechart') chartContainer: ElementRef;
  // @Input() data: Array<any>;
  private svg: any;
  private y: any;
  private scale: any;
  private targetAnalyse: any;// nomber of columns
  private heightBar: number = 60; // heightBars
  private title: string = 'Chart Title';
  private defaultColor: any;
  private marginBar = { top: 10, bottom: 10 };
  private targetMeusureCount: number = 3;
  private offsetAxis: number = 360;
  private indecatorWidth: number = 100;
  private indecatorData: [number] = [100, 200, 51];

  //Elements of component
  private table: any;
  private indecators = new Array<any>();
  private chart: any;

  //Data
  private data: Array<any> =
  [
    { label: '< 50', max: 180, color: 50, index: 'A' },//[50,55,7]
    { label: '51-90', max: 200, color: 90, index: 'B' },//[56,61]
    { label: '91-150', max: 220, color: 150, index: 'C' },
    { label: '151-230', max: 240, color: 230, index: 'D' },
    { label: '231-330', max: 260, color: 330, index: 'E' },
    { label: '331-450', max: 280, color: 450, index: 'F' },
    { label: '> 450', max: 300, color: 10000, index: 'G' }
  ];

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
    this.createBars();
    this.createIndecators();
  }


  initSvg() {

    let element = this.chartContainer.nativeElement;
    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', 1000)
      .attr('height', 400)
      .call(this.responsivefy);
  }

  createTable() {
    this.table = this.svg.append('g')
      .append('table');
    let thead = this.table.append('thead');
    let tbody = this.table.append('tbody');

    let columns = ['Title', 'Building', 'Factory'];

    // append the header row
    thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
      .text((column) => column);

    let rows = tbody.append('tr');

    rows.append('td').append('div');
    rows.selectAll('div').append(this.chart);

    // for (let _i = 0; _i < columns.length; _i++) {
    //   rows.append('td').append(this.indecators[_i]);
    // }
  }

  drawIndecator(value: number) {
    let indecator = this.svg.append('g');
    let offsetIndecator = this.offsetAxis + 35;
    indecator
      .append('rect')
      .attr('y', value)
      .attr('x', offsetIndecator)
      .style('width', this.indecatorWidth)
      .style('fill', this.y(value))
      .style('margin-top', 10)
      .style('margin-bottom', 10)
      .style('height', this.heightBar)
      .style('border', '2px ridge white')
      .attr('class', 'bar');

    indecator
      .append('polyline')
      .attr('y', value)
      .style('width', 100)
      .style('fill', this.y(value))
      .attr('points',
      offsetIndecator + `,` + (value + 1)
      + `,` + (offsetIndecator - 30) + `,`
      + (value + 30) + `,` + offsetIndecator
      + `,` + (value + 60));

    indecator
      .append('text')
      .text(value)
      .attr('y', value + (this.heightBar / 2))
      .attr('x', offsetIndecator + 30)
      .style('font-size', 21)
      .style('font-weight', 'bold')
      .attr('color', 'black');

    this.indecators.push(indecator);
    console.log(this.indecators);

  }

  drawAxis( title: string ) {
    this.svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + this.offsetAxis + ',30)')
      .call(d3.axisRight(d3.scaleLinear().domain([0, 500]).range([0, 500])).ticks(0))
      .append('text')
      .text(title)
      .style('font-size', 20)
      .attr('class', 'axis-title')
      .style('color', 'black');
      }

  createBars() {
    let domain = [50, 90, 150, 230, 330, 450, 1000];
    this.scale = d3.scaleLinear().domain(domain).range([0, 500]);

    let generator = d3.scaleLinear()
      .domain([0, (domain.length - 1) / 2, domain.length - 1])
      .range(['green', 'yellow', '#963000'])
      .interpolate(d3.interpolateCubehelix);

    let range = d3.range(domain.length).map(generator);

    console.log(range);

    this.y = d3.scaleQuantile().domain(domain).range(range);

    console.log(this.y(51));
    console.log(this.y.invertExtent("rgb(0, 255, 255)"));
    console.log(d3.quantile(domain, 51));


    let barh = this.svg.append('g')
      .attr('transform', 'translate(10,50)')
      .attr('border', '12px solid black');

    let g = barh.selectAll('g')
      .data(this.data)
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
      .attr('y', (this.data.length + 1) * 70)
      .style('font-size', 20);

    this.chart = barh;
  }

 createIndecators() {
    for (let _i = 0; _i < this.targetMeusureCount; _i++) {
      this.drawAxis('title indecator' + _i);
      this.drawIndecator(this.indecatorData[_i]);
      this.offsetAxis = this.offsetAxis + this.indecatorWidth + 50;
    }
  }

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

}
