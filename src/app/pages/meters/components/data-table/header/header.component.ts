import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() columns : [any];
  @Output() droppedColumns = new EventEmitter();
  @Input() sectionType : [number];
  @Output() checkAll = new EventEmitter();
  private checked: boolean = false;

  constructor() { }

  ngOnInit() {
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
    this.droppedColumns.emit(this.columns);
  }

  checkRows(event){
    console.log(event);
    this.checkAll.emit(!this.checked);
  }


}
