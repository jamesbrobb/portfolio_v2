import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    selector: 'html-renderer',
    templateUrl: './html-renderer.component.html',
    styleUrls: ['./html-renderer.component.scss']
})
export class HtmlRendererComponent implements OnChanges {

    @Input() html: string = '';
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    public safeHTML: SafeHtml | undefined;

    private _sanitizer: DomSanitizer;

    constructor(sanitizer: DomSanitizer) {
        this._sanitizer = sanitizer;
    }

    public ngOnChanges(): void  {

        const html = this._detectAndInsertLinks(this.html);
        this.safeHTML = this._sanitizer.bypassSecurityTrustHtml(html);
    }

    private _detectAndInsertLinks(text: string): string {

        if (!text) {
            return text;
        }

        text = text.replace(/\b(((https?):\/\/|www)[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a>');

        return text.replace(/\b(href=")(www)/g, '$1http:\/\/$2');
    }

    public handleClick(event: Event): void {
        this.onChange.emit(event);
    }
}
