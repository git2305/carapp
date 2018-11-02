import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { HomePage } from '../../pages/home/home';

@Component({
  templateUrl: "vehicleDetails.html",
  selector: "page-vehicledetails"
})

export class VehicleDetailsPage {
  vehicle: any;
  bidArr: any;
  buyerArr: any;
  baseUrl:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public webService: WebService, private alertCtrl: AlertController) {

    this.baseUrl = this.webService.baseUrl;

    this.vehicle = this.navParams.get("vehicle");

    this.webService.getVehicleBids(this.vehicle.Vehicle.id).subscribe(
      data => {

        if (data.success == true) {
          this.webService.hideLoading();
          //this.webService.presentToast(data.message);
          this.bidArr = data.data.bidDropDown;
          this.buyerArr = data.data.buyerArr;
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

  buyNowVehicle() {
    this.webService.buyNow().subscribe(
      data => {
        console.log(data);
        if (data.success == true) {
          this.webService.hideLoading();
          this.webService.presentToast(data.message);
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

  openBidModal() {

    let alert = this.alertCtrl.create({
      title: 'Bid',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Bid',
          handler: data => {
            console.log(data);
            this.bidVehicle(data);
          }
        }
      ]
    });

    let i = 0;
    for (const amount in this.bidArr) {
      var inputObj = { type: 'radio', label: 'CHF ' + amount, value: amount, checked : false };
      if (i == 0) {
        inputObj.checked = true;
      }
      alert.addInput(inputObj);
      i++;
    }

    alert.present();

  }

  bidVehicle(bidAmount){
  
    this.webService.bidVehicle(this.vehicle.Vehicle.id, bidAmount).subscribe(
      data => {
        console.log(data);
        if (data.success == true) {
          this.webService.hideLoading();
          this.webService.presentToast(data.message);
          this.navCtrl.setRoot(HomePage);
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
