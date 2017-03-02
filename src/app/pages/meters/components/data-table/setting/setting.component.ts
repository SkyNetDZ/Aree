import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit, ViewEncapsulation, Input , Output , EventEmitter } from '@angular/core';

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
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements AfterViewInit {

  @ViewChild('dialog') dialog: ElementRef;

  private showing: boolean = false;

  private dataTypes = [
    { key: DataTypes.Name, value: 0 },
    { key: DataTypes.Location, value: 1 },
    { key: DataTypes.Nature, value: 2 },
    { key: DataTypes.Unit, value: 3 },
    { key: DataTypes.Area, value: 4 },
    { key: DataTypes.IndexStart, value: 5 },
    { key: DataTypes.IndexStop, value: 6 },
    { key: DataTypes.IndexStartDate, value: 7 },
    { key: DataTypes.IndexStopDate, value: 8 },
    { key: DataTypes.Consumption, value: 9 },
    { key: DataTypes.Trend, value: 10 }
  ];
  private natures = [
    { key: Natures.Energy_finaly, value: 0 }, 
    { key: Natures.Energy_primary, value: 1 }, 
    { key: Natures.Co2,value: 2}, 
    { key: Natures.Price, value: 3 }];
  private periods = [
    { key: Periods.Day, value: 4 }, 
    { key: Periods.Week, value: 5 }, 
    { key: Periods.Month, value: 6}, 
    { key: Periods.Year, value: 7 }
    ];
  private durationUnit = [
    { key: Periods.Day, value: 4 }, 
    { key: Periods.Week, value: 5 }, 
    { key: Periods.Month, value: 6}, 
    { key: Periods.Year, value: 7 }
    ];

  @Input() columns: any ;
  private columnConfigs: Array<any>;
  @Output() columnsConfig = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.addEventListener('click', function () {
      dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function () {
      dialog.close();
    });
  }

  ngAfterViewInit() {
    console.log(this.dialog);
  }

  show() {
  }

  close() {
    alert('close');
  }

  // { columnName: 'Cons/Year', dataIndex: 'consYear', fixed: false, config: {} }
  saveConfig(values) {
    console.log("send config ok");
    console.log(values);
    let targetColumn = this.columns.filter(function(c){
       return c.columnName == values.name
    });
    targetColumn[0].config = values ;
    let index = this.columns.indexOf(targetColumn[0]);
    this.columns[index] = targetColumn[0];
    this.columnsConfig.emit(this.columns);
  }


}
