import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registr-page',
  templateUrl: './registr-page.component.html',
  styleUrls: ['./registr-page.component.scss']
})
export class RegistrPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl( null, [ Validators.required, Validators.email ]),
      password: new FormControl( null , [ Validators.required, Validators.minLength(6) ])
    });
  }

  ngOnDestroy() {
    if ( this.aSub ) { this.aSub.unsubscribe(); }
  }

  onSubmit() {
    this.form.disable();
    this.auth.register( this.form.value )
      .subscribe(
        () => {
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          });
        },
        error => {
          console.log(error);
        }
      );
  }
}