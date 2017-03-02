import {Action} from "@ngrx/store";
import {Meter} from "../model/Meter";

export const TABLE_METER_ACTION = 'TABLE_METER_ACTION';

export class TableAction implements Action {

   readonly type = TABLE_METER_ACTION ;

  constructor(public payload?: [Meter]) {
  }
}
