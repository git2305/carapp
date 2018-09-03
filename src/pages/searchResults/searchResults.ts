import { VehicleDetailsPage } from '../vehicleDetails/vehicleDetails';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';

@Component({
  templateUrl: "searchResults.html",
  selector: "page-searchresults"
})

export class SearchResultsPage {
  vehicleDetailsPage = VehicleDetailsPage;
  title: String;
  subTitle: String;
  auctionData = [];
  favouriteData = [];
  myAuctionData = [];
  make = "";
  model = "";
  region = "";
  minYear = "";
  maxYear = "";
  bodyType = "";
  actionType:String;
  constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebService) {
    this.title = this.navParams.get('title') ? this.navParams.get('title') : 'Search Results';
    this.subTitle = this.navParams.get('subTitle') ? this.navParams.get('subTitle') : null;

    this.make = this.navParams.get('make');
    this.model = this.navParams.get('model');
    this.region = this.navParams.get('region');
    this.minYear = this.navParams.get('minYear');
    this.maxYear = this.navParams.get('maxYear');
    this.bodyType = this.navParams.get('bodyType');
  }

  ngOnInit() {
    if(this.title == "My Favourite Vehicles"){
      this.actionType = "favourite_vehicles";
      this.fetchFavouriteList();
    }else if(this.title == "Vehicles In Auktion"){
      this.actionType = "vehicles_in_auction";
      this.fetchMyVehicleAuctionList();
    }else if(this.title == "Vehicles Purchased"){
      this.actionType = "vehicles_purchased";
      this.fetchMyPurchasedVehicleList();
    }else if(this.title == "Vehicles Sold"){
      this.actionType = "vehicles_sold";
      this.fetchMySellVehicleList();
    }else{
      this.actionType = "vehicles_in_auction";
      this.fetchAuctionList();
    }    
  }

  fetchAuctionList() {
    this.webService.getAuctionList("", this.make, this.model, this.region, this.minYear, this.maxYear, this.bodyType).subscribe(
      data => {
        console.log(data);
        this.webService.hideLoading();
        if (data.success == true) {          
          this.auctionData = data.data.auction_data;
        } else {
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

  fetchFavouriteList() {
    this.webService.getMyFavouriteVehicleList().subscribe(
      data => {
        console.log(data);
        this.webService.hideLoading();
        if (data.success == true) {
          this.favouriteData = data.data;
        } else {
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

  fetchMyVehicleAuctionList() {
    this.webService.getMyVehicleAuctionList().subscribe(
      data => {
        console.log(data);
        this.webService.hideLoading();
        if (data.success == true) {
          this.myAuctionData = data.data;
        } else {
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

  fetchMyPurchasedVehicleList() {
    this.webService.getMyPurchasedVehicleList().subscribe(
      data => {
        console.log(data);
        this.webService.hideLoading();
        if (data.success == true) {
          this.myAuctionData = data.data;
        } else {
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

  fetchMySellVehicleList() {
    this.webService.getMySellVehicleList().subscribe(
      data => {
        console.log(data);
        this.webService.hideLoading();        
        if (data.success == true) {
          this.myAuctionData = data.data;
        } else {
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

  openVehicleDetailsPage(vehicle) {
    this.navCtrl.push(VehicleDetailsPage, {
      vehicle: vehicle
    });
  }
}