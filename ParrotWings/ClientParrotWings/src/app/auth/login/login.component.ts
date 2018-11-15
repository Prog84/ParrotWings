import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  message: Message;
  aSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
        if (params['registered']) {
          this.showMessage({
            text: 'Теперь вы можете зайти в систему',
            type: 'success'
          });
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'Для начала авторизуйтесь в системе',
            type: 'alert'
          });
        } else if (params['sessionFailed']) {
          this.showMessage({
            text: 'Пожалуйста войдите в систему заново',
            type: 'alert'
          });
        }
      }) 

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
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
    this.form.disable()
    this.aSub =  this.authService.login(this.form.value).subscribe((data : any)=>{
      localStorage.setItem('access_token',data.access_token);
      localStorage.setItem('userName',data.userName);
      localStorage.setItem('Name',data.Name);
      localStorage.setItem('userID',data.userID);
      this.authService.setToken(data.access_token);
      this.router.navigate(['/system','transaction']);
      this.form.enable()
    },
    () => {
      this.showMessage({
        text: "Имя пользователя или пароль указаны неправильно.",
        type: 'danger'
      });
      this.form.enable()
    })
  }
}
