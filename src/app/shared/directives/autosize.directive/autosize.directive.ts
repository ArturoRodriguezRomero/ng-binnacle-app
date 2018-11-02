import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[autosize]'
})
export class AutosizeDirective {
  constructor(private elem: ElementRef) {}

  @HostListener('load')
  @HostListener('input')
  @HostListener('focus')
  private resize() {
    const textarea = this.elem.nativeElement as HTMLTextAreaElement;
    textarea.style.overflow = 'hidden';
    textarea.style.height = '0px';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
