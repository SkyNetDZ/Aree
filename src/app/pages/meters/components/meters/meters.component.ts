import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MetersService } from './meters.service';
import { DataTableComponent } from '../data-table/data-table.component'
import * as d3 from 'd3';

@Component({
  selector: 'aree-meters',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./meters.scss')],
  template: require('./meters.html'),
})

export class Meters {

  @ViewChild('table') dataTable: DataTableComponent;

  // ------------------------------------------------- //

  meters: any;
  selectedFirst: boolean = true;
  selectedMeter: number;
  public dataTemp: [any];
  private dateStart: string;
  private dateEnd: string;
  private duration: any;
  private loaded: boolean = false;
  private activatedTab : number;

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
  // Load Data Chart 
  loadDataChart(event) {
    this.dataTemp = event;
  }

  // Loading data consumption for heat map
  loadConsuptionData(dateStart: string, dateEnd: string, duration: number) {
    if (this.dataTable != null && duration != null) {
      this.dataTable
        .service
        .getConsumptionPerPeriod(this.selectedMeter, parseInt(this.duration))
        .subscribe(
        d => { this.dataTemp = d.Data["0"].Data; this.loaded = false },
        error => console.log(error),
        () => this.loaded = true
        )
    } else {
      return false;
    }
  }

  reloadDataChart(dateStart: string, dateEnd: string, duration: number) {
    if (this.dataTable != null && dateStart != null) {
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
      this.duration = duration;
      this.dataTable
        .service
        .getConsumption(this.selectedMeter, this.dateStart)
        .subscribe(
        //  d => this.dataTemp.push(d),
        d => console.log(d),
        error => console.log(error),
        () => console.log('finish')
        )
    } else {
      return false;
    }
  }

  selectionRow(event) {
    console.log(event);
    this.selectedMeter = event;
  }

}
