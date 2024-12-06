import {Pipe, PipeTransform} from "@angular/core";
import { environment } from "src/environments/environment.development";

@Pipe({name: 'moduleUrl'})
export class ModuleLinkPipe implements PipeTransform {
    private HOST=environment.host
    transform(path: string): string {
        //return `https://somdia.sprint-pay.com/${path}`;
        return this.HOST+`/${path}`;
    }
}
