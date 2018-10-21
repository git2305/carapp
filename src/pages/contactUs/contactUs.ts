import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';

declare var google;

@Component({
    templateUrl: "contactUs.html",
    selector: "page-contactus"
})

export class ContactUsPage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    contact: {
        user_type: string,
        marketplace: string,
        type: string,
        topic: string,
        my_request: string,
        prefix_name: string,
        first_name: string,
        last_name: string,
        email: string
    } = {
            user_type: "private_user",
            marketplace: "Used car market",
            type: "Commendation",
            topic: "New car",
            my_request: "Test request",
            prefix_name: "Mr",
            first_name: "Aniket",
            last_name: "Panchal",
            email: "panchal.aniket1@gmail.com"
        };

    constructor(public navCtrl: NavController, private webService: WebService) {

    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {

        let latLng = new google.maps.LatLng(47.269598, 8.716965);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h6>Eintauschfahrzeuge24.ch GmbH</h6>' +
            '<div id="bodyContent">' +
            '<p>Oberzelgstrasse 3</p>' +
            '<p>8618 Oetwil am See ZH</p>' +
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: 'Uluru (Ayers Rock)'
        });
        marker.addListener('click', function () {
            infowindow.open(this.map, marker);
        });

    }

    request() {
        this.webService.contactUs(this.contact).subscribe(
            data => {
                console.log(data);
                if (data.success == true) {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
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