import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';

/**
 * Generated class for the PreviewVehiclePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-preview-vehicle',
  templateUrl: 'preview-vehicle.html',
})
export class PreviewVehiclePage {

  vehicleTempId = window.localStorage.getItem('vehicle_temp_id');
  vehicle:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebService) {
    this.webService.getVehicleByTempId(this.vehicleTempId).subscribe(
      data => {
          
          if (data.success == true) {
              this.webService.loading.dismiss();
              this.webService.presentToast(data.message);
              this.vehicle = data.data.vehicleData;
              console.log(this.vehicle);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewVehiclePage');
  }

}
