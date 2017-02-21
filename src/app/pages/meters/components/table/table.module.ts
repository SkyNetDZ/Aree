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
import {StoreModule} from "@ngrx/store";
import {INITIAL_STATE, State} from "./store/state";
import {TableAction, TABLE_METER_ACTION} from "./store/action";
import {Action} from "@ngrx/store";


function storeReducer(state: State, action: Action): State {

  switch (action.type) {
    case TABLE_METER_ACTION :
      return handleTableMeterAction(state, action);
    default :
      return state;
  }
}


function handleTableMeterAction(state: State, action: TableAction): State {
  const newData = action.payload;
  const newState: State = Object.assign({}, state);
  newState.storeData.meters = _.keyBy(action.payload, 'Id');
  return newState;
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(storeReducer, INITIAL_STATE)
  ],
  entryComponents: [TableColumnComponent, TableCellComponent, TableRowComponent],
  declarations: [TableRowComponent, FilterComponent, TableColumnComponent, TableCellComponent, FirstDirective, ConfColumnComponent],
  exports: [TableRowComponent, FilterComponent, TableColumnComponent, TableCellComponent, ConfColumnComponent],
  providers: [ConfColumnService, TableConfigService, TableService]
})
export class TableModule {
}
