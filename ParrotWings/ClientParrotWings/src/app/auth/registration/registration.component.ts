import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../shared/models/user.model';
import { CustomValidators } from '../../shared/custom-validators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public frmSignup: FormGroup;
  aSub: Subscription;
  message: Message;
   
  constructor(private authService: AuthService,
  private router: Router,
  private fb: FormBuilder) {
    this.frmSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        name: [null, Validators.compose([Validators.required])],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            /*// check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: false
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: false
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: false
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: false
              }
            ),*/
            Validators.minLength(6)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]  
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

 
  ngOnInit() {
    this.message = new Message('danger', '');   
  }
  private showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.frmSignup.disable()
    const {email, password, name} = this.frmSignup.value;
    const user = new User(email, password, name);
    this.aSub = this.authService.register(user).subscribe(
      () =>  {
          this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      }, 
      () => {
        this.showMessage({
          text: "Email уже используется в системе.",
          type: 'danger'
        });
        this.frmSignup.enable()
      });
    
  }
}