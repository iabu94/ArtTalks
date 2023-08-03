import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  url = 'https://localhost:7129/api/gallery';

  constructor(private http: HttpClient) { }

  getAllImages() {
    return this.http.get<Picture[]>(this.url);
  }
}
