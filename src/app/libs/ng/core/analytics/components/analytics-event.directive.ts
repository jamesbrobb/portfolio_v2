import {Directive, HostListener, Input} from '@angular/core';
import {AnalyticsEvent, AnalyticsService} from "../../../../core/";



@Directive({
    selector: '[analyticsEvent]'
})
export class AnalyticsEventDirective {

    @Input() analyticsEvent: AnalyticsEvent | undefined;

    @HostListener('click')
    onClick() {
      this._send();
    }

    private _service: AnalyticsService;

    constructor(service: AnalyticsService) {

        this._service = service;
    }

    private _send = (): void => {

        if (!this.analyticsEvent) {
            return;
        }

        this._service.track(this.analyticsEvent);
    }
}




@Directive({
    selector: '[analyticsHrefListener]'
})
export class AnalyticsHrefListenerDirective {

    @Input() analyticsHrefListener: string | undefined;

    private _service: AnalyticsService;

    constructor(service: AnalyticsService) {

        this._service = service;
    }

    @HostListener('click', ['$event'])
    onClick(event: Event): void {

        if(!(event.target instanceof HTMLAnchorElement)) {
            return;
        }

        const target: HTMLAnchorElement = event.target;

        event.preventDefault();
        event.stopImmediatePropagation();

        if (!this.analyticsHrefListener) {
            return;
        }

        const aEvt: AnalyticsEvent = {
            actionId: this.analyticsHrefListener,
            propertyValueMap: {
                link: target.href
            }
        }

        this._service.track(aEvt);
    }
}

