import {ResizeObserverService, ResizeHandler} from '../resize-observer.service';


export enum BREAKPOINT_KEYS {
  XS,
  SM,
  MD,
  LG,
  XL,
  XXL
}

type BreakpointKeyStrings = keyof typeof BREAKPOINT_KEYS;

export type BREAKPOINTS = {
  [k in BreakpointKeyStrings]?: number;
}

type ResponsiveElement = Element & ElementCSSInlineStyle;



export abstract class BaseResponsiveContainer implements ResizeHandler {

  private _breakPoints: BREAKPOINTS | undefined;

  private _element: ResponsiveElement;
  private _service: ResizeObserverService;

  constructor(element: ResponsiveElement, service: ResizeObserverService) {

    this._element = element;
    this._service = service;
  }

  public handleResize(contentRect: DOMRectReadOnly): void {

    this._resizeNotification(contentRect, this._element);

    if (typeof this._breakPoints === "undefined") {
      return;
    }

    const breakpoints = this._breakPoints;

    Object.keys(breakpoints)
      .forEach((breakpoint) => {

        const minWidth =  breakpoints[breakpoint as BreakpointKeyStrings] as number;

        if (contentRect.width >= minWidth) {
          this._element.classList.add(breakpoint);
          return;
        }

        this._element.classList.remove(breakpoint);
      });
  }

  public destroy(): void {

    this._service.unobserve(this._element);
  }

  protected _initialise(): void {

    this._breakPoints = this._getBreakpointValues(this._element);

    if(!this._breakPoints) {
      console.warn('No breakpoint values declared in component styles');
      return;
    }

    this._service.observe(this._element, this);
  }

  private _getBreakpointValues(element: ResponsiveElement): BREAKPOINTS | undefined {

    let breakpoints: BREAKPOINTS | undefined;
    const computedStyle: CSSStyleDeclaration = getComputedStyle(element);

    Object.keys(BREAKPOINT_KEYS)
      .filter((key: string) => isNaN(Number(key)))
      .map((key: string) => {

        const styleValue: string | undefined = computedStyle.getPropertyValue(`--${key}`);

        if(!styleValue) {
          return;
        }

        const numericalValue = /\d+/.exec(styleValue)?.[0];

        if(!numericalValue) {
          return;
        }

        breakpoints = breakpoints || {};

        breakpoints[key as BreakpointKeyStrings] = parseInt(numericalValue);
      });

    return breakpoints;
  }

  protected abstract _resizeNotification(contentRect: DOMRectReadOnly, element: Element): void;
}
