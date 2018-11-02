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
  public imagePath: string = "assets/images/cars/";
  public docPath: string = "assets/images/";
  public upload = [];
  public isUploaded = [0,0,0,0,0,0,0,0,0,0,0,0];
  public vehicleDocs:string;
  public isDocUploaded = 0;


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

    this.vehicleDocs = this.docPath + 'vehicle-docs.png';
  }

  deletePhoto(index) {
    this.photos[index] = this.imagePath + index + ".png";
  }

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
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), seq);
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), seq);
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  next(){
    //this.uploadImage();
    this.navCtrl.setRoot(StepThreePage);
  }
  
  public uploadImage(image, seq) {

    
      // Destination URL
      var url = this.webService.baseUrl + "api/uploadVehicleImages";

      // File for Upload
      var targetPath = this.pathForImage(image);

      // File name only
      var filename = image;

      var options = {
        fileKey: "data[VehicleDoc][image]",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { 'fileName': filename, 'vehicle_id' : window.localStorage.getItem('vehicle_temp_id') }
      };

      const fileTransfer: TransferObject = this.transfer.create();

      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();

      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {

        var responseData = JSON.parse(data.response);
        if( responseData.success == true ){
          this.photos[seq] = responseData.data.imageUrl;
          console.log(this.photos);
          this.isUploaded[seq] = 1;
        } else {
          this.isUploaded[seq] = 0;
        }
      
        this.loading.dismissAll()
        this.presentToast('Image succesful uploaded.');
      }, err => {
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
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
  private copyFileToLocalDir(namePath, currentName, newFileName, seq) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.photos[seq] = newFileName;

      this.uploadImage(newFileName, seq);

    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private copyDocToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.vehicleDocs = newFileName;
      this.uploadDocs(newFileName);
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

  
  presentActionSheetDoc(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takeDocs(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takeDocs(this.camera.PictureSourceType.CAMERA);
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

  takeDocs(sourceType){
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyDocToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyDocToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  public uploadDocs(image) {

    
    // Destination URL
    var url = this.webService.baseUrl + "api/uploadVehicleDocs";

    // File for Upload
    var targetPath = this.pathForImage(image);

    // File name only
    var filename = image;

    var options = {
      fileKey: "data[VehicleDoc][doc][]",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename, 'vehicle_id' : window.localStorage.getItem('vehicle_temp_id') }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {

      var responseData = JSON.parse(data.response);
      if( responseData.success == true ){
        this.vehicleDocs = responseData.data.imageUrl;
        console.log(this.uploadDocs);
        this.isDocUploaded = 1;
      } else {
        this.isDocUploaded = 0;
      }
    
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  

  //this.navCtrl.setRoot(StepThreePage);
}

}
