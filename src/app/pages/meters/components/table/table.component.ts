import {
  Output,
  EventEmitter,
  Component,
  ComponentFactoryResolver, NgZone, OnInit
}
  from '@angular/core';
import {Directory} from './model/Directory';
import {Meter} from './model/Meter';
import {TableConfigService} from "./table-config.service";
import {TableService} from "./service/table.service";
import {State} from "./store/state";
import {Store} from "@ngrx/store";
import {TableAction} from "./store/action";
import {error} from "util";


// ================================================================================= //

// @Component({
//   selector: 'app-test',
//   template: `<app-table-cell *first="let message">Hello, {{message}}</app-table-cell> `
// })
// export class TestComponent {
// }

export class column {

  title: string;
  name: string;
  dataIndex: string;
  freeze: boolean;
  configStyle: any;
  configData: any;
  sort: boolean;
  hidden: boolean;
  filter: boolean;

}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent implements OnInit {

  private testData: [any] = [{
    "Id": 1,
    "Name": "Eclairage bureaux",
    "LocationId": 3,
    "ServiceId": 2,
    "UniteId": 19,
    "Niveau": 0,
    "AlarmIds": null,
    "CoefCommonUnit": 0,
    "CoefDistribution": 100,
    "CoefUnit": 1,
    "DailyMax": 0,
    "Description": null,
    "Formula": null,
    "IsDiff": false,
    "IsDisabled": false,
    "ParentId": null,
    "RefFormula": null,
    "RefSamplePeriod": 4,
    "ReferenceYear": null,
    "RolloverLimit": 0,
    "SourceMode": 0,
    "ThresholdId": null,
    "TrendId": 4,
    "TrendIds": null,
    "UnitId": null,
    "UseTheoreticalRef": null,
    "Version": 0,
    "children": [{
      "Id": 5,
      "Name": "Climatisation",
      "LocationId": 1,
      "ServiceId": 5,
      "UniteId": 19,
      "Niveau": 0,
      "AlarmIds": null,
      "CoefCommonUnit": 0,
      "CoefDistribution": 100,
      "CoefUnit": 1,
      "DailyMax": 0,
      "Description": null,
      "Formula": null,
      "IsDiff": false,
      "IsDisabled": false,
      "ParentId": 1,
      "RefFormula": null,
      "RefSamplePeriod": 4,
      "ReferenceYear": null,
      "RolloverLimit": 0,
      "SourceMode": 0,
      "ThresholdId": null,
      "TrendId": 8,
      "TrendIds": null,
      "UnitId": null,
      "UseTheoreticalRef": null,
      "Version": 0,
      "children": [],
      "expanded": true,
      "checked": false,
      "Nature": "Climatisation",
      "Color": "#FF0000FF",
      "UniteName": "kWh",
      "LocationName": "Batiment 1"
    }],
    "expanded": true,
    "checked": false,
    "Nature": "Eclairage",
    "Color": "#FFFFCC00",
    "UniteName": "kWh",
    "LocationName": "Bureaux"
  }, {
    "Id": 6,
    "Name": "Eclairage RC",
    "LocationId": 2,
    "ServiceId": 2,
    "UniteId": 19,
    "Niveau": 0,
    "AlarmIds": null,
    "CoefCommonUnit": 0,
    "CoefDistribution": 100,
    "CoefUnit": 0.5,
    "DailyMax": 0,
    "Description": null,
    "Formula": null,
    "IsDiff": false,
    "IsDisabled": false,
    "ParentId": null,
    "RefFormula": null,
    "RefSamplePeriod": 4,
    "ReferenceYear": null,
    "RolloverLimit": 0,
    "SourceMode": 0,
    "ThresholdId": null,
    "TrendId": 5,
    "TrendIds": null,
    "UnitId": null,
    "UseTheoreticalRef": null,
    "Version": 0,
    "children": [{
      "Id": 4,
      "Name": "Chauffage",
      "LocationId": 1,
      "ServiceId": 1,
      "UniteId": 19,
      "Niveau": 0,
      "AlarmIds": null,
      "CoefCommonUnit": 0,
      "CoefDistribution": 100,
      "CoefUnit": 1,
      "DailyMax": 0,
      "Description": null,
      "Formula": null,
      "IsDiff": false,
      "IsDisabled": false,
      "ParentId": 6,
      "RefFormula": null,
      "RefSamplePeriod": 4,
      "ReferenceYear": null,
      "RolloverLimit": 0,
      "SourceMode": 0,
      "ThresholdId": null,
      "TrendId": 7,
      "TrendIds": null,
      "UnitId": null,
      "UseTheoreticalRef": null,
      "Version": 0,
      "children": [{
        "Id": 3,
        "Name": "Eau",
        "LocationId": 1,
        "ServiceId": 4,
        "UniteId": 80,
        "Niveau": 0,
        "AlarmIds": null,
        "CoefCommonUnit": 0,
        "CoefDistribution": 100,
        "CoefUnit": 0.01,
        "DailyMax": 0,
        "Description": null,
        "Formula": null,
        "IsDiff": false,
        "IsDisabled": false,
        "ParentId": 4,
        "RefFormula": null,
        "RefSamplePeriod": 4,
        "ReferenceYear": null,
        "RolloverLimit": 0,
        "SourceMode": 0,
        "ThresholdId": null,
        "TrendId": 6,
        "TrendIds": null,
        "UnitId": null,
        "UseTheoreticalRef": null,
        "Version": 0,
        "children": [],
        "expanded": true,
        "checked": false,
        "Nature": "Eau",
        "Color": "#FF0000FF",
        "UniteName": "m³",
        "LocationName": "Batiment 1"
      }],
      "expanded": true,
      "checked": false,
      "Nature": "Chauffage",
      "Color": "#FFFF0000",
      "UniteName": "kWh",
      "LocationName": "Batiment 1"
    }],
    "expanded": true,
    "checked": false,
    "Nature": "Eclairage",
    "Color": "#FFFFCC00",
    "UniteName": "kWh",
    "LocationName": "Rez-de-chaussée"
  }];

  initalNumberColumns: number;

  @Output() dataCahrt = new EventEmitter();

  children: Array<Meter> = [];

  private model: Meter;

  private treeView: boolean = true; //Tree View activated

  private width: number = window.innerWidth - 300;

  private height: number = window.innerHeight;

  private columns: Array<any> = [
    {columnName: 'Name', dataIndex: 'Name'},
    {columnName: 'Nature', dataIndex: 'Nature'},
    {columnName: 'Unité', dataIndex: 'UniteName'},
    {columnName: 'Emplacement', dataIndex: 'LocationName'},
  ];

  private data = [];
  freezedColumns = [];
  static margin: number;
  private cellWidth: number = 100;

  constructor(private resolver: ComponentFactoryResolver, private _confTable: TableConfigService, private _metersService: TableService, private ngZone: NgZone, private  store: Store<State>) {


    store.subscribe(
      state => console.log(state)
    );


    this.initalNumberColumns = this.columns.length;
    // this.columns = new Array();
    //
    // let nameColumn = new TableColumnComponent("name",this.model,this.model.Unite.Name);

    //Adaptation width of table
    // window.onresize
    //   = (e) => {
    //     ngZone.run(() => {
    //       this.width = window.innerWidth - 300;
    //       this.height = window.innerHeight;
    //     });
    //   };


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

    //Load configuration
    this.columns = this._confTable.loadConfg() != null && this._confTable.loadConfg().length > 0 ? this._confTable.loadConfg() : this.columns;

    this.loadFreezedColumns();
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
    // this._metersService.loadMeters()
    //   .subscribe(
    //   d => this.formatData(d),
    //   error => console.log(error),
    //   () => console.log('finished')
    //   );


    this._metersService.getConsumption()
      .subscribe(
        d => this.loadConsumptionToMeter(null, this.children, JSON.parse(JSON.stringify(d))),
        error => console.log(error),
        () => console.log('finished consommation')
      );

    // for (let column of this.columns) {
    //   if (column.configCol != null && Object.keys(column.configCol).length > 0) {
    //     this._metersService.getCostumValue(column['configCol'])
    //       .subscribe(
    //       d => this.loadValueToMeter(null, this.children, JSON.parse(JSON.stringify(d)), column.dataIndex),
    //       error => console.log(error),
    //       () => console.log('finished ')
    //       );
    //   }
    // }

  }

  private loadValueToMeter(m: Meter, childs: Array<any>, d: any, dataIndex: string) {
    let me = this;
    childs.forEach(function (model) {
      let o = d['Items'].filter(function (el) {
        return el.EntityId == model.Id;
      });
      let index = d['Items'].indexOf(o[0]);
      if (model.children.length == 0) {
        model[dataIndex] = Math.round(d['Items'][index].Values);
      } else {
        me.loadValueToMeter(model, model.children, d, dataIndex);
      }
    });
    if (m != null) {
      let o = d['Items'].filter(function (el) {
        return el.EntityId == m.Id;
      });
      let index = d['Items'].indexOf(o[0]);
      m[dataIndex] = Math.round(d['Items'][index].Values);
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

  private formatData(d) {
    console.log(d);
    if (d == null || d.length == 0) {
      console.log('liste vide')
    } else {
      var e = [];
      for (let i of Object.keys(d)) {
        e.push(d[i])
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
    console.log(JSON.stringify(treeList));
    this.children = treeList;
    //return treeList;
  };


  ngOnInit() {
    this._metersService.loadMeters()
      .subscribe(
        d => this.store.dispatch(new TableAction(d)),
        error => console.log('error loading'),
        () => this.store.forEach(s => this.formatData(s.storeData.meters))
      );

  }

  onClickAddColumn() {
    this.columns.push({columnName: 'new column', dataIndex: '', configCol: {}});
  }

  onTreeView() {
    this.treeView = !this.treeView;
    let msg = this.treeView ? 'activated' : 'disabled';
    alert('Tree View ' + msg)
  }

  handleAddNewColumnConfig(event, index) {
    let newColumn = {
      columnName: JSON.parse(event[0]).value, dataIndex: JSON.parse(event[0]).value
    };
    this.columns[index] = newColumn;
  }

  handleSaveColumnConfig(event, index) {
    let newColumns = this.columns;
    let confParam = JSON.parse(JSON.stringify(event));
    newColumns[index]['dataIndex'] = (confParam['data'] != null && confParam['data'] != "") ? confParam['data'] : 'CustomDataIndex_' + index;
    newColumns[index]['configCol'] = confParam;
    newColumns[index]['columnName'] = (confParam['name'] != null) ? confParam['name'] : "Column Param";
    this._confTable.saveConfig(newColumns);
    this.loadFreezedColumns();
  }

  loadChartData(event) {
    console.info('load data to parent meter ');
    this.dataCahrt.emit(event);
  }

  drag(event, indexSource) {
    event.dataTransfer.setData("column", JSON.stringify(this.columns[indexSource]));
    event.dataTransfer.setData("index", indexSource);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event, indexTarget) {
    event.preventDefault();
    let data = event.dataTransfer.getData("column");
    let ind = parseInt(event.dataTransfer.getData("index"));
    var aux = this.columns[ind];
    var b = [].concat(this.columns.slice(0, ind), this.columns.slice(ind + 1));
    this.columns = [].concat(b.slice(0, indexTarget), JSON.parse(data), b.slice(indexTarget));
  }

  freezedColumn(index: number, cell: any) {
    if (cell != null && cell.configCol != null) {
      return cell.configCol.freez;
    }
    return index == 0;
  }

  adaptOffset(index: number, cell: any) {
    let offset: number;
    let indexFreezed = this.freezedColumns.findIndex(o => Object.is(o, cell));
    if (indexFreezed > -1) {
      offset = (indexFreezed + 1) * this.cellWidth + 10;
    } else {
      offset = index * this.cellWidth + 10;
    }
    return offset;
  }

  isFreezedColumn(index: number, header: any) {
    let obj = this.freezedColumns.find(o => o.columnName === header.columnName);
    if (obj != null || index == 0) {
      return true;
    }
    return false;
  }

  get staticMargin() {
    return TableComponent.margin;
  }

  loadFreezedColumns() {
    for (let c of this.columns) {
      if (c.configCol != null && c.configCol.freez) {
        this.freezedColumns.push(c);
      }
    }
    TableComponent.margin = (this.freezedColumns.length == 0) ? 90 : (this.freezedColumns.length * this.cellWidth) + 90;
  }

}
