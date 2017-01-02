import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TableRowComponent} from "./table-row/table-row.component";
import {FilterComponent} from "./filter/filter.component";
import {TableColumnComponent} from "./table-column/table-column.component";
import {TableCellComponent} from "./table-cell/table-cell.component";

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [TableColumnComponent, TableCellComponent],
  declarations: [TableRowComponent, FilterComponent, TableColumnComponent, TableCellComponent],
  exports: [TableRowComponent, FilterComponent, TableColumnComponent, TableCellComponent]
})
export class TableModule {
}
