import { EmailPreferencePage } from '../emailPreference/emailPreference';
import { ChangePasswordPage } from '../changePassword/changePassword';
import { ChangeProfileDataPage } from '../changeProfileData/changeProfileData';
import { SearchResultsPage } from '../searchResults/searchResults';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    templateUrl: "myCorner.html",
    selector: "page-mycorner"
})

export class MyCornerPage{
    changeProfileDataPage = ChangeProfileDataPage;
    changePasswordPage = ChangePasswordPage;
    emailPreferencePage = EmailPreferencePage;
    constructor(public navCtrl: NavController, public navParams: NavParams){

    }
    searchResultsPage(pageTitle, anotherTitle){
        this.navCtrl.push(SearchResultsPage, {
            title: pageTitle,
            subTitle: anotherTitle
        });
    }
}