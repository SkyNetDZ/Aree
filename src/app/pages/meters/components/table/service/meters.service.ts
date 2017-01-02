import {Injectable} from "@angular/core";
import {Http, Jsonp, Headers} from "@angular/http";

@Injectable()
export class MetersService {

  url: 'http://localhost/AREEService/meters';

  constructor(private _jsonp: Jsonp, private _http: Http) {
  }

  loadMeters() {
    let header = new Headers();
    return this._http.get('http://localhost/AREEService/meters').map(res => res.json());
  }

}
