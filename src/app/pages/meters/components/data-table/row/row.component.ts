import {Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';
import { DataTableService} from '../data-table.service';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent {

  @Input() rows : [any];
  @Input() columns : [any];
  @Input() level : number = 0 ;
  private colLevel = new Array();
  @Input() treeView : boolean;
  @Input() sectionType : [number];
  @Output() dataChart = new EventEmitter();
  @Output() indexSelectedRow =new EventEmitter();


  constructor(private service : DataTableService) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes){
   if(changes.level != null){
     for(let i=0 ; i < changes.level.currentValue;i++){
       this.colLevel.push(1)
     }
   }
   if(changes.treeView != null) {
     for(let row of this.rows){
         row.expanded = true;
     }
   }
  }

  checkRow(event, model) {
    console.log(model.Id);
    this.indexSelectedRow.emit(model.Id);
  //   this.service.getConsumptionPerPeriod(model.Id)
  //     .subscribe(
  //       d => this.dataChart.emit(JSON.parse(JSON.stringify(d))['Data'][0]['Data']),
  //       error => console.log(error),
  //       () => console.log('finish load data')
  //     );
  }
}
