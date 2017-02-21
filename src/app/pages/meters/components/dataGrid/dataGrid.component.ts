import {Component, OnInit, ViewEncapsulation, ViewChild, Input, Directive} from '@angular/core';

@Component({
  selector: 'app-dataGrid',
  templateUrl: './dataGrid.component.html',
  styleUrls: ['./dataGrid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DataGridComponent implements OnInit {

  @Input() rows: [any];

  @Input() headerHidden: boolean = false;

  private columns: Array<any> = [
    {columnName: 'Name', dataIndex: 'Name'},
    {columnName: 'Nature', dataIndex: 'Nature'},
    {columnName: 'Unité', dataIndex: 'UniteName'},
    {columnName: 'Emplacement', dataIndex: 'LocationName'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onClickAddColumn() {
    this.columns.push({columnName: 'new column', dataIndex: '', configCol: {}});
  }

  onTreeView() {
    alert('activate Tree View')
  }


}
