import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ConfigService } from '../service/config.service';

@Directive({
  selector: '[appAuthorize]',
  standalone:true
})
export class AuthorizeDirective {

  private authorities: string[] = [];
  constructor(private configService: ConfigService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) { }

  @Input()
  set appAuthorize(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;
    this.updateView();
  }



  private updateView(): void {
    const hasAnyAuthority = this.configService.hasAnyAuthority(
      this.authorities
    );
    this.viewContainerRef.clear();
    if (hasAnyAuthority) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }


}
