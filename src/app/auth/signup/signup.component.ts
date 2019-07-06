import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  hasControlError(controlName: string, errorName: string) {
    const errorsObj = this.signUpForm.controls[controlName].errors;
    return Boolean(errorsObj && errorsObj[errorName]);
  }

  onSubmit() {
    console.log(this.signUpForm);
  }
}
