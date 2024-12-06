import {Pipe, PipeTransform} from "@angular/core";
import {assetUrl} from "../../single-spa/asset-url";

@Pipe({
  name: 'assertUrl',
  standalone: true
})
export class AssertUrlPipe implements PipeTransform{
    transform(imagePath: string): string {
        return assetUrl(imagePath);
    }
}
