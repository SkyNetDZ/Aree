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
import { Directory } from './model/Directory';
import { TableColumnComponent } from './table-column/table-column.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableRowComponent } from './table-row/table-row.component';
import { Meter } from './model/Meter';
import { forEach } from '@angular/router/src/utils/collection';
import { createTypeParameter } from 'typedoc/lib/converter/factories';


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
  <button (click)="onClickAddRow()">add row</button>
  <button (click)="onClickAddColumn()">add column</button>
  <button (click)="onClickDeleteColumn()">delete column</button>
  <button (click)="onClickAddElement()">add Element</button>
  <div class="rTable" #table>
    <div class="rTableRow" #header>
      <div *ngFor="let header of columns">
        <div class="rTableHead">
          <span>{{ header.columnName}}</span>
          <span><app-filter></app-filter></span>
          <span><app-conf-column></app-conf-column></span>
          <div style="background-color: red"></div>
        </div>
      </div>
    </div>
    <app-table-row [children]="children" [padding]="20" [columns]="columns"></app-table-row>
  </div>
  `
})
export class TableComponent implements AfterViewInit {

  condition: boolean = true;

  children: Array<Meter> = [];

  globalStyle: any;

  @ViewChild('table', { read: ViewContainerRef }) container;

  @ViewChildren(TableRowComponent, {read: ViewContainerRef}) rows: QueryList<TableRowComponent>;

  @ViewChild('header', { read: ViewContainerRef }) header;

  @ViewChild('column') column;

  @ViewChild(TableRowComponent, {read: ViewContainerRef}) row;

  @ViewChild(TableCellComponent, {read: ViewContainerRef}) cell: TableCellComponent;

  @ContentChildren(TableRowComponent, {read: ViewContainerRef}) items: QueryList<TableRowComponent>;

  ngAfterViewInit() {
    // console.log(this.cell);
    // console.log(this.container2);
    // console.log(this.items);
  }

  columns = [
    { columnName: 'N°', dataIndex: 'Id' },
    { columnName: 'Designation', dataIndex: 'Name' },
    { columnName: 'Description', dataIndex: 'Description' }
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

  constructor(private resolver: ComponentFactoryResolver) {

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

  onClickAddRow() {
  }

  // ngAfterViewInit() {
  // }


  //TODO : Adding new columns and resizing existing columns
  onClickAddColumn() {
    this.columns.push({columnName: 'new column', dataIndex: ''});
    //this.row._element.component.addCell();
  }

  onClickDeleteColumn() {

  }

  toggleFilter() {

  }

  ngAfterContentInit() {
    console.log(this.rows)
  }

  onClickAddElement() {
    const factory = this.resolver.resolveComponentFactory(TableCellComponent);
    this.widgetRef = this.row.createComponent(factory);
  }

  readStyleData() {

  }

  loadStyle() {

  }

  handleAddCell(row) {
    console.log('handler add cell');
    console.log(event);
  }


}
