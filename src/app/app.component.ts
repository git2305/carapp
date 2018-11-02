import { MyCornerPage } from '../pages/myCorner/myCorner';
import { SignInPage } from '../pages/signIn/signIn';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController } from 'ionic-angular';
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
import { PreviewVehiclePage } from '../pages/preview-vehicle/preview-vehicle';
import { WebService } from '../providers/web-service';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav;
  rootPage: any;
  pages: Array<{title: string, component: any, icon: string}>;
  firstname:string;
  lastname:string;
  profileImage:string;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private webService: WebService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath
    
    ) {
    this.initializeApp();

    if( window.localStorage.getItem('profileImage') == null ){
      this.profileImage = 'assets/images/no-user.png';
    } else {
      this.profileImage = window.localStorage.getItem('profileImage');
    }

    this.firstname = window.localStorage.getItem('firstname');
    this.lastname = window.localStorage.getItem('lastname');

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

  deletePhoto() {
    
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG
    };
    this.camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.webService.presentToast('Error while selecting image.');
    });
  }

  public uploadImage(image) {

    
    // Destination URL
    var url = this.webService.baseUrl + "api/uploadProfilePic";

    // File for Upload
    var targetPath = this.pathForImage(image);

    // File name only
    var filename = image;

    var options = {
      fileKey: "data[User][image]",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename, 'token' : window.localStorage.getItem('token') }
    };

    const fileTransfer: TransferObject = this.transfer.create();

//    this.webService.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {

      var responseData = JSON.parse(data.response);
      if( responseData.success == true ){
        console.log(responseData.data.imageUrl);
        this.profileImage = responseData.data.imageUrl; 
        window.localStorage.setItem('profileImage', responseData.data.imageUrl);
      }
      //this.webService.loading.dismissAll()
      //this.webService.presentToast('Image succesful uploaded.');
    }, err => {
      //this.webService.loading.dismissAll()
      //this.webService.presentToast('Error while uploading file.');
    });

  //this.navCtrl.setRoot(StepThreePage);
}

// Create a new name for the image
private createFileName() {
  var d = new Date(),
    n = d.getTime(),
    newFileName = n + ".jpg";
  return newFileName;
}

// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
    this.uploadImage(newFileName);

  }, error => {
    this.webService.presentToast('Error while storing file.');
  });
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return this.file.dataDirectory + img;
  }
}

}
