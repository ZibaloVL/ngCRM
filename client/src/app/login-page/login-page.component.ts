import { Component, OnInit, OnDestroy } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      email: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl ( null, [Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.registered) {
          // тепреь можете зайти в системму
        } else if (params.accessDenied) {
          // для начала авторизируйтесь в системме
        }
      }
    );
  }
  ngOnDestroy() {
    if ( this.aSub) {
      this.aSub.unsubscribe();
    }
  }
  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.login ( this.form.value)
      .subscribe(
        () => {
          console.log('Login success');
          this.router.navigate(['/overview']);
        },
        error => {
          console.warn( error );
          this.form.enable();
        }
      );
  }
}
