import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { StepOnePage } from '../step-one/step-one';

@Component({
  selector: 'page-addadvertisement',
  templateUrl: 'addAdvertisement.html'
})
export class AddAdvertisementPage {
  makes: any;
  make: any;
  models: any;
  model: any;
  monthYear: any;
  makeModel: any;
  minYear: any;


  constructor(public navCtrl: NavController, private webService: WebService) {
    let date = new Date();
    this.minYear = date.getFullYear() - 15;
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

next(){
  this.navCtrl.setRoot(StepOnePage);
}

  

}
