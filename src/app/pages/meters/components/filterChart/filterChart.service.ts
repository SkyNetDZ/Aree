/**
 * Created by Inneasoft on 23/11/2016.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
// import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class FilterChartService {

  constructor(private _http: Http) {
  }

  ngOnInit(): void {
  }
}
