import {Directive, HostListener} from "@angular/core";
import {Router} from "@angular/router";



@Directive({
    selector: '[hrefListener]'
})
export class HrefListenerDirective {

    private readonly _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {

        if(!(event.target instanceof HTMLAnchorElement)) {
            return;
        }

        const target: HTMLAnchorElement = event.target;

        event.preventDefault();
        event.stopImmediatePropagation();

        if(target.href.indexOf(origin) === 0) {
            this._router.navigateByUrl(target.pathname);
            return;
        }

        window.open(target.href);
    }
}
