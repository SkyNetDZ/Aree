import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers } from '@angular/http';

@Injectable()
export class MetersService {

  private urlConsommation: string = 'http://localhost/AREEService/GetConsumptionHistoryEx';

  // private _data = {
  //   simpleLineOptions: {
  //     color: this._baConfig.get().colors.defaultText,
  //     fullWidth: true,
  //     height: '300px',
  //     chartPadding: {
  //       right: 40
  //     }
  //   },
  //   simpleLineData: {
  //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  //     series: [
  //       [20, 20, 12, 45, 50],
  //       [10, 45, 30, 14, 12],
  //       [34, 12, 12, 40, 50],
  //       [10, 43, 25, 22, 16],
  //       [3, 6, 30, 33, 43]
  //     ]
  //   },
  //   areaLineData: {
  //     labels: [1, 2, 3, 4, 5, 6, 7, 8],
  //     series: [
  //       [5, 9, 7, 8, 5, 3, 5, 4]
  //     ]
  //   },
  //   areaLineOptions: {
  //     fullWidth: true,
  //     height: '300px',
  //     low: 0,
  //     showArea: true
  //   },
  //   biLineData: {
  //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //     series: [
  //       [1, 2, 3, 1, -2, 0, 1],
  //       [-2, -1, -2, -1, -2.5, -1, -2],
  //       [0, 0, 0, 1, 2, 2.5, 2],
  //       [2.5, 2, 1, 0.5, 1, 0.5, -1]
  //     ]
  //   },
  //
  //   biLineOptions: {
  //     height: '300px',
  //     high: 3,
  //     low: -3,
  //     showArea: true,
  //     showLine: false,
  //     showPoint: false,
  //     fullWidth: true,
  //     axisX: {
  //       showGrid: false
  //     }
  //   },
  //   simpleBarData: {
  //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //     series: [
  //       [15, 24, 43, 27, 5, 10, 23, 44, 68, 50, 26, 8],
  //       [13, 22, 49, 22, 4, 6, 24, 46, 57, 48, 22, 4]
  //     ]
  //   },
  //   simpleBarOptions: {
  //     fullWidth: true,
  //     height: '300px'
  //   },
  //   multiBarData: {
  //     labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
  //     series: [
  //       [5, 4, 3, 7],
  //       [3, 2, 9, 5],
  //       [1, 5, 8, 4],
  //       [2, 3, 4, 6],
  //       [4, 1, 2, 1]
  //     ]
  //   },
  //   multiBarOptions: {
  //     fullWidth: true,
  //     height: '300px',
  //     stackBars: true,
  //     axisX: {
  //       labelInterpolationFnc: function (value) {
  //         return value.split(/\s+/).map(function (word) {
  //           return word[0];
  //         }).join('');
  //       }
  //     },
  //     axisY: {
  //       offset: 20
  //     }
  //   },
  //   multiBarResponsive: [
  //     ['screen and (min-width: 400px)', {
  //       reverseData: true,
  //       horizontalBars: true,
  //       axisX: {
  //         labelInterpolationFnc: (n) => n
  //       },
  //       axisY: {
  //         offset: 60
  //       }
  //     }],
  //     ['screen and (min-width: 700px)', {
  //       stackBars: false,
  //       reverseData: false,
  //       horizontalBars: false,
  //       seriesBarDistance: 15
  //     }]
  //   ],
  //   stackedBarData: {
  //     labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
  //     series: [
  //       [800000, 1200000, 1400000, 1300000],
  //       [200000, 400000, 500000, 300000],
  //       [100000, 200000, 400000, 600000]
  //     ]
  //   },
  //   stackedBarOptions: {
  //     fullWidth: true,
  //     height: '300px',
  //     stackBars: true,
  //     axisY: {
  //       labelInterpolationFnc: function (value) {
  //         return (value / 1000) + 'k';
  //       }
  //     }
  //   },
  //   simplePieData: {
  //     series: [5, 3, 4]
  //   },
  //   simplePieOptions: {
  //     fullWidth: true,
  //     height: '300px',
  //     weight: '300px',
  //     labelInterpolationFnc: function (value) {
  //       return Math.round(value / 12 * 100) + '%';
  //     }
  //   },
  //   labelsPieData: {
  //     labels: ['Bananas', 'Apples', 'Grapes'],
  //     series: [20, 15, 40]
  //   },
  //   labelsPieOptions: {
  //     fullWidth: true,
  //     height: '300px',
  //     weight: '300px',
  //     labelDirection: 'explode',
  //     labelInterpolationFnc: function (value) {
  //       return value[0];
  //     }
  //   },
  //   simpleDonutData: {
  //     labels: ['Bananas', 'Apples', 'Grapes'],
  //     series: [20, 15, 40]
  //   },
  //   simpleDonutOptions: {
  //     fullWidth: true,
  //     donut: true,
  //     height: '300px',
  //     weight: '300px',
  //     labelDirection: 'explode',
  //     labelInterpolationFnc: function (value) {
  //       return value[0];
  //     }
  //   }
  // };
  //
  // constructor(private _baConfig:BaThemeConfigProvider) {
  // }

  private urlMeters: string = 'http://localhost/AREEService/meters';

  constructor(private _jsonp: Jsonp, private _http: Http) {
  }

  loadMeters() {
    let header = new Headers();
    return this._http.get(this.urlMeters).map(res => res.json());
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
      'SessionKey': '9cb5c8e0-b3b4-47a4-bf45-74c9d17a0979',
      'DontRoundPeriod': false,
      'Duration': { 'Unit': 6, 'Value': 1 },
      'EndDate': '\/Date(1477954799999+0100)\/',
      'EntityType': 0,
      'Id': 1,
      'IncludeRef': false,
      'NatureId': null,
      'NoNature': true,
      'NoTariff': true,
      'Normalized': false,
      'ObjectId': null,
      'OnlyRef': false,
      'PerAreaUnit': false,
      'PerPeriod': 0,
      'SampleDuration':
      { 'Unit': 3, 'Value': 1 },
      'StartDate': '\/Date(1475272800000+0200)\/'
    };
    return this._http.post(this.urlConsommation, body, headers).map(res => res.json());
  }

}
