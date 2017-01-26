import {Component, OnInit, Input, EventEmitter, Output, HostListener} from '@angular/core';
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

  @Input() index: number;
  @Input() cellWidth: number;
  @Input() padding: number;

  @Output() selected = new EventEmitter<boolean>();


  @HostListener('mouseenter', ['$event'])
  mouseenter(event) {
    //event.target.parentNode.style.backgroundColor = 'green';
    this.selected.emit(true);
  }

  @HostListener('mouseleave', ['$event'])
  mouseleave(event) {
    //event.target.parentNode.style.backgroundColor = '';
    this.selected.emit(false);
  }

  constructor() {

  }

  handleAddCell() {
    console.log(this);
    console.log('add cell');
  }

}
