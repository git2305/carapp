import { MyCornerPage } from '../pages/myCorner/myCorner';
import { SignInPage } from '../pages/signIn/signIn';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { AddAdvertisementPage } from '../pages/addAdvertisement/addAdvertisement';
import { RegistrationPage } from '../pages/registration/registration';
import { HowItWorksPage } from '../pages/howItWorks/howItWorks';
import { SellVehiclePage } from '../pages/sellVehicle/sellVehicle';
import { ContactUsPage } from '../pages/contactUs/contactUs';
import { AboutUsPage } from '../pages/aboutUs/aboutUs';
import { SearchOptionPage } from '../pages/searchOption/searchOption';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav;
  rootPage: any;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    if(window.localStorage.getItem("token")){
      this.rootPage = HomePage;
    }else{
      this.rootPage = SignInPage;
    }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Add Advertisement', component: AddAdvertisementPage, icon: 'plus' },
      { title: 'How It Works', component: HowItWorksPage, icon: 'home' },
      { title: 'Registration', component: RegistrationPage, icon: 'user-plus' },
      { title: 'Sell Vehicle', component: SellVehiclePage, icon: 'car' },
      { title: 'Contact Us', component: ContactUsPage, icon: 'map-marker' },
      { title: 'About Us', component: AboutUsPage, icon: 'info-circle' },
      { title: 'Search Option', component: SearchOptionPage, icon: 'search' },
      { title: 'My Corner', component: MyCornerPage, icon: 'user-circle' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    window.localStorage.clear();
    this.nav.setRoot(SignInPage);
  }
}
