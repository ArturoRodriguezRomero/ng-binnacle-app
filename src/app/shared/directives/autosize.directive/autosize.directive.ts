import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: 'textarea[autosize]',
  host: {
    rows: '1',
    style: 'overflow: hidden'
  }
})
export class AutosizeDirective implements AfterViewInit {
  constructor(private elem: ElementRef) {}

  public ngAfterViewInit() {
    this.resize();
  }

  @HostListener('input')
  @HostListener('focus')
  private resize() {
    const textarea = this.elem.nativeElement as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
