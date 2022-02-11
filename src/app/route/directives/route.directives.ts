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

        if(!event.target) {
          return;
        }

        let target: HTMLElement | null = event.target as HTMLElement,
          el: HTMLAnchorElement | undefined;

        while(!el && target) {

          if(target instanceof HTMLAnchorElement) {
            el = target;
            continue;
          }

          target = target.parentElement;
        }

        if(!(el instanceof HTMLAnchorElement)) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        if(el.href.indexOf(origin) === 0) {
            this._router.navigateByUrl(el.pathname);
            return;
        }

        window.open(el.href);
    }
}
