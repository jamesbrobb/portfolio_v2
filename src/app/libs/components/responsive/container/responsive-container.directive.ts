import {
  Directive,
  ElementRef,
  EventEmitter, NgModule,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {BaseResponsiveContainer} from "./responsive-container";
import {ResizeObserverService} from "../resize-observer.service";
import {CommonModule} from "@angular/common";


@Directive({
  selector: '[responsiveContainer]'
})
export class ResponsiveContainerDirective extends BaseResponsiveContainer implements OnInit, OnDestroy {

  @Output() resizeNotification = new EventEmitter();

  constructor(elementRef: ElementRef, service: ResizeObserverService) {
    super(elementRef.nativeElement, service);
  }

  ngOnInit(): void {
    this._initialise();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  protected _resizeNotification(contentRect: DOMRectReadOnly, element: Element): void {
    this.resizeNotification.emit({contentRect, element});
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ResponsiveContainerDirective],
  exports: [ResponsiveContainerDirective],
  providers: [{
    provide: ResizeObserverService,
    useFactory: () => new ResizeObserverService()
  }]
})
export class ResponsiveContainerDirectiveModule { }
