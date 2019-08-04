import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { StoreService } from './../../store/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.isLoading$ = this.storeService.getIsLoading().pipe(shareReplay());
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const errorsObj = this.loginForm.controls[controlName].errors;
    return Boolean(errorsObj && errorsObj[errorName]);
  }

  onSubmit(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
}
