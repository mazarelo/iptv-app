import { Component, ElementRef, Renderer, Optional } from '@angular/core';
import { Img, Platform, DomController, Content } from 'ionic-angular';

@Component({
  selector: 'virtual-ion-img',
  template: '<img>',
})
export class VirtualIonImg extends Img {
  constructor(private elementRef: ElementRef,
              renderer: Renderer,
              plt: Platform,
              @Optional() private content: Content,
              dom: DomController) {
    super(elementRef, renderer, plt, content, dom);
  }

  get top() {
    this._rect = (<HTMLElement>this.elementRef.nativeElement).getBoundingClientRect();
    return this._rect.top + this.content.scrollTop - this.content._cTop;
  }
  get bottom() {
    this._rect = (<HTMLElement>this.elementRef.nativeElement).getBoundingClientRect();
    return this._rect.bottom + this.content.scrollTop - this.content._cTop;
  }
}
