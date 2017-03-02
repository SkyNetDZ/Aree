import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { CellComponent } from './cell/cell.component';
import { HeaderComponent } from './header/header.component';
import { RowComponent } from './row/row.component';
import { SettingComponent } from './setting/setting.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {FormsModule} from "@angular/forms";
import { DataTableService } from "./data-table.service";
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
    StoreModule.provideStore(storeReducer, INITIAL_STATE)
  ],
  declarations: [
    DataTableComponent,
    CellComponent,
    HeaderComponent,
    RowComponent,
    SettingComponent,
    ToolbarComponent,
],
  exports: [
    DataTableComponent,
    CellComponent,
    HeaderComponent,
    RowComponent,
    SettingComponent,
    ToolbarComponent
  ],
  providers: [DataTableService]
})
export class DataTableModule { }