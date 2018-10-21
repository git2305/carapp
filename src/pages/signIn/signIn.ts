import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';

@Component({
    templateUrl: "signIn.html",
    selector: "page-signin"
})

export class SignInPage {
    
    homePage = HomePage;
    registrationPage = RegistrationPage;
    account: { username: string, password: string } = {
        username: 'zoye123',
        password: '123456'
    };

    constructor(public navCtrl: NavController, private webService: WebService) {

    }

    // Attempt to login in through our User service
    doLogin() {
        this.webService.login(this.account).subscribe(
            data => {
                console.log(data);
                if (data.success == true) {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                    window.localStorage.setItem('token', data.data[0].token);
                    this.navCtrl.setRoot(HomePage);
                } else {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                }
            },
            err => {
                this.webService.loading.dismiss();
                this.webService.presentToast("Some error occured.");
                console.log(err);
            }
        );
    }
}