import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { PreviewVehiclePage } from '../preview-vehicle/preview-vehicle';

/**
 * Generated class for the StepThreePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-step-three',
  templateUrl: 'step-three.html',
})
export class StepThreePage {

  isActivate = false;
  vehicle: {
    min_auction_price:number,
    auction_duration: number,
    buy_price:number,
    increase_with: number,
    transport_medium: string
  } = {
    min_auction_price: 500,
    auction_duration: 1,
    buy_price: 500,
    increase_with: 50,
    transport_medium: "Local Transporters"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepThreePage');
  }

  addVehicle(){
    this.isActivate = true;
    this.webService.activateVehicle(this.vehicle, this.isActivate).subscribe(
      data => {
          console.log(data);
          if (data.success == true) {
              this.webService.loading.dismiss();
              this.webService.presentToast(data.message);
              window.localStorage.removeItem('vehicle_temp_id');
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

  previewVehicle(){
     this.navCtrl.push(PreviewVehiclePage, {
       vehicleId : window.localStorage.getItem('vehicle_temp_id')
     });
  }

}
