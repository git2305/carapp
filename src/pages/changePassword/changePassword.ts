import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';

@Component({
    templateUrl: "changePassword.html",
    selector: "page-changepassword"
})

export class ChangePasswordPage {

    currentPassword = "";
    password = "";
    confirmPassword = "";

    constructor(public navCtrl: NavController, private webService: WebService) {

    }

    changePassword() {
        if(!this.currentPassword || !this.password || !this.confirmPassword){
            this.webService.presentToast("All fields are mandatory!");
            return;
        }
        this.webService.changePassword(this.currentPassword, this.password, this.confirmPassword).subscribe(
            data => {
                console.log(data);
                this.webService.hideLoading();
                if (data.success == true) {

                } else {
                    this.webService.presentToast(data.message);
                }
            },
            err => {
                this.webService.hideLoading();
                this.webService.presentToast("Some error occured.");
                console.log(err);
            }
        );
    }
}