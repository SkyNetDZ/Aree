import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableRowComponent} from './table-row/table-row.component';
import {FilterComponent} from './filter/filter.component';
import {TableColumnComponent} from './table-column/table-column.component';
import {TableCellComponent} from './table-cell/table-cell.component';
import {FirstDirective} from './table-row/table-row.component';
import {ConfColumnComponent} from './conf-column/conf-column.component';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [TableColumnComponent, TableCellComponent, TableRowComponent],
  declarations: [TableRowComponent, FilterComponent, TableColumnComponent, TableCellComponent, FirstDirective, ConfColumnComponent],
  exports: [TableRowComponent, FilterComponent, TableColumnComponent, TableCellComponent, ConfColumnComponent]
})
export class TableModule {
}
