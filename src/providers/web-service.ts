import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WebService {

  public loading: any;
  public token: string = window.localStorage.getItem("token");
  public makes: JSON;
  public models: JSON;
  public baseUrl:string;

  constructor(public http: Http, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    //this.baseUrl = "http://localhost/carlisting/";
    this.baseUrl = "http://ef24.ch/carlisting/";
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  hideLoading(){
    this.loading.dismiss();
    this.loading = null;
  }

  login(account) {
    var url = this.baseUrl + "api/service_login";
    this.showLoading();
    let body = new FormData();
    body.append('username', account.username);
    body.append('password', account.password);
    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  register(company, user) {
    var url = this.baseUrl + "service_signup";
    this.showLoading();

    let body = new FormData();
    body.append('data[Company][name]', company.name);
    body.append('data[Company][addition]', company.addition);
    body.append('data[Company][addition]', company.addition);
    body.append('data[Company][pob]', company.pob);
    body.append('data[Company][town]', company.town);
    body.append('data[Company][country]', company.country);
    body.append('data[Company][car_dealership]', company.car_dealership);
    body.append('data[Company][motorcycle_dealership]', company.motorcycle_dealership);
    body.append('data[Company][com_vehicle_dealership]', company.com_vehicle_dealership);
    body.append('data[User][prefix_name]', user.prefix_name);
    body.append('data[User][fname]', user.fname);
    body.append('data[User][lname]', user.lname);
    body.append('data[User][email]', user.email);
    body.append('data[User][phone_code]', user.phone_code);
    body.append('data[User][phone]', user.phone);
    body.append('data[User][mobile_code]', user.mobile_code);
    body.append('data[User][mobile]', user.mobile);
    body.append('data[User][language]', user.language);
    body.append('data[User][username]', user.username);
    body.append('data[User][password]', user.password);
    body.append('data[User][repassword]', user.repassword);
    body.append('data[User][site_reference]', user.site_reference);
    body.append('data[User][terms]', user.terms ? "1" : "0");
    body.append('data[User][carauktion_ag]', user.carauktion_ag ? "1" : "0");

    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  getAuctionList(sortOn?, make?, model?, region?, minYear?, maxYear?, bodyType?) {
    var queryString = "?";
    if(sortOn){queryString = queryString + "sortOn="+sortOn+"&"}
    if(make){queryString = queryString + "makeName="+make+"&"}
    if(model){queryString = queryString + "modelName="+model+"&"}
    if(region){queryString = queryString + "regionCode="+region+"&"}
    if(minYear){queryString = queryString + "minYear="+minYear+"&"}
    if(maxYear){queryString = queryString + "maxYear="+maxYear+"&"}
    if(bodyType){queryString = queryString + "body_type="+bodyType}
    //https://ef24.ch/carlisting/api/getAuctionList?makeName=Audi&modelName=A4&regionCode&minYear&maxYear&isFavourite=&shortListed=&sortOn
    var url = this.baseUrl + "api/getAuctionList"+queryString;
    //var url = "assets/auction.json";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getMyFavouriteVehicleList() {
    var url = this.baseUrl + "api/getMyFavouriteVehicleList";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getMyVehicleAuctionList() {
    var url = this.baseUrl + "api/getMyVehicleAuctionList";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getMySellVehicleList() {
    var url = this.baseUrl + "api/getMySellVehicleList";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getMyPurchasedVehicleList() {
    var url = this.baseUrl + "api/getMyPurchasedVehicleList";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  setEmailPreferences(email_preference) {
    var url = this.baseUrl + "api/setEmailPreferences";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    let body = new FormData();
    body.append('email_preference', email_preference);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  changePassword(currentPassword, password, confirmPassword) {
    var url = this.baseUrl + "api/changePassword";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    let body = new FormData();
    body.append('current_password', currentPassword);
    body.append('password', password);
    body.append('confirm_password', confirmPassword);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  getEmailPreferences() {
    var url = this.baseUrl + "api/getEmailPreferences";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }


  getAllMake(term) {
    var url = this.baseUrl + "vehicles/getAllMakes?term="+term;
    return this.http.get(url).map(res => res.json());
  }

  getAllModel(term, make_id) {
    var url = this.baseUrl + "getModelByMake?term="+term+"&make_id="+make_id;
    return this.http.get(url).map(res => res.json());
  }

  getAllRegions() {
    var url = this.baseUrl + "vehicles/getAllRegions";
    return this.http.get(url).map(res => res.json());
  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  buyNow() {
    var url = this.baseUrl + "api/buyNow";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    let body = new FormData();
    //body.append('current_password', currentPassword);
    //body.append('password', password);
    //body.append('confirm_password', confirmPassword);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

}
