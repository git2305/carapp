import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';

@Component({
    templateUrl: "registration.html",
    selector: "page-registration"
})

export class RegistrationPage {

    company: { name: string, addition: string, street: string, pob: string, town: string, country: string, car_dealership: string, motorcycle_dealership: string, com_vehicle_dealership: string } = {
        name: "YouMe Webs",
        addition: "test",
        street: "test 1",
        pob: "test 2",
        town: "test 3",
        country: "28",
        car_dealership: "Test",
        motorcycle_dealership: "Test",
        com_vehicle_dealership: "Test"
    };


    user: { prefix_name: string, fname: string, lname: string, email: string, phone_code: string, phone: string, 
        mobile_code: string, mobile: string, language: string, username: string, password: string, repassword: string, 
        site_reference: string, terms: boolean, carauktion_ag: boolean } = {
        prefix_name: "Mr",
        fname: "Aniket",
        lname: "Panchal",
        email: "panchal.aniket1@gmail.com",
        phone_code: "+91",
        phone: "234356436",
        mobile_code: "+91",
        mobile: "4543543433",
        language: "",
        username: "aniketpanchal",
        password: "12345",
        repassword: "12345",
        site_reference: "FLEET",
        terms: false,
        carauktion_ag: false
    };

    constructor(public navCtrl: NavController, private webService: WebService) {

    }

    register() {
        this.webService.register(this.company, this.user).subscribe(
            data => {
                console.log(data);
                if (data.success == true) {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                    window.localStorage.setItem('token', data.data.token);
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