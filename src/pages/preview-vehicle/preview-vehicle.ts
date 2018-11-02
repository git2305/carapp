import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { HomePage } from '../../pages/home/home';
import { ConditionalExpr } from '@angular/compiler/src/output/output_ast';

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

    public vehicleTempId = window.localStorage.getItem('vehicle_temp_id');
    public vehicle:any;
    public baseUrl:string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebService) {
        this.baseUrl = this.webService.baseUrl;
        if (this.vehicleTempId != null) {
            this.webService.getVehicleByTempId(this.vehicleTempId).subscribe(
                data => {

                    if (data.success == true) {
                         this.webService.loading.dismiss();
                        // this.webService.presentToast(data.message);
                        this.vehicle = data.data.vehicleData;
                        console.log('Vehicle data log');
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
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PreviewVehiclePage');
    }

    activateVehicle() {
        this.webService.updateVehicleStatus().subscribe(
            data => {

                if (data.success == true) {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                    this.navCtrl.setRoot(HomePage);
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

}
