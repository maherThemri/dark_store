import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeExtraSpaces'
})
export class RemoveExtraSpacesPipe implements PipeTransform {

  transform(description:string) {
    const newDescription = description.replace(/\s+/g, ' ').trim()

    return newDescription;
  }

}
