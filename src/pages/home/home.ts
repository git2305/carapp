import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { VehicleDetailsPage } from '../vehicleDetails/vehicleDetails';

@Component({
  templateUrl: "home.html",
  selector: "page-home"
})
export class HomePage {
  auctionData = [];
  sortBy = "";


  constructor(public navCtrl: NavController, private webService: WebService) {
    
  }
  ngOnInit() {
    this.fetchAuctionList();
  }

  sortChanged(event){
    console.log(event);
    this.fetchAuctionList();
  }

  fetchAuctionList() {
    this.webService.getAuctionList(this.sortBy).subscribe(
      data => {
        console.log(data);
        if (data.success == true) {
          this.webService.hideLoading();
          this.auctionData = data.data.auction_data;
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

  openVehicleDetailsPage(vehicle){
    this.navCtrl.push(VehicleDetailsPage, {
      vehicle : vehicle
    });
  }

}