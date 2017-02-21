import {Component, OnInit, Output, EventEmitter, ViewEncapsulation, HostListener, Input} from "@angular/core";
import {ConfColumnService} from "./conf-column.service";

export enum Natures {
  Energy_finaly = <any>"Energie final",
  Energy_primary = <any>"Energie primaire",
  Co2 = <any>"CO2",
  Price = <any>"Côut",
}
export enum Periods {
  Year = <any>"Année",
  Month = <any>"Mois",
  Week = <any>"Semaine",
  Day = <any>"Jour",
}
export enum DataTypes {
  Name = <any>"Designation",
  Location = <any>"Emplacement",
  Nature = <any>"Nature",
  Unit = <any>"Unité",
  Area = <any>"Surface",
  IndexStart = <any>"IndexStart",
  IndexStop = <any>"IndexStop",
  IndexStartDate = <any>"IndexStartDate",
  IndexStopDate = <any>"ndexStopDate",
  Consumption = <any>"Consommation",
  Trend = <any>"Tendence"
}
@Component({
  selector: 'app-conf-column',
  templateUrl: 'conf-column.component.html',
  styleUrls: ['conf-column.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class ConfColumnComponent implements OnInit {
  private dataTypes = [
    {key: DataTypes.Name, value: 0},
    {key: DataTypes.Location, value: 1},
    {key: DataTypes.Nature, value: 2},
    {key: DataTypes.Unit, value: 3},
    {key: DataTypes.Area, value: 4},
    {key: DataTypes.IndexStart, value: 5},
    {key: DataTypes.IndexStop, value: 6},
    {key: DataTypes.IndexStartDate, value: 7},
    {key: DataTypes.IndexStopDate, value: 8},
    {key: DataTypes.Consumption, value: 9},
    {key: DataTypes.Trend, value: 10}
  ];

  private freezColumn: boolean;
  columnName: string;
  dataIndex: string;
  private consommation: boolean;
  private tendance: boolean;
  private StartDate: Date;
  private EndDate: Date;
  private nature: any;
  private Unit: any;
  private decalage: number;
  private natures = [{key: Natures.Energy_finaly, value: 0}, {key: Natures.Energy_primary, value: 1}, {
    key: Natures.Co2,
    value: 2
  }, {key: Natures.Price, value: 3}];
  private periods = [{key: Periods.Day, value: 4}, {key: Periods.Week, value: 5}, {
    key: Periods.Month,
    value: 6
  }, {key: Periods.Year, value: 7}];
  private show: boolean = false;
  private displayMenu: string = 'none';
  private columnConfigs: Array<any>;
  private dataType: any;
  private periodUnit: any;
  private offsetPeriod: number;
  private durationUnit = [{key: Periods.Day, value: 4}, {key: Periods.Week, value: 5}, {
    key: Periods.Month,
    value: 6
  }, {key: Periods.Year, value: 7}];
  private duration: number;


  @Output() configChange = new EventEmitter();
  @Output() configSave = new EventEmitter();

  @Input() column: any;

  constructor() {
    this.columnConfigs = [];
  }

  ngOnInit() {
    this.columnName = this.column.columnName;
    this.dataIndex = this.column.dataIndex;
  }

  addNewConfig(elm) {
    console.log(elm.target.checked);
    if (elm.target.checked) {
      let confElm = JSON.stringify({value: elm.target.value});
      this.columnConfigs.push(confElm);
      //this.configChange.emit(this.columnConfigs);
      console.log(this.columnConfigs);
    }
  }

  purgeConfig() {
    this.columnConfigs = [];
  }


  saveConfig(values: Object) {
    console.log("send config ok");
    console.log(values);
    this.configSave.emit(values);
  }

  onShow() {
    this.show = !this.show;
    this.displayMenu = !this.show ? 'none' : 'block';
  }

  callParent(event, i) {
    console.log(event);
    console.log(i);
  }
}
