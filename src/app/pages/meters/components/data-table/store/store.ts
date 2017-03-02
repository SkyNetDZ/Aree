
import {Meter} from "../model/Meter";
export interface StoreData {

  meters: {[ key: number]: Meter}

}

export const INITIAL_STORE_DATA: StoreData = {

  meters: {}

}
