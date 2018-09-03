import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchResultsPage } from '../../searchResults/searchResults';

@Component({
    templateUrl: "tab2.html",
    selector: "page-tab2"
})

export class tab2{
    bodyType = "";
    constructor(public navCtrl: NavController){

    }
    search() {
        console.log(this.bodyType);
        this.navCtrl.parent.parent.push(SearchResultsPage, {
            "bodyType" : this.bodyType
        });
    }
}