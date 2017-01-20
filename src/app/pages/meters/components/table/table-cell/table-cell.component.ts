import {Component, OnInit} from '@angular/core';
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

  constructor() {
  }

  handleAddCell() {
    console.log(this);
    console.log('add cell');
  }

}
