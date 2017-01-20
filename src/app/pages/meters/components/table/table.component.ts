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
  ComponentFactoryResolver
}
  from '@angular/core';
import {Directory} from './model/Directory';
import {TableCellComponent} from './table-cell/table-cell.component';
import {TableRowComponent} from './table-row/table-row.component';
import {Meter} from './model/Meter';
import {TableConfigService} from "./table-config.service";
import {forEach} from "@angular/router/src/utils/collection";


// ================================================================================= //

@Component({
  selector: 'app-test',
  template: `<app-table-cell *first="let message">Hello, {{message}}</app-table-cell> `
})
export class TestComponent {
}

@Component({
  selector: 'app-table',
  // templateUrl: './table.component.html',
  styleUrls: ['table.component.scss'],
  template: `
  <h1 i18n>My Data</h1>
  <button (click)="onClickAddColumn()">add column</button>
  <div class="rTable" #table>
    <div class="rTableRow" #header>
      <div *ngFor="let header of columns ; let i = index">
        <div class="rTableHead" [ngStyle]="{'width': (width / columns.length) +'px' }">
           <span style="padding: 3px 1.8%; ">{{ header.columnName}}</span>
           <span style="float: right"><app-filter></app-filter></span>   
           <span style="float: right"><app-conf-column (configChange)="handleAddNewColumnConfig($event,i)" (configSave)="handleSaveColumnConfig($event,i)" ></app-conf-column></span>
        </div>
      </div>
    </div>
    <app-table-row [children]="children" [padding]="20" [columns]="columns" [cellWidth]="(width / columns.length)"></app-table-row>
  </div>
  `
})
export class TableComponent implements AfterViewInit {

  condition: boolean = true;

  children: Array<Meter> = [];

  globalStyle: any;

  private model: Meter;

  private width: number = 800;

  @ViewChild('table', {read: ViewContainerRef}) container;

  @ViewChildren(TableRowComponent, {read: ViewContainerRef}) rows: QueryList<TableRowComponent>;

  @ViewChild('header', {read: ViewContainerRef}) header;

  @ViewChild('column') column;

  @ViewChild(TableRowComponent, {read: ViewContainerRef}) row;

  @ViewChild(TableCellComponent, {read: ViewContainerRef}) cell: TableCellComponent;

  @ContentChildren(TableRowComponent, {read: ViewContainerRef}) items: QueryList<TableRowComponent>;

  ngAfterViewInit() {
  }

  columns = [
    {columnName: 'N°', dataIndex: 'Id'},
    {columnName: 'Designation', dataIndex: 'Name'},
    {columnName: 'Description', dataIndex: 'Description'}
  ];

  widgetRef;
  widgetRef2;
  numbreLignes: number;
  numberColumns: number;

  data = [{
    Id: 1,
    Name: 'Eclairage bureaux',
    AlarmIds: null,
    CoefCommonUnit: 0,
    CoefDistribution: 100,
    CoefUnit: 1,
    DailyMax: 0,
    Description: null,
    Formula: null,
    IsDiff: false,
    IsDisabled: false,
    LocationId: 3,
    ParentId: null,
    RefFormula: null,
    RefSamplePeriod: 4,
    ReferenceYear: null,
    RolloverLimit: 0,
    ServiceId: 2,
    SourceMode: 0,
    ThresholdId: null,
    TrendId: 4,
    TrendIds: null,
    UnitId: null,
    UseTheoreticalRef: null,
    Version: 0
  },
    {
      Id: 2,
      Name: 'Eclairage RC',
      AlarmIds: null,
      CoefCommonUnit: 0,
      CoefDistribution: 100,
      CoefUnit: 0.5,
      DailyMax: 0,
      Description: null,
      Formula: null,
      IsDiff: false,
      IsDisabled: false,
      LocationId: 2,
      ParentId: 1,
      RefFormula: null,
      RefSamplePeriod: 4,
      ReferenceYear: null,
      RolloverLimit: 0,
      ServiceId: 2,
      SourceMode: 0,
      ThresholdId: null,
      TrendId: 5,
      TrendIds: null,
      UnitId: null,
      UseTheoreticalRef: null,
      Version: 0
    },
    {
      Id: 3,
      Name: 'Eau',
      AlarmIds: [1],
      CoefCommonUnit: 0,
      CoefDistribution: 100,
      CoefUnit: 0.01,
      DailyMax: 0,
      Description: null,
      Formula: null,
      IsDiff: false,
      IsDisabled: false,
      LocationId: 1,
      ParentId: null,
      RefFormula: '',
      RefSamplePeriod: 4,
      ReferenceYear: null,
      RolloverLimit: 0,
      ServiceId: 4,
      SourceMode: 0,
      ThresholdId: null,
      TrendId: 6,
      TrendIds: null,
      UnitId: null,
      UseTheoreticalRef: null,
      Version: 0
    }
  ];

  constructor(private resolver: ComponentFactoryResolver, private _confTable: TableConfigService) {

    //Load configuration
    this.columns = this._confTable.loadConfg() != null && this._confTable.loadConfg().length > 0 ? this._confTable.loadConfg() : this.columns;

    let models = this.data;
    for (let model of this.data) {
      this.fatchParent(model, new Meter(model.Name, []));
    }
  }

  fatchParent(meter: any, meter_: Meter) {
    if (meter['ParentId'] != null) {  // il a un parent
      let parent = this.data.filter(function (i, n) {
        return i.Id === meter['ParentId'];
      })[0];
      let parentMeter = new Meter(parent.Name, [meter_]);
      this.fatchParent(parent, parentMeter);
    } else {
      let roots = this.children.filter(m => m.Name === meter.Name);
      if (roots.length > 0) {
        roots[0].children = roots[0].children.concat(meter_.children);
      } else {
        if (meter.children == null) {
          meter.children = [];
        }
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
    this.columns.push({columnName: 'new column', dataIndex: ''});
  }

  handleAddNewColumnConfig(event, index) {
    let newColumn = {
      columnName: JSON.parse(event[0]).value, dataIndex: JSON.parse(event[0]).value
    };
    this.columns[index] = newColumn;
  }

  handleSaveColumnConfig(event, index) {
    console.log(event);
    console.log(index);
    let newColumns = this.columns;
    let keys = Object.keys(JSON.parse(JSON.stringify(event)));
    for (var k in keys) {
      newColumns[index] = {columnName: keys[k], dataIndex: keys[k]};
    }
    this._confTable.saveConfig(newColumns);
  }


}
