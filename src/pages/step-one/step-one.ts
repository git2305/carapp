import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ToastController, ActionSheetController, Loading, ThumbnailModule } from 'ionic-angular';
import { StepTwoPage } from '../step-two/step-two';
import { WebService } from '../../providers/web-service';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the StepOnePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-step-one',
  templateUrl: 'step-one.html',
})
export class StepOnePage {

  hideDamage: boolean = true;
  public vehicleTempId:string = window.localStorage.getItem("vehicle_temp_id");

  lastImage: string = null;
  loading: Loading;
  public photos: any;
  public base64Image: string;
  public imagePath: string = "assets/images/cars/";

  vehicle: {
    brand: string,
    model: string,
    type: string,
    body_type: string,
    doors: string,
    displacement: string,
    wheel_drive: string,
    gear: string,
    fuel: string,
    hp: string,
    kw: string,
    no_of_seats: string,
    first_reg: string,
    kilometers: string,
    exterior_color: string,
    interior_color: string,
    additional_info: string,
    gen_condition: string,
    inspection: string,
    other_condition_eng: string,
    frame_no: string,
    model_no: string,
    reg_no: string,
    vehicle_no: string,
    swiss_car: number,
    vehicle_regions: string,
    reg_document: string,
    service_record: string,
    no_of_keys: string,
    is_damage: string,
    body_eng: string,
    repairs: string,
    mechanics_eng: string
  } = {
      brand: "Audi",
      model: "A3",
      type: "Sedan",
      body_type: "Limousine",
      doors: "4",
      displacement: "1.3",
      wheel_drive: "Front",
      gear: "Automat",
      fuel: "Hybrid/Benzin",
      hp: "120",
      kw: "50",
      no_of_seats: "4",
      first_reg: "10/2018",
      kilometers: "500",
      exterior_color: "Beige",
      interior_color: "Beige",
      additional_info: "Test Additional info",
      gen_condition: "accident",
      inspection: "10/2018",
      other_condition_eng: "Test Other Condition",
      frame_no: "FRM123",
      model_no: "MOD123",
      reg_no: "REG123",
      vehicle_no: "VEH123",
      swiss_car: 1,
      vehicle_regions: "ZH",
      reg_document: "2",
      service_record: "3",
      no_of_keys: "2",
      is_damage: "0",
      body_eng: "Test Body Content",
      repairs: "Test Repair",
      mechanics_eng: "Test Mechanics",
    };

  vehicleDamage: {
    bottomside: any,
    leftside: any,
    topside: any,
    rightside: any,
    backside: any
  } = {
      bottomside: this.imagePath + 'front.png',
      leftside: this.imagePath + 'left.png',
      topside: this.imagePath + 'top.png',
      rightside: this.imagePath + 'right.png',
      backside: this.imagePath + 'back.png'
    };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public toastCtrl: ToastController,
    private webService: WebService
  ) {

    console.log(this.vehicleTempId);

    if (this.vehicleTempId != null) {
      this.webService.getVehicleByTempId(this.vehicleTempId).subscribe(
        data => {
          console.log(data);
          if (data.success == true) {
            this.webService.loading.dismiss();
            this.webService.presentToast(data.message);
            this.vehicle = data.data.vehicleData.Vehicle;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepOnePage');
  }

  next() {
    this.webService.step1(this.vehicle, this.vehicleDamage).subscribe(
      data => {
        console.log(data);
        if (data.success == true) {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);
          window.localStorage.setItem('vehicle_temp_id', data.data.vehicle_temp_id);
          this.navCtrl.setRoot(StepTwoPage);
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

    //this.navCtrl.setRoot(StepTwoPage);
  }

  hideShowDamage() {
    this.hideDamage = !this.hideDamage;
  }

  deletePhoto(index) {
    this.photos[index] = this.imagePath + index + ".png";
  }

  public presentActionSheet(type) {
    console.log(type);
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, type);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, type);
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



  public takePicture(sourceType, type) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

            this.vehicleDamage[type] = correctPath + currentName;

          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

        this.vehicleDamage[type] = correctPath + currentName;
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // public uploadImage() {
  //   // Destination URL
  //   var url = "http://192.168.0.99/carlisting/api/uploadImage";

  //   // File for Upload
  //   var targetPath = this.pathForImage(this.lastImage);

  //   // File name only
  //   var filename = this.lastImage;

  //   var options = {
  //     fileKey: "file",
  //     fileName: filename,
  //     chunkedMode: false,
  //     mimeType: "multipart/form-data",
  //     params : {'fileName': filename}
  //   };

  //   const fileTransfer: TransferObject = this.transfer.create();

  //   this.loading = this.loadingCtrl.create({
  //     content: 'Uploading...',
  //   });
  //   this.loading.present();

  //   // Use the FileTransfer to upload the image
  //   fileTransfer.upload(targetPath, url, options).then(data => {
  //     this.loading.dismissAll()
  //     this.presentToast('Image succesful uploaded.');
  //   }, err => {
  //     this.loading.dismissAll()
  //     this.presentToast('Error while uploading file.');
  //   });
  // }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
