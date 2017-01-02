import {Component, Input, ContentChildren, QueryList, ElementRef} from "@angular/core";
import {Directory} from "../model/Directory";
import {Meter} from "../model/Meter";
import {String} from "shelljs";

@Component({
  selector: 'app-table-row',
  templateUrl: 'table-row.component.html',
  styleUrls: ['table-row.component.css']
})
export class TableRowComponent {

  @Input() children: Array<Meter>;

  @Input() padding: number;

  @Input() columns: Array<String>;

  @ContentChildren('row') items: QueryList<ElementRef>;

  constructor() {
  }

  ngAfterContentInit() {
  }

}
