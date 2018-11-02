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
        password: 'zoye123'
    };

    constructor(public navCtrl: NavController, private webService: WebService) {

    }

    // Attempt to login in through our User service
    doLogin() {
        this.webService.login(this.account).subscribe(
            data => {
                if (data.success == true) {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                    window.localStorage.setItem('token', data.data.userData.token);
                    window.localStorage.setItem('firstname', data.data.userData.fname);
                    window.localStorage.setItem('lastname', data.data.userData.lname);
                    window.localStorage.setItem('profileImage', data.data.userData.image);

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