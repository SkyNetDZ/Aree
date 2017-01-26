import {Component, OnInit, Output, EventEmitter, ViewEncapsulation} from "@angular/core";
import {ConfColumnService} from "./conf-column.service";

export enum Natures {
  Energy_finaly = <any> "Energie final",
  Energy_primary = <any> "Energie primaire",
  Co2 = <any> "CO2",
  Price = <any> "Côut",
}
export enum Periods {
  Year = <any> "Année",
  Month = <any> "Mois",
  Week = <any> "Semaine",
  Day = <any> "Jour",
}
@Component({
  selector: 'app-conf-column',
  templateUrl: 'conf-column.component.html',
  styleUrls: ['conf-column.component.css']
  // encapsulation: ViewEncapsulation.None
})


export class ConfColumnComponent implements OnInit {

  private columnName: string;
  private dataIndex: string;
  private consommation: boolean;
  private tendance: boolean;
  private StartDate: Date;
  private EndDate: Date;
  private nature: any;
  private Unit: any;
  private decalage: number;
  private natures = [Natures.Energy_finaly, Natures.Energy_primary, Natures.Co2, Natures.Price];
  private periods = [Periods.Day, Periods.Week, Periods.Month, Periods.Year];

  private show: boolean = false;
  private displayMenu: string = 'none';

  private columnConfigs: Array<any>;

  @Output() configChange = new EventEmitter();

  @Output() configSave = new EventEmitter();

  constructor() {
    this.columnConfigs = [];
  }

  ngOnInit() {
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
}
