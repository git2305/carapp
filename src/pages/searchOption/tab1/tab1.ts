import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchResultsPage } from '../../searchResults/searchResults';
import { WebService } from '../../../providers/web-service';

@Component({
    templateUrl: "tab1.html",
    selector: "page-tab1"
})

export class tab1 {
    @ViewChild('searchbar')
    searchResultsPage = SearchResultsPage;
    regions: Array<{ value: string, text: string, checked: boolean }> = [];
    selectedRegion = "";
    minYear:any = "";
    maxYear:any = "";
    make = "";
    model = "";
    makes = [];
    models = [];

    
    constructor(public navCtrl: NavController, private webService: WebService) {

        let date = new Date();
        this.maxYear = date.getFullYear();

        this.webService.getAllRegions().subscribe(
            data => {
                console.log(data);
                if (data) {
                    for (var i in data) {
                        this.regions.push({ value: i, text: data[i], checked: false });
                    }
                    console.log(this.regions);
                } else {
                    this.webService.presentToast(data.message);
                }
            },
            err => {
                this.webService.presentToast("Some error occured.");
                console.log(err);
            }
        );
    }
    searchMake(value) {
        console.log(value);
        if (value) {
            this.webService.getAllMake(value).subscribe(
                data => {
                    console.log(data);
                    if (data) {
                        this.makes = data;
                    } else {
                        this.webService.presentToast(data.message);
                    }
                },
                err => {
                    this.webService.presentToast("Some error occured.");
                    console.log(err);
                }
            );
        }else{
            this.makes = [];
        }
    }
    makeSelected(value){
        this.make = value;
        this.makes = [];
    }

    searchModel(value) {
        console.log(value);
        if (value) {
            this.webService.getAllModel(value, this.make).subscribe(
                data => {
                    console.log(data);
                    if (data) {
                        this.models = data;
                    } else {
                        this.webService.presentToast(data.message);
                    }
                },
                err => {
                    this.webService.presentToast("Some error occured.");
                    console.log(err);
                }
            );
        }else{
            this.models = [];
        }
    }
    modelSelected(value){
        this.model = value;
        this.models = [];
    }

    search() {
        console.log(this.make);
        console.log(this.model);
        console.log(this.selectedRegion);
        console.log(this.minYear);
        console.log(this.maxYear);
        this.navCtrl.parent.parent.push(SearchResultsPage, {
            "make" : this.make,
            "model" : this.model,
            "region" : this.selectedRegion,
            "minYear" : this.minYear,
            "maxYear" : this.maxYear
        });
    }
}