import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'hashLink',
  standalone: true
})
export class HashLinkPipe implements PipeTransform{
  transform(link: string): string {
    return '#' + link;
  }
}
