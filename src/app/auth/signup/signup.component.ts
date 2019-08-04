import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTime } from 'luxon';

import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { StoreService } from './../../store/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  maxDate: Date;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.isLoading$ = this.storeService.getIsLoading();
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const errorsObj = this.signUpForm.controls[controlName].errors;
    return Boolean(errorsObj && errorsObj[errorName]);
  }

  onSubmit(): void {
    this.authService.registerUser({
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    });
  }

  private initForm(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      birthdate: new FormControl('', Validators.required),
      agree: new FormControl('', Validators.required)
    });

    this.maxDate = DateTime.local()
      .minus({ years: 10 })
      .toJSDate();
  }
}
