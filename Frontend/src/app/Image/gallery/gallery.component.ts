import { Component, OnInit } from '@angular/core';
import { IGallery } from 'src/app/Interfaces/Gallery.interface';
import { GalleryService } from 'src/app/Service/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images:any = []
  constructor(private gallery:GalleryService) { }

  ngOnInit(): void {
    this.grabImage()
  }

  grabImage(){
    this.gallery.grabImage().subscribe(data => this.images = data.sort(this.sortByLatest))
  }
  sortByLatest(a:IGallery,b:IGallery){
    if (a.timestamp < b.timestamp){
      return 1
    }
    if(a.timestamp > b.timestamp){
      return -1
    }
    return 0
  }
}
