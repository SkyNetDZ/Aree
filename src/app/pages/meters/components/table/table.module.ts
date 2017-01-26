import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableRowComponent} from './table-row/table-row.component';
import {FilterComponent} from './filter/filter.component';
import {TableColumnComponent} from './table-column/table-column.component';
import {TableCellComponent} from './table-cell/table-cell.component';
import {FirstDirective} from './table-row/table-row.component';
import {ConfColumnComponent} from './conf-column/conf-column.component';
import {ConfColumnService} from "./conf-column/conf-column.service";
import {TableConfigService} from "./table-config.service";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {TableService} from "./service/table.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  entryComponents: [TableColumnComponent, TableCellComponent, TableRowComponent],
  declarations: [TableRowComponent, FilterComponent, TableColumnComponent, TableCellComponent, FirstDirective, ConfColumnComponent],
  exports: [TableRowComponent, FilterComponent, TableColumnComponent, TableCellComponent, ConfColumnComponent],
  providers: [ConfColumnService, TableConfigService, TableService]
})
export class TableModule {
}
