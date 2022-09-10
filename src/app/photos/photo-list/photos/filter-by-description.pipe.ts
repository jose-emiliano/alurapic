import { Pipe, PipeTransform } from '@angular/core';
import { IPhotos } from 'src/app/models/photo.model';

@Pipe({
  name: 'filterByDescription'
})
export class FilterByDescriptionPipe implements PipeTransform {
  transform(photos: IPhotos[], descriptionQuery: string) {
    descriptionQuery = descriptionQuery
      .trim()
      .toLowerCase()

    if (descriptionQuery) {
      return photos.filter(photo => photo.description.toLowerCase().includes(descriptionQuery))
    } else {
      return photos;
    }
  }
}
