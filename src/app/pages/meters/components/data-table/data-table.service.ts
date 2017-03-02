import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Headers, Jsonp} from "@angular/http";
import Rx from 'rxjs/Rx';

@Injectable()
export class DataTableService {
  private serverHost = 'localhost';
  private urlMeters: string = 'http://' + this.serverHost + '/AREEService/meters';
  private urlLocation: string = 'http://' + this.serverHost + '/AREEService/locations';
  private urlUnit: string = 'http://' + this.serverHost + '/AREEService/Units';
  private urlNature: string = 'http://' + this.serverHost + '/AREEService/Natures';
  private urlConsommation: string = 'http://' + this.serverHost + '/AREEService/GetConsumptionData';
  private urlHistotry: string = 'http://' + this.serverHost + '/AREEService/GetConsumptionHistoryEx';
  private urlCostumValue: string = 'http://' + this.serverHost + '/AREEService/GetMeterData';
  private socket: Rx.Subject<MessageEvent>;

constructor(private _http :Http) { }
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


// {
//     "SessionKey": "4a3edcde-c3d2-4aff-8e2e-59ce3dd8f7a4",
//     "EntityIds": [
//         1,
//         3,
//         4,
//         5,
//         6,
//         7,
//         8,
//         9,
//         10,
//         11
//     ],
//     "EntityType": 0,
//     "Extrapolate": false,
//     "Periods": [
//         {
//             "Duration": 1,
//             "PeriodUnit": 4,
//             "Start": "/Date(1488455601145+0100)/"
//         },
//         {
//             "Duration": 1,
//             "PeriodUnit": 5,
//             "Start": "/Date(1488455601145+0100)/"
//         },
//         {
//             "Duration": 1,
//             "PeriodUnit": 6,
//             "Start": "/Date(1488455601145+0100)/"
//         },
//         {
//             "Duration": 1,
//             "PeriodUnit": 7,
//             "Start": "/Date(1488455601145+0100)/"
//         }
//     ],
//     "ServiceId": null,
//     "ServiceType": 0
// }
  public getConsumption(ids: any , dateStarts: any) {
    let dateStart = dateStarts != null && dateStarts != "" ? new Date(dateStarts).getTime() : Date.now();
    let headers = new Headers();
    let body = {
      "SessionKey": localStorage.getItem('session_key'),
      "EntityIds": ids,
      "EntityType": 0,  // module id
      "Extrapolate": false, //
      "Periods": [
        {
          "Duration": 2, // nombre units période
          "PeriodUnit": 4, // type de unité période
          "Start": "\/Date(" + dateStart + "+100)\/"
        },
        {
          "Duration": 3,
          "PeriodUnit": 5,
          "Start": "\/Date(" + dateStart + "+100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 6,
          "Start": "\/Date(" + dateStart + "+100)\/"
        },
        {
          "Duration": 1,
          "PeriodUnit": 7,
          "Start": "\/Date(" + dateStart + "+100)\/"
        }
      ],
      "ServiceId": null,
      "ServiceType": 0
    };
    return this._http.post(this.urlConsommation, body, headers).map(res => res.json());
  }

  public getConsumptionPerPeriod(idMeter: number, duration: number) {
    let headers = new Headers();
    // let dateStart = (dateStarts == "") ? (new Date().getTime()) : new Date(dateStarts).getTime();
    // let dateEnd = (dateEnds == "") ? (new Date().getTime()) : new Date(dateEnds).getTime();
    let today = new Date();
    let dateStart : any;
    switch (duration) {
      case 7: dateStart = new Date(today.getFullYear(),0,1)  ;break;
      case 6: dateStart = new Date(today.getFullYear(),today.getMonth(),1)  ;break;
      case 5: dateStart = new Date(today.getFullYear(),today.getMonth(),1)  ;break;
      case 4: dateStart = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0) ; break ;
    }
    duration = 6 ;
    let body = {
      "SessionKey": localStorage.getItem('session_key'),
      "DontRoundPeriod": false,
      "Duration": {
       "Unit": duration,
        "Value": 1
      },
      // "EndDate": "/Date(" + dateEnd + "+0100)/",
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
        "Unit": duration-1,
        "Value": 1
      },
      // "StartDate": "/Date(" + new Date(2015, 0, 1).getTime() + "+0100)/"
       "StartDate": "/Date(" +  new Date(today.getFullYear(),today.getMonth(),1).getTime() + "+0100)/"
    };
    return this._http.post(this.urlHistotry, body, headers).map(res => res.json());
  }


// {
//     "SessionKey": "4a3edcde-c3d2-4aff-8e2e-59ce3dd8f7a4",
//     "EntityIds": [
//         1,
//         3,
//         4,
//         5,
//         6,
//         7,
//         8,
//         9,
//         10,
//         11
//     ],
//     "EntityType": 0,
//     "Extrapolate": false,
//     "Periods": [
//         {
//             "Duration": 1,
//             "PeriodUnit": 4,
//             "Start": "/Date(1488455601145+0100)/"
//         },
//         {
//             "Duration": 1,
//             "PeriodUnit": 5,
//             "Start": "/Date(1488455601145+0100)/"
//         },
//         {
//             "Duration": 1,
//             "PeriodUnit": 6,
//             "Start": "/Date(1488455601145+0100)/"
//         },
//         {
//             "Duration": 1,
//             "PeriodUnit": 7,
//             "Start": "/Date(1488455601145+0100)/"
//         }
//     ],
//     "ServiceId": null,
//     "ServiceType": 0
// }
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
