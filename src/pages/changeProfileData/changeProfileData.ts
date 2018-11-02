import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WebService } from '../../providers/web-service';

@Component({
  templateUrl: "changeProfileData.html",
  selector: "page-changeprofiledata"
})

export class ChangeProfileDataPage {

  profileImage: string;
  public company: {
    name: string,
    addition: string,
    street: string,
    pob: string,
    postcode: number,
    town: string,
    country: string
  } = {
    name: "Webmenia",
    addition: "yrdy",
    street: "test",
    pob: "test",
    postcode: 123245,
    town: "Vadodara",
    country: "IN"
  };

  user: {
    username:string,
    prefix_name:string,
    fname:string,
    lname:string,
    email:string,
    phone:number,
    mobile:number,
    language:string,
    site_reference:string
  } = {
    username: "aniketpanchal",
    prefix_name:"Mr",
    fname:"Aniket",
    lname:"Panchal",
    email:"panchal.aniket1@gmail.com",
    phone:1234567890,
    mobile:1234567890,
    language:"English",
    site_reference:"FLEET"
  };

  constructor(
    public navCtrl: NavController,
    private webService: WebService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public platform: Platform
  ) {
    if (window.localStorage.getItem('profileImage') == null) {
      this.profileImage = 'assets/images/no-user.png';
    } else {
      this.profileImage = window.localStorage.getItem('profileImage');
    }

    this.webService.getProfileData().subscribe(
      data => {
        console.log(data);
        if (data.success == true) {
          this.company = data.data.userData.Company;
          this.user = data.data.userData.User;
          this.webService.loading.dismiss();
        } else {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);
        }
      },
      err => {
        this.webService.loading.dismiss();
        this.webService.presentToast("Some error occured.");
      }
    );

  }

  save() {
    this.webService.updateProfileData(this.company, this.user).subscribe(
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
    //this.navCtrl.pop();
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
      params: { 'fileName': filename, 'token': window.localStorage.getItem('token') }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    //    this.webService.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {

      var responseData = JSON.parse(data.response);
      if (responseData.success == true) {
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