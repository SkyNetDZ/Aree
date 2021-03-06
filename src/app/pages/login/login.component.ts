import {Component, ViewEncapsulation} from "@angular/core";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
  providers: [LoginService]
})
export class Login {

  public form: FormGroup;
  public username: AbstractControl;
  // public email:AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public loginService: LoginService;
  public router: Router;
  public user = {
    Name: this.username,
    Password: this.password
  };

  constructor(fb: FormBuilder, loginService: LoginService, router: Router) {
    this.router = router;
    this.loginService = loginService;
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      this.loginService.createSession(this.user)
        .subscribe(
          (result) => {
            if (result) {
              this.router.navigate(['dashboard']);
            }
          });
    }
  }
}
