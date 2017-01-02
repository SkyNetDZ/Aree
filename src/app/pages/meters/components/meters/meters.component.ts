import {Component, ViewEncapsulation, ViewChild} from "@angular/core";
import {MetersService} from "./meters.service";
import {BarChart} from "../charts/charts.component";
import {DragulaService} from "ng2-dragula/ng2-dragula";
import * as d3 from 'd3';

@Component({
  selector: 'aree-meters',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./meters.scss')],
  template: require('./meters.html'),
})

export class Meters {

  @ViewChild('barChart') private chartAnalyse: BarChart;

  meters: any;
  selectedFirst: boolean = true;
  dataConsumption: any;
  dataPower: any;
  dataTemp: any;
  columns: [any] = ['N°', 'Name', 'Unit'];
  chartBarOptions: {
    fullWidth: true,
    height: '600px',
    chartPadding: {
      right: 40
    }
  };
  data = [
    {
      label: 'a1',
      subs: [
        {
          label: 'a11',
          subs: [
            {
              label: 'a111',
              subs: [
                {
                  label: 'a1111'
                },
                {
                  label: 'a1112'
                }
              ]
            },
            {
              label: 'a112'
            }
          ]
        },
        {
          label: 'a12',
        }
      ]
    },
    {
      label: 'b1',
      subs: [
        {
          label: 'b11',
        },
        {
          label: 'b12',
        }
      ]
    }
  ];
  private chartData: Array<any>;
  private dataHeat: Array<any>;
  public checkboxModel = [{
    state: false,
  }];

  public checkboxPropertiesMapping = {
    model: 'state',
    baCheckboxClass: 'class'
  };

  //@HostListener('document: select', ['$event.target'])
  //private updateChart(ev): void {
  //  console.log('update_chart');
  // }

  constructor(private _metersService: MetersService, private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
  }

  ngOnInit() {
    this.loadData();

    this._metersService.loadMeters()
      .subscribe(
        data => this.meters = JSON.parse(JSON.stringify(data)),
        error => console.log(error),
        () => console.log("Finished")
      );
  }

  getConsumption(meter: any) {
    this._metersService.getConsumption(meter)
      .subscribe(
        data => this.dataTemp = JSON.parse(JSON.stringify(data))['Data'][0]['Data'],
        error => console.log(error),
        () => console.log(this.dataTemp)
      );
  }


  getResponsive(padding, offset) {
    return this._metersService.getResponsive(padding, offset);
  }


  //Drag & Drop : traitement
  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }

  private selectionChange($ev) {


  }

  private selectionChangeAll($ev) {

  }


  private loadData() {
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }


  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}
