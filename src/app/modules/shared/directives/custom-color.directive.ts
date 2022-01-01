import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[customColor]'
})
export class CustomColorDirective {

  @Input()
  set customColor(colorValue: string) {
    if (!!colorValue) {
      this.updateColor(colorValue);
    }
  }

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  private updateColor(colorValue: string) {
    this.renderer.setStyle(this.element.nativeElement, 'color', colorValue);
  }
}
