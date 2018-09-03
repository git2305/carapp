import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';

@Component({
  templateUrl : "vehicleDetails.html",
  selector : "page-vehicledetails"
})

export class VehicleDetailsPage {
  vehicle : any;
  constructor(public navCtrl: NavController, public navParams : NavParams, public webService: WebService) {
      this.vehicle = this.navParams.get("vehicle");
  }

  buyNowVehicle(){
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
}
