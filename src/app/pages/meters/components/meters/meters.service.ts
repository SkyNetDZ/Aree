import { Injectable } from '@angular/core';
import {Http, Jsonp, Headers, URLSearchParams} from '@angular/http';

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
      .map(res => res.json())
      .map(d => console.log(d.json()));
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
    let headers = new Headers();
    let body = {
      "SessionKey": "ae420b48-7c80-47b7-9c9d-ed527697dcd7",
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
          "Start": "\/Date(1485190969544+0100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 5,
          "Start": "\/Date(1485190969544+0100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 6,
          "Start": "\/Date(1485190969544+0100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 7,
          "Start": "\/Date(1485190969544+0100)\/"
        }
      ],
      "ServiceId": null,
      "ServiceType": 0
    };
    return this._http.post(this.urlConsommation, body, headers).map(res => res.json());
  }

}
