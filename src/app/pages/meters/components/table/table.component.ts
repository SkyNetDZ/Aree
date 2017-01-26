import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  TemplateRef,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  ViewContainerRef,
  QueryList,
  ContentChildren,
  ComponentFactoryResolver, NgZone
}
  from '@angular/core';
import {Directory} from './model/Directory';
import {TableCellComponent} from './table-cell/table-cell.component';
import {TableRowComponent} from './table-row/table-row.component';
import {Meter} from './model/Meter';
import {TableConfigService} from "./table-config.service";
import {TableService} from "./service/table.service";
import {TableColumnComponent} from "./table-column/table-column.component";


// ================================================================================= //

// @Component({
//   selector: 'app-test',
//   template: `<app-table-cell *first="let message">Hello, {{message}}</app-table-cell> `
// })
// export class TestComponent {
// }

@Component({
  selector: 'app-table',
  // templateUrl: './table.component.html',
  styleUrls: ['table.component.scss'],
  template: `
  <button (click)="onClickAddColumn()">add column</button>
  <div class="rTable" #table>
    <div class="rTableRow" #header>
      <div *ngFor="let header of columns ; let i = index">
        <div class="rTableHead" [ngStyle]="{'width': (width / columns.length) +'px' }">
           <div style="
           padding: 3px 1.8%;align-self: stretch;margin: auto;font-size: 0.8vw">{{ header.columnName.toLocaleUpperCase()}}</div>
           <div style="float: right"><app-filter></app-filter></div>   
           <div style="float: right"><app-conf-column (configChange)="handleAddNewColumnConfig($event,i)" (configSave)="handleSaveColumnConfig($event,i)" ></app-conf-column></div>
        </div>
      </div>
    </div>
    <app-table-row [children]="children" [padding]="5" [columns]="columns" [cellWidth]="(width / columns.length)"></app-table-row>
  </div>
  `
})
export class TableComponent {

  condition: boolean = true;

  children: Array<Meter> = [];

  globalStyle: any;

  private model: Meter;

  private width: number = window.innerWidth - 300;

  private height: number = window.innerHeight;

  private columns: Array<any> = [
    // {columnName: 'N°', dataIndex: 'Id'},
    {columnName: 'Name', dataIndex: 'Name', configCol: {}},
    {columnName: 'Unité', dataIndex: 'UniteName', configCol: {}},
    {columnName: 'Jour', dataIndex: 'ConsumptionDay', configCol: {}},
    {columnName: 'Semaine', dataIndex: 'ConsumptionWeek', configCol: {}},
    {columnName: 'Mois', dataIndex: 'ConsumptionMonth', configCol: {}},
    {columnName: 'Année', dataIndex: 'ConsumptionYear', configCol: {}},
    {columnName: 'Emplacement', dataIndex: 'LocationName', configCol: {}},
  ];

  // private columns : Array<TableColumnComponent>;

  @ViewChild('table', {read: ViewContainerRef}) container;

  @ViewChildren(TableRowComponent, {read: ViewContainerRef}) rows: QueryList<TableRowComponent>;

  @ViewChild('header', {read: ViewContainerRef}) header;

  @ViewChild('column') column;

  @ViewChild(TableRowComponent, {read: ViewContainerRef}) row;

  @ViewChild(TableCellComponent, {read: ViewContainerRef}) cell: TableCellComponent;

  @ContentChildren(TableRowComponent, {read: ViewContainerRef}) items: QueryList<TableRowComponent>;

  // @HostListener('select', ['$event'])
  // onSelect(event) {
  //   console.log(event.target);
  // }


  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   console.log(event.target.innerWidth);
  // }


  widgetRef;
  widgetRef2;
  numbreLignes: number;
  numberColumns: number;

  private data: Array<any>;
  private consom: any;

  constructor(private resolver: ComponentFactoryResolver, private _confTable: TableConfigService, private _metersService: TableService, private ngZone: NgZone) {

    // this.columns = new Array();
    //
    // let nameColumn = new TableColumnComponent("name",this.model,this.model.Unite.Name);


    //Adaptation width of table
    window.onresize
      = (e) => {
      ngZone.run(() => {
        this.width = window.innerWidth - 300;
        this.height = window.innerHeight;
      });
    };


    this.model = new Meter(null, []);
    //Build Columns
    // let l = this.columns.length;
    // for(var k in this.model)
    // {
    //   if(l > 0 && k != "children"){
    //      this.columns.push({'columnName' : k, 'dataIndex': k });
    //     l-- ;
    //   }
    // }

    console.log(this.columns);
    //Load configuration
    this.columns = this._confTable.loadConfg() != null && this._confTable.loadConfg().length > 0 ? this._confTable.loadConfg() : this.columns;

    //Load Location and Units
    this._metersService.loadMappingLocation()
      .subscribe(
        d => localStorage.setItem('mapping_location', JSON.stringify(d)),
        error => console.log(error),
        () => console.log('finished')
      );

    this._metersService.loadMappingUnit()
      .subscribe(
        d => localStorage.setItem('mapping_unit', JSON.stringify(d)),
        error => console.log(error),
        () => console.log('finished')
      );

    this._metersService.loadMappingNature()
      .subscribe(
        d => localStorage.setItem('mapping_nature', JSON.stringify(d)),
        error => console.log(error),
        () => console.log('finished')
      );

    //Load Data
    this._metersService.loadMeters()
      .subscribe(
        d => this.formatData(d),
        error => console.log(error),
        () => console.log('finished')
      );


    this._metersService.getConsumption()
      .subscribe(
        d => this.loadConsumptionToMeter(null, this.children, JSON.parse(JSON.stringify(d))),
        error => console.log(error),
        () => console.log('finished consommation')
      );

    for (let column of this.columns) {
      if (column.configCol != {}) {
        this._metersService.getCostumValue(column.configCol)
          .subscribe(
            d => this.loadValueToMeter(null, this.children, JSON.parse(JSON.stringify(d)), column.dataIndex),
            error => console.log(error),
            () => console.log('finished ')
          );
      }
    }

  }

  private loadValueToMeter(m: Meter, childs: Array<any>, d: any, dataInex: string) {
    let me = this;
    childs.forEach(function (model) {
      let o = d['Data'].filter(function (el) {
        return el.EntityId == model.Id;
      });
      let index = d['Data'].indexOf(o[0]);
      if (model.children.length == 0) {
        model['dataIndex'] = Math.round(d['Data'][index]['Items'][0].Value);
      } else {
        me.loadConsumptionToMeter(model, model.children, d);
      }
    });
    if (m != null) {
      let o = d['Data'].filter(function (el) {
        return el.EntityId == m.Id;
      });
      let index = d['Data'].indexOf(o[0]);
      m['dataIndex'] = Math.round(d['Data'][index]['Items'][0].Value);
    }
  }

  private loadConsumptionToMeter(m: Meter, childs: Array<any>, d: any) {
    let me = this;
    childs.forEach(function (model) {
      let o = d['Data'].filter(function (el) {
        return el.EntityId == model.Id;
      });
      let index = d['Data'].indexOf(o[0]);
      if (model.children.length == 0) {
        model['ConsumptionDay'] = Math.round(d['Data'][index]['Items'][0].Value);
        model['ConsumptionWeek'] = Math.round(d['Data'][index]['Items'][1].Value);
        model['ConsumptionMonth'] = Math.round(d['Data'][index]['Items'][2].Value);
        model['ConsumptionYear'] = Math.round(d['Data'][index]['Items'][3].Value);
      } else {
        me.loadConsumptionToMeter(model, model.children, d);
      }
    });
    if (m != null) {
      let o = d['Data'].filter(function (el) {
        return el.EntityId == m.Id;
      });
      let index = d['Data'].indexOf(o[0]);
      m['ConsumptionDay'] = Math.round(d['Data'][index]['Items'][0].Value);
      m['ConsumptionWeek'] = Math.round(d['Data'][index]['Items'][1].Value);
      m['ConsumptionMonth'] = Math.round(d['Data'][index]['Items'][2].Value);
      m['ConsumptionYear'] = Math.round(d['Data'][index]['Items'][3].Value);
    }
  }

  private formatData(d: Array<any>) {
    this.data = JSON.parse(JSON.stringify(d));
    let metersId = [];
    for (let model of this.data) {
      metersId.push(model.Id);
      this.fatchParent(model, new Meter(model, []));
    }
    localStorage.setItem('meters_id', JSON.stringify(metersId));
  }

  fatchParent(meter: any, meter_: Meter) {
    if (meter.ParentId != null) {  // il a un parent
      let parent = this.data.filter(function (i, n) {
        return i.Id === meter.ParentId;
      })[0];
      let parentMeter = new Meter(parent, [meter_]);
      parentMeter.mapIdValue('Nature', 'mapping_nature', parentMeter.ServiceId, 'Name');
      parentMeter.mapIdValue('Color', 'mapping_nature', parentMeter.ServiceId, 'Color');
      parentMeter.mapIdValue('UniteId', 'mapping_nature', parentMeter.ServiceId, 'UnitId');
      parentMeter.mapIdValue('UniteName', 'mapping_unit', parentMeter.UniteId, 'Name');
      parentMeter.mapIdValue('LocationName', 'mapping_location', parentMeter.LocationId, 'Name');
      // console.log(parentMeter);
      // console.log("fils : " + meter.Name);
      // console.log("parent : " + parent.Name);
      this.fatchParent(parent, parentMeter);
    } else { // est un noeud racine
      let roots = this.children.filter(m => m.Name == meter.Name);
      if (roots.length > 0) {
        meter_.mapIdValue('Nature', 'mapping_nature', meter_.ServiceId, 'Name');
        meter_.mapIdValue('Color', 'mapping_nature', meter_.ServiceId, 'Color');
        meter_.mapIdValue('UniteId', 'mapping_nature', meter_.ServiceId, 'UnitId');
        meter_.mapIdValue('UniteName', 'mapping_unit', meter_.UniteId, 'Name');
        meter_.mapIdValue('LocationName', 'mapping_location', meter_.LocationId, 'Name');
        console.log(meter_);
        roots[0].children = meter_.children;
      } else {
        if (meter.children == null) {
          meter.children = [];
        }
        meter_.mapIdValue('Nature', 'mapping_nature', meter_.ServiceId, 'Name');
        meter_.mapIdValue('Color', 'mapping_nature', meter_.ServiceId, 'Color');
        meter_.mapIdValue('UniteId', 'mapping_nature', meter_.ServiceId, 'UnitId');
        meter_.mapIdValue('UniteName', 'mapping_unit', meter_.UniteId, 'Name');
        meter_.mapIdValue('LocationName', 'mapping_location', meter_.LocationId, 'Name');
        console.log(meter_);
        this.children.push(meter_);
      }
    }
  }

  ngOnInit() {
    // console.log(this.contentChildren);
  }

  // ngAfterViewInit() {
  // }


  onClickAddColumn() {
    this.columns.push({columnName: 'new column', dataIndex: '', configCol: {}});
  }

  handleAddNewColumnConfig(event, index) {
    let newColumn = {
      columnName: JSON.parse(event[0]).value, dataIndex: JSON.parse(event[0]).value
    };
    this.columns[index] = newColumn;
  }

  handleSaveColumnConfig(event, index) {
    let newColumns = this.columns;
    // let keys = Object.keys(JSON.parse(JSON.stringify(event)));
    // console.log(keys);
    // for (var k in keys) {
    //   newColumns[index] = {columnName: keys[k], dataIndex: keys[k]};
    // }
    //
    // {
    //    meusure : value ,
    //    Duration : {
    //               Unit: 7,
    //               Value: 1
    //                },
    //    EndDate : "\/Date(-62135596800000+0000)\/",
    //    StartDate: "\/Date(1483225200000+0100)\/"
    // }
    newColumns[index]['columnName'] = JSON.parse(JSON.stringify(event))['columnName'];
    newColumns[index]['dataIndex'] = JSON.parse(JSON.stringify(event))['dataIndex'];
    newColumns[index]['configCol'] = JSON.parse(JSON.stringify(event));
    this._confTable.saveConfig(newColumns);
  }


}
