import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from '../services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authenticate(email, password);
  }

  onSwitchAuth() {
    this.isLogin = !this.isLogin;
  }

  private authenticate(email: string, password: string): void {
    this.isLoading = true;
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'Logging in..',
      })
      .then((el) => {
        el.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.auth.login(email, password);
        } else {
          authObs = this.auth.singup(email, password);
        }
        authObs.subscribe(
          (respData) => {
            this.isLoading = false;
            el.dismiss();
            this.router.navigateByUrl('home');
          },
          (err) => {
            el.dismiss();
            const code = err.error.error.message;
            let message = 'No se puedo registrar, por vafor intente de nuevo';

            if (code === 'EMAIL_EXISTS') {
              message = 'El Email ya existe';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'Email no existe';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'Credenciales incorrectas';
            }
            this.showAlert(message);
          }
        );
      });
  }

  private showAlert(message: string): void {
    this.alertCtrl
      .create({ header: 'Autenticacion fallo', message, buttons: ['Ok'] })
      .then((el) => el.present());
  }
}
