import {Component, OnInit, Input} from '@angular/core';
import { TableColumnComponent } from '../table-column/table-column.component';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
  selector: 'app-table-cell',
  templateUrl: 'table-cell.component.html',
  styleUrls: ['table-cell.component.css']
})
export class TableCellComponent {

  private content: string;
  private parentRow : TableRowComponent;
  private parentColumn : TableColumnComponent;


  @Input() cellWidth: number;
  @Input() padding: number;

  constructor() {
  }

  handleAddCell() {
    console.log(this);
    console.log('add cell');
  }

}
