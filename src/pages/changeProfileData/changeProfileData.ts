import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    templateUrl : "changeProfileData.html",
    selector : "page-changeprofiledata"
})

export class ChangeProfileDataPage {

    constructor(public navCtrl : NavController) {
        
    }

    save(){
        this.navCtrl.pop();
    }
}