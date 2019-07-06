import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DateTime } from 'luxon';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  maxDate: Date;

  constructor() {}

  ngOnInit() {
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

  hasControlError(controlName: string, errorName: string) {
    const errorsObj = this.signUpForm.controls[controlName].errors;
    return Boolean(errorsObj && errorsObj[errorName]);
  }

  onSubmit() {
    console.log(this.signUpForm);
  }
}
