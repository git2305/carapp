import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ToastController, ActionSheetController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WebService } from '../../providers/web-service';
import { StepThreePage } from '../step-three/step-three';

/**
 * Generated class for the StepTwoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-step-two',
  templateUrl: 'step-two.html',
})
export class StepTwoPage {

  lastImage: string = null;
  loading: Loading;

  public photos: any;
  public base64Image: string;
  public imagePath: string = "assets/images/cars/";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public toastCtrl: ToastController,
    private webService: WebService) {
  }

  ngOnInit() {
    this.photos = [
      this.imagePath + "1.png",
      this.imagePath + "2.png",
      this.imagePath + "3.png",
      this.imagePath + "4.png",
      this.imagePath + "5.png",
      this.imagePath + "6.png",
      this.imagePath + "7.png",
      this.imagePath + "8.png",
      this.imagePath + "9.png",
      this.imagePath + "10.png",
      this.imagePath + "11.png",
      this.imagePath + "12.png"
    ];
  }

  deletePhoto(index) {
    this.photos[index] = this.imagePath + index + ".png";
  }

  // takePicture(sourceType, seq) {
  //   const options: CameraOptions = {
  //     // quality: 50, // picture quality
  //     // destinationType: this.camera.DestinationType.DATA_URL,
  //     // encodingType: this.camera.EncodingType.JPEG,
  //     // mediaType: this.camera.MediaType.PICTURE

  //     quality: 100,
  //     sourceType: sourceType,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true
  //   }



  //   this.camera.getPicture(options).then((imageData) => {

  //     if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
  //       this.filePath.resolveNativePath(imageData)
  //         .then(filePath => {
  //           let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            
  //           this.base64Image = "data:image/jpeg;base64," + correctPath;
  //           this.photos[seq] = this.base64Image;
  //           // this.photos.push(this.base64Image);

  //         });
  //     } else {
  //       this.base64Image = "data:image/jpeg;base64," + imageData;
  //       this.photos[seq] = this.base64Image;
  //     }

  //   }, (err) => {
  //     console.log(err);
  //   });
  // }



  public presentActionSheet(seq) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, seq);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, seq);
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



  public takePicture(sourceType, seq) {
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

            this.photos[seq] =correctPath + currentName;

          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

        this.photos[seq] =correctPath + currentName;
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  next(){
    this.navCtrl.setRoot(StepThreePage);
  }

  public uploadImage() {
    // Destination URL
    var url = "http://192.168.0.99/carlisting/api/uploadImage";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepTwoPage');
  }

}
