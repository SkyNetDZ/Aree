import { Component, Input, ContentChildren, QueryList, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { Directory } from '../model/Directory';
import { Meter } from '../model/Meter';
import { String } from 'shelljs';
import { TableCellComponent } from '../table-cell/table-cell.component';

@Component({
  selector: 'app-table-row',
  templateUrl: 'table-row.component.html',
  styleUrls: ['table-row.component.css']
})
export class TableRowComponent {

  @Input() children: Array<Meter>;

  @Input() padding: number;

  @Input() columns: Array<String>;

  private cells: Array<TableCellComponent>;

  @ContentChildren(TableCellComponent) items: QueryList<TableCellComponent>;

  @ViewChild(TableCellComponent) cell: TableCellComponent;


  constructor() {
  }

  ngAfterViewInit() {
    console.log(this.cell);
  }

  addCell(cell: TableCellComponent) {
  }

  deleteCell(cell: TableCellComponent) { }

}
