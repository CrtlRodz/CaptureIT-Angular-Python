import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {WebcamUtil,WebcamInitError,WebcamImage} from 'ngx-webcam'
import { Observable, Subject } from 'rxjs';
import { IPicture } from 'src/app/Interfaces/image.interface';
import { GalleryService } from 'src/app/Service/gallery.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
 @Output() getPicture = new EventEmitter<IPicture>();
  showWebcam =true;
  isCameraExist =true;
  webCamImage:IPicture | undefined
  errors:WebcamInitError[] =[];
  uploadloading= false;
  // Calling the API
  constructor(private http:HttpClient, private gallery:GalleryService) {
   
  }
  
  
// webcam snapshot trigger
private trigger: Subject<void> = new Subject<void>();
private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  ngOnInit(): void {

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      });
  }
  // takes a picture 
  takeSnapshot(): void {
    this.trigger.next();
  }
  triggerCamera():void{
    this.webCamImage = undefined
    this.showWebcam =true;
  }

  // switches off the web camera
  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }
 
  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }
 
  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }
//  transfers image to perant component 
  handleImage(webcamImage: WebcamImage) {
    let picture: IPicture = {image:webcamImage,timestamp: Date.now()}
    this.webCamImage = picture
    // this.getPicture.emit(picture);
    this.showWebcam = false;
  }
 
  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
 
  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  upload(){
    this.uploadloading = true;
    this.gallery.upload(this.webCamImage).subscribe(()=>this.uploadloading =false)
    }  
  
}
