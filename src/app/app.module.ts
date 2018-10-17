import { EmailPreferencePage } from '../pages/emailPreference/emailPreference';
import { ChangePasswordPage } from '../pages/changePassword/changePassword';
import { ChangeProfileDataPage } from '../pages/changeProfileData/changeProfileData';
import { tab2 } from '../pages/searchOption/tab2/tab2';
import { tab1 } from '../pages/searchOption/tab1/tab1';
import { VehicleDetailsPage } from '../pages/vehicleDetails/vehicleDetails';
import { SignInPage } from '../pages/signIn/signIn';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddAdvertisementPage } from '../pages/addAdvertisement/addAdvertisement';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistrationPage } from '../pages/registration/registration';
import { HowItWorksPage } from '../pages/howItWorks/howItWorks';
import { SellVehiclePage } from '../pages/sellVehicle/sellVehicle';
import { SearchOptionPage } from '../pages/searchOption/searchOption';
import { ContactUsPage } from '../pages/contactUs/contactUs';
import { AboutUsPage } from '../pages/aboutUs/aboutUs';
import { MyCornerPage } from '../pages/myCorner/myCorner';
import { SearchResultsPage } from '../pages/searchResults/searchResults';
import { WebService } from '../providers/web-service';
import { HttpModule } from '@angular/http';
import { SecureStorage } from '@ionic-native/secure-storage';
import { FormsModule } from '@angular/forms';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import {StepOnePage} from '../pages/step-one/step-one';
import {StepTwoPage} from '../pages/step-two/step-two';
import {StepThreePage} from '../pages/step-three/step-three';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddAdvertisementPage,
    HowItWorksPage,
    RegistrationPage,
    SellVehiclePage,
    ContactUsPage,
    AboutUsPage,
    SearchOptionPage,
    MyCornerPage,
    SignInPage,
    VehicleDetailsPage,
    tab1,
    tab2,
    SearchResultsPage,
    ChangeProfileDataPage,
    ChangePasswordPage,
    EmailPreferencePage,
    StepOnePage,
    StepTwoPage,
    StepThreePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    CountdownTimerModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddAdvertisementPage,
    HowItWorksPage,
    RegistrationPage,
    SellVehiclePage,
    ContactUsPage,
    AboutUsPage,
    SearchOptionPage,
    MyCornerPage,
    SignInPage,
    VehicleDetailsPage,
    tab1,
    tab2,
    SearchResultsPage,
    ChangeProfileDataPage,
    ChangePasswordPage,
    EmailPreferencePage,
    StepOnePage,
    StepTwoPage,
    StepThreePage
  ],
  providers: [
    StatusBar,
    WebService,
    SplashScreen,
    SecureStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    Transfer,
    Camera,
    FilePath,
  ]
})

export class AppModule {}
