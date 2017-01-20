import {Component, OnInit, Output, EventEmitter, ViewEncapsulation} from "@angular/core";
import {ConfColumnService} from "./conf-column.service";

@Component({
  selector: 'app-conf-column',
  templateUrl: 'conf-column.component.html',
  styleUrls: ['conf-column.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class ConfColumnComponent implements OnInit {

  private consommation: boolean;
  private tendance: boolean;
  private dateStart: boolean;
  private dateEnd: boolean;


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
    this.configSave.emit(values);
  }

  onShow() {
    this.show = !this.show;
    this.displayMenu = !this.show ? 'none' : 'block';
  }
}
