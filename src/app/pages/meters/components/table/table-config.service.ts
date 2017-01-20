/**
 * Created by INNEASOFT on 20/01/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Jsonp} from '@angular/http';

@Injectable()
export class TableConfigService {


  constructor(private _jsonp: Jsonp, private _http: Http) {
  }

  saveConfig(columns: Array<any>) {
    console.log("saving config data");
    console.log(columns);
    localStorage.setItem('table_config', JSON.stringify(columns));
  }

  loadConfg(): Array<any> {

    //Read from file


    //Read from localstorage of web browser
    console.log("loading config data");
    return JSON.parse(localStorage.getItem('table_config'));
  }
}
