import { Injectable } from '@angular/core';
import {Http, Jsonp, Headers, URLSearchParams} from '@angular/http';
import {local} from "d3-selection";

@Injectable()
export class MetersService {

  private urlConsommation: string = 'http://localhost/AREEService/GetConsumptionHistoryEx';
  private urlMeters: string = 'http://localhost/AREEService/meters';


  constructor(private _jsonp: Jsonp, private _http: Http) {
  }

  loadMeters() {
    let header = new Headers();
    let params = new URLSearchParams();
    params.set('session', localStorage.getItem('session_key'));
    return this._http.get(this.urlMeters, {search: params})
      .map(res => res.json());
  }

  public getResponsive(padding, offset) {
    return [
      ['screen and (min-width: 1550px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 1200px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 600px)', {
        chartPadding: 0,
        labelOffset: 0,
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }]
    ];
  }

  public getConsumption(meter: any) {
    console.log('from meter compoenent ');
    let headers = new Headers();
    let params = new URLSearchParams();
    params.set('session', localStorage.getItem('session_key'));
    let body = {
      "SessionKey": localStorage.getItem('session_key'),
      "EntityIds": [ // id rows
        1,
        2,
        3,
        4,
        5
      ],
      "EntityType": 0,  // module id
      "Extrapolate": false, //
      "Periods": [
        {
          "Duration": 1, // nombre units période
          "PeriodUnit": 4, // type de unité période
          "Start": "\/Date(" + Date.now() + "+0100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 5,
          "Start": "\/Date(" + Date.now() + "+0100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 6,
          "Start": "\/Date(" + Date.now() + "+0100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 7,
          "Start": "\/Date(" + Date.now() + "+0100)\/"
        }
      ],
      "ServiceId": null,
      "ServiceType": 0
    };
    return this._http.post(this.urlConsommation, body, headers).map(res => res.json());
  }

}
