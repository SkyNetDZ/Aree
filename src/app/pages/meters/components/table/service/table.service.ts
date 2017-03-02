import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Headers, Jsonp} from "@angular/http";
import Rx from 'rxjs/Rx';

@Injectable()
export class TableService {

  private serverHost = 'localhost';
  private urlMeters: string = 'http://' + this.serverHost + '/AREEService/meters';
  private urlLocation: string = 'http://' + this.serverHost + '/AREEService/locations';
  private urlUnit: string = 'http://' + this.serverHost + '/AREEService/Units';
  private urlNature: string = 'http://' + this.serverHost + '/AREEService/Natures';
  private urlConsommation: string = 'http://' + this.serverHost + '/AREEService/GetConsumptionData';
  private urlHistotry: string = 'http://' + this.serverHost + '/AREEService/GetConsumptionHistoryEx';
  private urlCostumValue: string = 'http://' + this.serverHost + '/AREEService/GetMeterData';
  private socket: Rx.Subject<MessageEvent>;

  constructor(private _http: Http) {
  }

  loadMeters() {
    let params = new URLSearchParams();
    let header = new Headers();
    // header.append('Access-Control-Allow-Origin' , '*');
    params.set('session', localStorage.getItem('session_key'));
    return this._http.get(this.urlMeters, {search: params})
      .map(res => res.json());

  }

  // loadMappingLocation() {
  //   let ws = new WebSocket(this.urlLocation);
  //   let observable = Rx.Observable.create(
  //       (obs: Rx.Observer<MessageEvent>) => {
  //           ws.onmessage = obs.next.bind(obs);
  //           ws.onerror = obs.error.bind(obs);
  //           ws.onclose = obs.complete.bind(obs);
  //           return ws.close.bind(ws);
  //       }
  //   );
  //   let observer = {
  //       next: (data: Object) => {
  //           if (ws.readyState === WebSocket.OPEN) {
  //               ws.send(JSON.stringify(data));
  //           }
  //       },
  //   };
  //   return Rx.Subject.create(observer, observable);
  // }

  loadMappingLocation() {
    let params = new URLSearchParams();
    params.set('session', localStorage.getItem('session_key'));
    return this._http.get(this.urlLocation, {search: params})
      .map(res => res.json());
  }

  loadMappingUnit() {
    let params = new URLSearchParams();
    params.set('session', localStorage.getItem('session_key'));
    return this._http.get(this.urlUnit, {search: params})
      .map(res => res.json());
  }

  loadMappingNature() {
    let params = new URLSearchParams();
    params.set('session', localStorage.getItem('session_key'));
    return this._http.get(this.urlNature, {search: params})
      .map(res => res.json());
  }

  loadMappingDuration() {
    let params = new URLSearchParams();
    params.set('session', localStorage.getItem('session_key'));
    return this._http.get(this.urlNature, {search: params})
      .map(res => res.json());
  }

  public getConsumption() {
    let headers = new Headers();
    let body = {
      "SessionKey": localStorage.getItem('session_key'),
      "EntityIds": JSON.parse(localStorage.getItem('meters_id')),
      "EntityType": 0,  // module id
      "Extrapolate": false, //
      "Periods": [
        {
          "Duration": 1, // nombre units période
          "PeriodUnit": 4, // type de unité période
          "Start": "\/Date(" + Date.now() + "+100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 5,
          "Start": "\/Date(" + Date.now() + "+100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 6,
          "Start": "\/Date(" + Date.now() + "+100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 7,
          "Start": "\/Date(" + Date.now() + "+100)\/"
        }
      ],
      "ServiceId": null,
      "ServiceType": 0
    };
    return this._http.post(this.urlConsommation, body, headers).map(res => res.json());
  }

  public getConsumptionPerPeriod(idMeter: number) {
    let headers = new Headers();
    let body = {
      "SessionKey": localStorage.getItem('session_key'),
      "DontRoundPeriod": false,
      "Duration": {
        "Unit": 7,
        "Value": 1
      },
      "EndDate": "/Date(-62135596800000+0000)/",
      "EntityType": 0,
      "Id": idMeter,
      "IncludeRef": true,
      "NatureId": null,
      "NoNature": false,
      "NoTariff": false,
      "Normalized": false,
      "ObjectId": null,
      "OnlyRef": false,
      "PerAreaUnit": false,
      "PerPeriod": 0,
      "Reference": null,
      "SampleDuration": {
        "Unit": 6,
        "Value": 1
      },
      "StartDate": "/Date(" + new Date(2015, 0, 1).getTime() + "+0100)/"
    };
    return this._http.post(this.urlHistotry, body, headers).map(res => res.json());
  }

  public getCostumValue(config: Object) {
    let options = JSON.parse(JSON.stringify(config));
    let headers = new Headers();
    let body = {
        "SessionKey": localStorage.getItem('session_key'),
        "EntityType": 0,
        "EntityIds": JSON.parse(localStorage.getItem('meters_id')),
        "Items": {
          "Type": parseInt(options['dataType']),
          "Date": "\/Date(" + Date.now() + "+100)\/",
          "Start": parseInt(options['periodUnit']),
          "Offset": parseInt(options['offsetPeriod']),
          "OffsetUnit": parseInt(options['periodUnit']),
          "Duration": parseInt(options['duration']),
          "DurationUnit": parseInt(options['durationUnit']),
          "Period": parseInt(options['periodUnit']),
          "NatureId": parseInt(options['nature']),
          "ConsumptionType": 0,
          "IsReference": false,
          "IsReferenceDiff": false,
          "PerAreaUnit": false
        }
      }
      ;
    return this._http.post(this.urlCostumValue, body, headers).map(res => res.json());
  }
}
