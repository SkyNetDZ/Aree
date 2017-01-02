import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from "@angular/core";
import {Directory} from "./model/Directory";
import {TableColumnComponent} from "./table-column/table-column.component";
import {TableCellComponent} from "./table-cell/table-cell.component";
import {TableRowComponent} from "./table-row/table-row.component";
import {Meter} from "./model/Meter";
import {forEach} from "@angular/router/src/utils/collection";
import {createTypeParameter} from "typedoc/lib/converter/factories";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.component.css']
})
export class TableComponent implements OnInit {

  children: Array<Meter> = [];

  @ViewChild('table', {read: ViewContainerRef}) container;

  @ViewChild('header', {read: ViewContainerRef}) header;

  @ViewChild(TableRowComponent, {read: ViewContainerRef}) row;

  @ViewChild('column') column;

  columns = [
    {columnName: "N°", dataIndex: "Id"},
    {columnName: "Designation", dataIndex: "Name"},
    {columnName: "Description", dataIndex: "Description"}
  ];
  // ,
  // ,
  // "AlarmIds",
  // "CoefCommonUnit",
  // "CoefDistribution",
  // "CoefUnit",
  // "DailyMax",
  // "Description",
  // "Formula",
  // "IsDiff",
  // "IsDisabled",
  // "LocationId",
  // "ParentId",
  // "RefFormula",
  // "RefSamplePeriod",
  // "ReferenceYear",
  // "RolloverLimit",
  // "ServiceId",
  // "SourceMode",
  // "ThresholdId",
  // "TrendId",
  // "TrendIds",
  // "UnitId",
  // "UseTheoreticalRef",
  // "Version"];
  widgetRef;
  widgetRef2;

  numbreLignes: number;

  numberColumns: number;

  data = [{
    Id: 1,
    Name: "Eclairage bureaux",
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
      Name: "Eclairage RC",
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
      ParentId: 4,
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
      Name: "Eau",
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
      ParentId: 5,
      RefFormula: "",
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
    },
    {
      Id: 4,
      Name: "Chauffage",
      AlarmIds: null,
      CoefCommonUnit: 0,
      CoefDistribution: 100,
      CoefUnit: 1,
      DailyMax: 0,
      Description: null,
      Formula: null,
      IsDiff: false,
      IsDisabled: false,
      LocationId: 1,
      ParentId: null,
      RefFormula: null,
      RefSamplePeriod: 4,
      ReferenceYear: null,
      RolloverLimit: 0,
      ServiceId: 1,
      SourceMode: 0,
      ThresholdId: null,
      TrendId: 7,
      TrendIds: null,
      UnitId: null,
      UseTheoreticalRef: null,
      Version: 0
    },
    {
      Id: 5,
      Name: "Climatisation",
      AlarmIds: null,
      CoefCommonUnit: 0,
      CoefDistribution: 100,
      CoefUnit: 1,
      DailyMax: 0,
      Description: null,
      Formula: null,
      IsDiff: false,
      IsDisabled: false,
      LocationId: 1,
      ParentId: 4,
      RefFormula: null,
      RefSamplePeriod: 4,
      ReferenceYear: null,
      RolloverLimit: 0,
      ServiceId: 5,
      SourceMode: 0,
      ThresholdId: null,
      TrendId: 8,
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

  ngAfterViewInit() {
  }


  //TODO : Adding new columns and resizing existing columns
  onClickAddColumn() {
    const factory = this.resolver.resolveComponentFactory(TableColumnComponent);
    this.widgetRef = this.header.createComponent(factory);

    //insert TableCellCompoenent as last child foreach TableRowCompoenent
    const factory2 = this.resolver.resolveComponentFactory(TableCellComponent);
    this.widgetRef2 = this.row.createComponent(factory2);


    //this.widgetRef.instance.message = "I'm last";


    // this.container.insert(this.widgetRef.hostView,0); // move comp
  }

  onClickDeleteColumn() {
  }

  toggleFilter() {

  }

  ngAfterContentInit() {


  }
}
