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
  public baseUrl: string;
  public vehicleTempId: string = window.localStorage.getItem("vehicle_temp_id");

  constructor(public http: Http, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    //this.baseUrl = "http://192.168.0.99/carlisting/";
    this.baseUrl = "http://localhost/carlisting/";
    //this.baseUrl = "http://ef24.ch/carlisting/";
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  hideLoading() {
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
    var url = this.baseUrl + "api/service_signup";
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
    if (sortOn) { queryString = queryString + "sortOn=" + sortOn + "&" }
    if (make) { queryString = queryString + "makeName=" + make + "&" }
    if (model) { queryString = queryString + "modelName=" + model + "&" }
    if (region) { queryString = queryString + "regionCode=" + region + "&" }
    if (minYear) { queryString = queryString + "minYear=" + minYear + "&" }
    if (maxYear) { queryString = queryString + "maxYear=" + maxYear + "&" }
    if (bodyType) { queryString = queryString + "body_type=" + bodyType }
    //https://ef24.ch/carlisting/api/getAuctionList?makeName=Audi&modelName=A4&regionCode&minYear&maxYear&isFavourite=&shortListed=&sortOn
    var url = this.baseUrl + "api/getAuctionList" + queryString;
    //var url = "assets/auction.json";
    this.showLoading();
    let headers = new Headers();
    console.log('Token: ' + this.token);
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
    var url = this.baseUrl + "vehicles/getAllMakes?term=" + term;
    return this.http.get(url).map(res => res.json());
  }

  getAllModel(term, make_id) {
    var url = this.baseUrl + "vehicles/getModelByMake?term=" + term + "&make_id=" + make_id;
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

  uploadImage(file: Blob) {
    var url = this.baseUrl + "api/uploadImage";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    let body = new FormData();
    body.append('ionicfile', file);
    console.log(body);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  step1(vehicle, vehicleDamage) {
    var url = this.baseUrl + "api/step1";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', this.token);
    //headers.append('Content-Type', 'multipart/form-data');
    let body = new FormData();

    if (this.vehicleTempId != null) {
      body.append('data[Vehicle][id]', this.vehicleTempId);
    }

    body.append('data[Vehicle][brand]', vehicle.brand);
    body.append('data[Vehicle][model]', vehicle.model);
    body.append('data[Vehicle][type]', vehicle.type);
    body.append('data[Vehicle][body_type]', vehicle.body_type);
    body.append('data[Vehicle][doors]', vehicle.doors);
    body.append('data[Vehicle][displacement]', vehicle.displacement);
    body.append('data[Vehicle][wheel_drive]', vehicle.wheel_drive);
    body.append('data[Vehicle][gear]', vehicle.gear);
    body.append('data[Vehicle][fuel]', vehicle.fuel);
    body.append('data[Vehicle][hp]', vehicle.hp);
    body.append('data[Vehicle][kw]', vehicle.kw);
    body.append('data[Vehicle][no_of_seats]', vehicle.no_of_seats);
    body.append('data[Vehicle][first_reg]', vehicle.first_reg);
    body.append('data[Vehicle][kilometers]', vehicle.kilometers);
    body.append('data[Vehicle][exterior_color]', vehicle.exterior_color);
    body.append('data[Vehicle][interior_color]', vehicle.interior_color);
    body.append('data[Vehicle][additional_info]', vehicle.additional_info);
    body.append('data[Vehicle][gen_condition][]', vehicle.gen_condition);
    body.append('data[Vehicle][inspection]', vehicle.inspection);
    body.append('data[Vehicle][other_condition_eng]', vehicle.other_condition_eng);
    body.append('data[Vehicle][frame_no]', vehicle.frame_no);
    body.append('data[Vehicle][model_no]', vehicle.model_no);
    body.append('data[Vehicle][reg_no]', vehicle.reg_no);
    body.append('data[Vehicle][vehicle_no]', vehicle.vehicle_no);
    body.append('data[Vehicle][swiss_car]', vehicle.swiss_car);
    body.append('data[Vehicle][vehicle_regions]', vehicle.vehicle_regions);
    body.append('data[Vehicle][reg_document]', vehicle.reg_document);
    body.append('data[Vehicle][service_record]', vehicle.service_record);
    body.append('data[Vehicle][no_of_keys]', vehicle.no_of_keys);
    body.append('data[Vehicle][is_damage]', vehicle.is_damage);
    body.append('data[Vehicle][body_eng]', vehicle.body_eng);
    body.append('data[Vehicle][repairs]', vehicle.repairs);
    body.append('data[Vehicle][mechanics_eng]', vehicle.mechanics_eng);

    //  body.append('data[VehicleDamage][bottomside][]', vehicleDamage.bottomside);
    //  body.append('data[VehicleDamage][leftside][]', vehicleDamage.leftside);
    //  body.append('data[VehicleDamage][topside][]', vehicleDamage.topside);
    //  body.append('data[VehicleDamage][rightside][]', vehicleDamage.rightside);
    //  body.append('data[VehicleDamage][backside][]', vehicleDamage.backside);

    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  step2(vehicle, vehicleDamage) {
    var url = this.baseUrl + "api/service_signup";
    this.showLoading();

    let body = new FormData();
    body.append('data[VehicleDoc][image][]', vehicle.brand);
    body.append('data[VehicleDoc][doc][]', vehicle.model);

    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  step3(vehicle, vehicleDamage) {
    var url = this.baseUrl + "api/service_signup";
    this.showLoading();

    let body = new FormData();
    body.append('data[Vehicle][min_auction_price]', vehicle.brand);
    body.append('data[Vehicle][auction_duration]', vehicle.brand);
    body.append('data[Vehicle][buy_price]', vehicle.brand);
    body.append('data[Vehicle][transport_medium]', vehicle.brand);
    body.append('data[Vehicle][increase_with]', vehicle.brand);

    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  getCmsPage(pageUrl?, language?) {
    var queryString = "?";
    if (pageUrl) { queryString = queryString + "page_url=" + pageUrl + "&" }
    if (pageUrl) { queryString = queryString + "language=" + language + "&" }

    var url = this.baseUrl + "api/getCmsPage" + queryString;
    this.showLoading();

    let headers = new Headers();
    headers.append('token', this.token);
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;

  }

  contactUs(contact) {
    var url = this.baseUrl + "api/contactUs";
    this.showLoading();

    let body = new FormData();
    body.append('data[user_type]', contact.user_type);
    body.append('data[marketplace]', contact.marketplace);
    body.append('data[type]', contact.type);
    body.append('data[topic]', contact.topic);
    body.append('data[my_request]', contact.my_request);
    body.append('data[prefix_name]', contact.prefix_name);
    body.append('data[first_name]', contact.first_name);
    body.append('data[last_name]', contact.last_name);
    body.append('data[email]', contact.email);

    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  getVehicleByTempId(vehicleTempId?) {
    var queryString = "?";
    if (vehicleTempId) { queryString = queryString + "vehicle_temp_id=" + vehicleTempId + "&" }

    var url = this.baseUrl + "api/getVehicleTempDetail" + queryString;
    this.showLoading();

    let headers = new Headers();
    headers.append('token', this.token);
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;

  }

  activateVehicle(vehicle, isActivate){
    var url = this.baseUrl + "api/activateVehicle";
    this.showLoading();

    let body = new FormData();
    body.append('data[Vehicle][id]', this.vehicleTempId);
    body.append('data[Vehicle][min_auction_price]', vehicle.min_auction_price);
    body.append('data[Vehicle][auction_duration]', vehicle.auction_duration);
    body.append('data[Vehicle][buy_price]', vehicle.buy_price);
    body.append('data[Vehicle][increase_with]', vehicle.increase_with);
    body.append('data[Vehicle][transport_medium]', vehicle.transport_medium);

    if( isActivate == true ){
      body.append('data[Vehicle][is_active]', '1');
    }

    var response = this.http.post(url, body).map(res => res.json());
    return response;
  
}

}
