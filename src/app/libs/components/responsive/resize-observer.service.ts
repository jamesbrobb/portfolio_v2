import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

const ResizeObserver = window.ResizeObserver || Polyfill;


export interface ResizeHandler {
    handleResize(arg: DOMRectReadOnly): void;
}



export class ResizeObserverService {

    private _observer: ResizeObserver;
    private _resizeHandlers: Map<Element, ResizeHandler> | undefined;

    constructor() {
        this._observer = new ResizeObserver(this._resizeHandler);
    }

    public observe(element: Element, handler: ResizeHandler): void {

        if (!this._resizeHandlers) {
            this._resizeHandlers = new Map();
        }

        this._observer.observe(element);
        this._resizeHandlers.set(element, handler);
    }

    public unobserve(element: Element): void {

        if (!this._resizeHandlers) {
            return;
        }

        this._observer.unobserve(element);
        this._resizeHandlers.delete(element);
    }

    private _resizeHandler = (entries: ResizeObserverEntry[]): void => {

        if (!this._resizeHandlers) {
            return;
        }

        const resizeHandlers = this._resizeHandlers;

        entries.forEach((entry: ResizeObserverEntry) => {

            const handler: ResizeHandler | undefined = resizeHandlers.get(entry.target);

            if( !handler) {
                return;
            }

            handler.handleResize(entry.contentRect);
        });
    }
}
