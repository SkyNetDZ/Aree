import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Meter } from "../table/model/Meter";
import { SettingComponent } from "./setting/setting.component";
import { DataTableService } from "./data-table.service";
import { State } from "./store/state";
import { Store } from "@ngrx/store";
import { TableAction } from "./store/action";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {

  // @Input() columns : [any];

  // @Input() rows : [any];

  @Output() dataChart = new EventEmitter();
  private setting: SettingComponent;
  private stickyColumns: [any] = [
    { columnName: 'Name', dataIndex: 'Name', fixed: true, config: {} },
    { columnName: 'Nature', dataIndex: 'Nature', fixed: true, config: {} }
  ];
  private naturalColumns: [any] = [
    { columnName: 'Unité', dataIndex: 'UniteName', fixed: false, config: {} },
    { columnName: 'Emplacement', dataIndex: 'LocationName', fixed: false, config: {} },
    { columnName: 'Cons/Day', dataIndex: 'consDay', fixed: false, config: {} },
    { columnName: 'Cons/Week', dataIndex: 'consWeek', fixed: false, config: {} },
    { columnName: 'Cons/Month', dataIndex: 'consMonth', fixed: false, config: {} },
    { columnName: 'Cons/Year', dataIndex: 'consYear', fixed: false, config: {} }
  ];

  // private columns = {
  //   'stickyColumns' : this.stickyColumns ,
  //   'naturalColumns' : this.naturalColumns
  // };

  private rows = new Array();
  private treeView: boolean;
  private model: Meter;
  private modelIds = new Array<number>();
  @Output() selectedRow = new EventEmitter();

  constructor(public service: DataTableService, private store: Store<State>) {

    // store.subscribe(
    //   state => console.log(state)
    // );

    this.onLoadConfig();
    this.service
      .loadMeters()
      .subscribe(
      d => {
        this.formatData(d);
        this.getConsumption(d)
      },
      error => console.log(error),
      () => console.log('finish')
      );
    console.log(this.modelIds)
   
    this.service
      .loadMappingLocation()
      .subscribe(
      d => localStorage.setItem('mapping_location', JSON.stringify(d)),
      error => console.log(error),
      () => console.log('finished')
      );
    this.service
      .loadMappingUnit()
      .subscribe(
      d => localStorage.setItem('mapping_unit', JSON.stringify(d)),
      error => console.log(error),
      () => console.log('finished')
      );
    this.service
      .loadMappingNature()
      .subscribe(
      d => localStorage.setItem('mapping_nature', JSON.stringify(d)),
      error => console.log(error),
      () => console.log('finished')
      );
  }

  ngOnInit() {
    // this.service.loadMeters()
    //   .subscribe(
    //     d => this.store.dispatch(new TableAction(d)),
    //     error => console.log('error loading'),
    //     () => this.store.forEach(s => console.log(s))
    //   );
  }

  setTreeView() {
    this.treeView = !this.treeView;
  }

  addColumnSticky() {
    // if (this.stickyColumns.length < 4) {
    //   this.stickyColumns.push({ columnName: 'New column', dataIndex: '', configCol: {} });
    // } else {
    //   alert('Number limit come sticky columns is limited to 4 ! ');
    // }
    alert('fonctionnalité disactivé');
  }

  addColumnNatural() {
    this.naturalColumns.push({ columnName: 'New column', dataIndex: '', config: {} });
  }

  loadDroppedColumns(droppedColumns, typeColumns) {
    switch (typeColumns) {
      case 1: this.stickyColumns = droppedColumns; break;
      case 2: this.naturalColumns = droppedColumns; break;
      default:
        console.log(droppedColumns);
    }
  }

  showConfWin(elm) {
    this.setting = new SettingComponent();
  }

  onChangeConfigColumn(event) {
    this.service.saveConfig(event);
  }

  onAddFilterColumn() { }

  onLoadConfig() {
    this.naturalColumns = this.service.loadConfg() != null && this.service.loadConfg().length > 0 ? this.service.loadConfg() : this.naturalColumns;
    console.log(this.naturalColumns);
  }

  private formatData(d) {
    if (d == null || d.length == 0) {
      console.log('liste vide')
    } else {
      var e = [];
      for (let i of Object.keys(d)) {
        e.push(d[i]);
        this.modelIds.push(d[i].Id);
      }
      this.treeify(e, 'Id', 'ParentId', 'children')
    }
  }

  private treeify(list: Array<any>, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = 'Id';
    if (!parentAttr) parentAttr = 'ParentId';
    if (!childrenAttr) childrenAttr = 'children';

    var treeList = [];
    var lookup = {};
    var ids = new Array();
    list.forEach(function (obj) {
      lookup[obj[idAttr]] = obj;
      obj[childrenAttr] = [];
    });
    list.forEach(function (obj) {
      var meter = new Meter(obj, obj[childrenAttr]);
      meter.mapIdValue('Nature', 'mapping_nature', meter.ServiceId, 'Name');
      meter.mapIdValue('Color', 'mapping_nature', meter.ServiceId, 'Color');
      meter.mapIdValue('UniteId', 'mapping_nature', meter.ServiceId, 'UnitId');
      meter.mapIdValue('UniteName', 'mapping_unit', meter.UniteId, 'Name');
      meter.mapIdValue('LocationName', 'mapping_location', meter.LocationId, 'Name');
      if (obj[parentAttr] != null) {
        lookup[obj[parentAttr]][childrenAttr].push(meter);
      } else {
        treeList.push(meter);
      }
    });
    this.rows = treeList;
  };

  checkAllRows(event) {
    console.log(event);
    this.rows.forEach((row) => {
      row.check(event);
    })
  }

  loadChartData(event) {
    this.dataChart.emit(event);
  }

  selectionRow(event) {
    console.log(event);
    this.selectedRow.emit(event);
  }

  loadToModel(d) {
    console.log('loadToModel');
    d.Data.forEach(res => {
      this.findRowById(this.rows, res, 'consDay');
      this.findRowById(this.rows, res, 'consWeek');
      this.findRowById(this.rows, res, 'consMonth');
      this.findRowById(this.rows, res, 'consYear');
    }, this.rows)
  }

  findRowById(rows: Array<any>, res: any, dataIndex: string) {
    rows.forEach(r => {
      if (r.Id == res.EntityId) {
        switch (dataIndex) {
          case 'consDay':
            r[dataIndex] = res.Items["0"].Value.toFixed(3);
            break;
          case 'consWeek':
            r[dataIndex] = res.Items["1"].Value.toFixed(3);
            break;
          case 'consMonth':
            r[dataIndex] = res.Items["2"].Value.toFixed(3);
            break;
          case 'consYear':
            r[dataIndex] = res.Items["3"].Value.toFixed(3);
            break;
          default:
            break;
        }
        return true;
      } else {
        if (r.children != null && r.children.length > 0) {
          this.findRowById(r.children, res, dataIndex);
        }
      }
    });
  }

  getConsumption(d : any){
     this.service
      .getConsumption(this.modelIds, new Date().getTime())
      .subscribe(
      d => this.loadToModel(d),
      error => console.log(error),
      () => console.log('finish')
      );
  }
  

}
