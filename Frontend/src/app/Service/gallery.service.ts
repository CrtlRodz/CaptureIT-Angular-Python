import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGallery } from '../Interfaces/Gallery.interface';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http:HttpClient) { }

  fetchPeople(): Observable<Object>{
    return this.http.get('/api/kanchiwork/');
    //return this.http.get('assets/response.json');
  };

  upload(webCamImage : any) {
    return this.http.post('/api/gallery/upload',{image :webCamImage?.image.imageAsDataUrl,name:`Image-${webCamImage?.timestamp}`, timestamp: webCamImage?.timestamp},{
      headers:{
        'Content-Type':'application/json'
      }
    })
  }

  grabImage():Observable<IGallery[]>{
   return this.http.get<IGallery[]>('/api/gallery')
  }
}