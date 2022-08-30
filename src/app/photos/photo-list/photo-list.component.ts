import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhotos, PhotosService } from '../photos.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: IPhotos[] = []
  filter: string = ''
  hasMore: boolean = true
  currentPage: number = 1
  userName: string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotosService
  ) { }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params['userName']
    this.photos = this.activatedRoute.snapshot.data['photos']
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = ''
        this.photos = this.photos.concat(photos)
        this.hasMore = photos.length ? true : false
      })
  }
}
