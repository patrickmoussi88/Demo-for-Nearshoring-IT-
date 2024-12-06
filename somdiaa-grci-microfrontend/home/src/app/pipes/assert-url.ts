import {Pipe, PipeTransform} from "@angular/core";
import {assetUrl} from "../../single-spa/asset-url";

@Pipe({name: 'assertUrl'})
export class AssertUrl implements PipeTransform {
    transform(path: string): string {
        return assetUrl(path);
    }
}
