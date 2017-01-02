/**
 * Created by Inneasoft on 19/11/2016.
 */
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
// import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class LoginService {
  private loggedIn = false;
  redirectUrl: string;

  constructor(private _http: Http) {
  }

  ngOnInit(): void {
  }

  createSession(user: any) {
    let headers = new Headers();
    // let body = this.encodeUserMd5(user, false);
    let body = user;
    return this._http.post('http://localhost/AREEService/CreateSession', body, headers)
      .map(res => res.json())
      .map((res) => {
        if (res) {
          localStorage.setItem('session_key', res.SessionKey);
          this.loggedIn = true;
        }
        return res.SessionKey;
      })
  }

  // private encodeUserMd5(user: any,activate : boolean) {
  //   if(activate){
  //     let password = Md5.hashStr(user.Password, false);
  //     user.Password = password;
  //   }
  //   return user;
  // }

  closeSession() {
    let headers = new Headers();
    let body = {SessionKey: localStorage.getItem('session_key')};
    return this._http.post('http://localhost/AREEService/CloseSession', body, headers)
      .map(res => res.json())
      .map((res) => {
        if (res) {
          localStorage.removeItem('session_key');
          this.loggedIn = false;
        }
        return res.Result;
      })
  }

  isLoggedIn() {
    console.log(this.loggedIn);
    return this.loggedIn;
  }
}



