import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  imageSrc: string='';

  constructor(private _alertController: AlertController) {}

  async  selectImageSource(){
    const alert= await this._alertController.create({
      header:'Select Source',
      message:'Pick a source for your image',
      buttons:[
        {
          text:'Camera',
          handler:async ()=>{ 
          // image.webPath will contain a path that can be set as an image src.
          // You can access the original file using image.path, which can be
          // passed to the Filesystem API to read the raw data of the image,
          // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
            const cameraOptions = await Camera.getPhoto({
              quality: 100,
              allowEditing: false,
              //How the data should be returned. Currently, only 'Base64', 'DataUrl' or 'Uri' is supported
              resultType: CameraResultType.Uri,
              saveToGallery: false,
              width: 200,
              height: 200,
              source:CameraSource.Camera
            });
        
            var imageUrl = cameraOptions.webPath;  
            // Can be set to the src of an image now
            //  imageElement.src = imageUrl;
            //'data:image/jpeg;base64,'+ 
            console.log('image url :'+imageUrl);
            this.imageSrc= imageUrl;
          }
        },
        {
          text:'Gallery',
          handler:async()=>{
            const galleryOptions = await Camera.getPhoto({
              quality: 100,
              allowEditing: false,
              resultType: CameraResultType.Uri,
              saveToGallery: false,
              width: 200,
              height: 200,
              source:CameraSource.Photos 
            });
            var imageUrl = galleryOptions.webPath;  
            console.log('image url :'+imageUrl);
            this.imageSrc=imageUrl;
          }
        }
      ]
    });
    
    await alert.present();
  }
}
