import { Component, OnInit } from '@angular/core';
import { Picture } from '../models';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  pictures: Picture[] = [];
  filteredPictures: Picture[] = [];
  selectedPicture: Picture | undefined;

  constructor(private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    this.galleryService.getAllImages().subscribe(pictures => {
      this.pictures = pictures;
      this.filteredPictures = pictures;
    });
  }

  selectPicture(picture: Picture) {
    this.selectedPicture = picture;
  }

  search(event: any) {
    const searchKey = event.target.value;
    if (searchKey.trim() === '') {
      // If the search term is empty, show the full list of pictures
      this.filteredPictures = this.pictures;
    } else {
      // Filter the pictures based on the search term in the name or artist name
      this.filteredPictures = this.pictures.filter(picture =>
        picture.artistName.toLowerCase().includes(searchKey.toLowerCase()) ||
        picture.description.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
  }
}
