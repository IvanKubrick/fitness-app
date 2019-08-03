import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { DateTime } from 'luxon';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  maxDate: Date;
  isLoading: boolean = false;

  private loadingSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (value: boolean) => {
        this.isLoading = value;
        this.changeDetectorRef.markForCheck();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const errorsObj = this.signUpForm.controls[controlName].errors;
    return Boolean(errorsObj && errorsObj[errorName]);
  }

  onSubmit(): void {
    console.log(this.signUpForm);
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
