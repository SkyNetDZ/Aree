import {StoreData, INITIAL_STORE_DATA} from "./store";
import {UiState, INITIAL_UI_STATE} from "./uiState";
export interface State {

    storeData : StoreData;
    uiState : UiState;
}


export const  INITIAL_STATE : State = {

  storeData : INITIAL_STORE_DATA ,
  uiState : INITIAL_UI_STATE

}
