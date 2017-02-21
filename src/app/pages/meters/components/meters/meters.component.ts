import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {MetersService} from './meters.service';
import {BarChart} from '../charts/charts.component';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
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

  public dataTemp: [any];

  // public dataTemp = [
  //   {
  //     "d": "/Date(1420066800000+0100)/",
  //     "v": 55.002222222222144
  //   },
  //   {
  //     "d": "/Date(1420066800000+0100)/",
  //     "i": 1,
  //     "v": 481.8024999999998
  //   },
  //   {
  //     "d": "/Date(1420066800000+0100)/",
  //     "i": 2,
  //     "v": 44.55083333333357
  //   },
  //   {
  //     "d": "/Date(1422745200000+0100)/",
  //     "v": 121.00305555555519
  //   },
  //   {
  //     "d": "/Date(1422745200000+0100)/",
  //     "i": 1,
  //     "v": 1024.1083333333338
  //   },
  //   {
  //     "d": "/Date(1422745200000+0100)/",
  //     "i": 2,
  //     "v": 46.75027777777768
  //   },
  //   {
  //     "d": "/Date(1425164400000+0100)/",
  //     "v": 238.15083333333388
  //   },
  //   {
  //     "d": "/Date(1425164400000+0100)/",
  //     "i": 1,
  //     "v": 1085.4616666666661
  //   },
  //   {
  //     "d": "/Date(1425164400000+0100)/",
  //     "i": 2,
  //     "v": 41.25000000000008
  //   },
  //   {
  //     "d": "/Date(1427839200000+0200)/",
  //     "v": 235.40111111111082
  //   },
  //   {
  //     "d": "/Date(1427839200000+0200)/",
  //     "i": 1,
  //     "v": 1082.4111111111103
  //   },
  //   {
  //     "d": "/Date(1427839200000+0200)/",
  //     "i": 2,
  //     "v": 40.70111111111191
  //   },
  //   {
  //     "d": "/Date(1430431200000+0200)/",
  //     "v": 226.88083333333373
  //   },
  //   {
  //     "d": "/Date(1430431200000+0200)/",
  //     "i": 1,
  //     "v": 1003.5300000000001
  //   },
  //   {
  //     "d": "/Date(1430431200000+0200)/",
  //     "i": 2,
  //     "v": 39.04999999999966
  //   },
  //   {
  //     "d": "/Date(1433109600000+0200)/",
  //     "v": 235.40249999999992
  //   },
  //   {
  //     "d": "/Date(1433109600000+0200)/",
  //     "i": 1,
  //     "v": 1082.4108333333335
  //   },
  //   {
  //     "d": "/Date(1433109600000+0200)/",
  //     "i": 2,
  //     "v": 40.69999999999982
  //   },
  //   {
  //     "d": "/Date(1435701600000+0200)/",
  //     "v": 244.75027777777817
  //   },
  //   {
  //     "d": "/Date(1435701600000+0200)/",
  //     "i": 1,
  //     "v": 1127.8608333333336
  //   },
  //   {
  //     "d": "/Date(1435701600000+0200)/",
  //     "i": 2,
  //     "v": 42.35055555555516
  //   },
  //   {
  //     "d": "/Date(1438380000000+0200)/",
  //     "v": 226.8802777777787
  //   },
  //   {
  //     "d": "/Date(1438380000000+0200)/",
  //     "i": 1,
  //     "v": 1005.681388888888
  //   },
  //   {
  //     "d": "/Date(1438380000000+0200)/",
  //     "i": 2,
  //     "v": 39.05055555555555
  //   },
  //   {
  //     "d": "/Date(1441058400000+0200)/",
  //     "v": 235.40388888888898
  //   },
  //   {
  //     "d": "/Date(1441058400000+0200)/",
  //     "i": 1,
  //     "v": 1078.6566666666672
  //   },
  //   {
  //     "d": "/Date(1441058400000+0200)/",
  //     "i": 2,
  //     "v": 40.699999999999484
  //   },
  //   {
  //     "d": "/Date(1443650400000+0200)/",
  //     "v": 210.1005555555554
  //   },
  //   {
  //     "d": "/Date(1443650400000+0200)/",
  //     "i": 1,
  //     "v": 1069.7625000000002
  //   },
  //   {
  //     "d": "/Date(1443650400000+0200)/",
  //     "i": 2,
  //     "v": 42.899999999999864
  //   },
  //   {
  //     "d": "/Date(1446332400000+0100)/",
  //     "v": 126.49999999999957
  //   },
  //   {
  //     "d": "/Date(1446332400000+0100)/",
  //     "i": 1,
  //     "v": 1029.732777777777
  //   },
  //   {
  //     "d": "/Date(1446332400000+0100)/",
  //     "i": 2,
  //     "v": 47.85027777777863
  //   },
  //   {
  //     "d": "/Date(1448924400000+0100)/",
  //     "v": 135.30055555555546
  //   },
  //   {
  //     "d": "/Date(1448924400000+0100)/",
  //     "i": 1,
  //     "v": 1167.661666666667
  //   },
  //   {
  //     "d": "/Date(1448924400000+0100)/",
  //     "i": 2,
  //     "v": 53.35083333333314
  //   }];
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
    //this.getConsumption(null);
    //console.log(this.dataTemp);
    //this.loadData();

    // this._metersService.loadMeters()
    //   .subscribe(
    //   data => this.meters = JSON.parse(JSON.stringify(data)),
    //   error => console.log(error),
    //   () => console.log('Finished')
    //   );
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

  setDataTemp(event) {
    console.info('set data consumption to meter data ');
    this.dataTemp = event;
  }
}
