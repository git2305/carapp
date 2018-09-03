import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';

@Component({
    templateUrl: "emailPreference.html",
    selector: "page-emailpreference"
})

export class EmailPreferencePage {
    send = true;
    constructor(public navCtrl: NavController, private webService: WebService) {

    }

    save() {
        this.webService.setEmailPreferences(this.send).subscribe(
            data => {
                console.log(data);
                if (data.success == true) {
                    this.webService.hideLoading();
                    this.webService.presentToast("Email Preferences Saved.");
                } else {
                    this.webService.hideLoading();
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

    getEmailPreferences() {
        this.webService.getEmailPreferences().subscribe(
            data => {
                console.log(data);
                if (data.success == true) {
                    this.webService.hideLoading();
                    //this.send = data.data.email_preference;
                } else {
                    this.webService.hideLoading();
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