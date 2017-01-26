import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-table-column',
  templateUrl: 'table-column.component.html',
  styleUrls: ['table-column.component.css']
})
export class TableColumnComponent implements OnInit {

  public name: string;
  public model: any;
  public field: string;
  public hidden: boolean;
  public filter: any;

  constructor() {
  }

  ngOnInit() {
  }

  addColumn(){
  }

}
