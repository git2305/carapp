import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl : "howItWorks.html",
  selector : "page-howitworks"
})

export class HowItWorksPage {

    cmsContent: any;

    constructor(public navCtrl : NavController, private webService: WebService, private sanitizer: DomSanitizer){
      this.webService.getCmsPage('about-us','EN').subscribe(
        data => {
            console.log(data);
            if (data.success == true) {
                this.webService.loading.dismiss();
                this.webService.presentToast(data.message);
                
                this.cmsContent = this.sanitizer.bypassSecurityTrustHtml(data.data.page_content);
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