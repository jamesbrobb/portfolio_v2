import {Directive, EventEmitter, Output} from "@angular/core";


@Directive({
  selector: '[responsiveContainer]'
})
export class ResponsiveContainerDirectiveMock {
  @Output() resizeNotification = new EventEmitter();
}
