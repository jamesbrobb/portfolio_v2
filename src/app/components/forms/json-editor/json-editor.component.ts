import { Component, Input, Output, EventEmitter, OnChanges  } from '@angular/core';
import beautify from 'json-beautify';


const config = {
    codemirror: {
        lineNumbers: true,
        mode: 'application/json',
        lint: true,
        smartIndent: true,
        indentUnit: 2,
        autofocus: false,
        autoRefresh: true,
        autoCloseBrackets: true,
        scrollbarStyle: null,
        theme: 'xq-dark'
    },
    jsonBeautifier: {
        indentationSpaces: 2,
        characterLimit: null
    }
};

@Component({
    selector: 'json-editor',
    template: `
        <codemirror-component
            [config]='config'
            [value]='formattedValue'
            (onChange)='onChangeHandler($event)'
        ></codemirror-component>
    `,
    styleUrls: [ './json-editor.component.scss']
})
export class JsonEditorComponent implements OnChanges {

    @Input() value: any = {};
    @Output() onChange: EventEmitter<Object> = new EventEmitter<Object>();

    public config: any;
    public formattedValue: string | undefined;

    ngOnChanges() {
        this.config = config.codemirror;
        this.formattedValue = this._formatValue(this.value);
    }

    public onChangeHandler(value: string): void {

        try {
            this.onChange.emit( JSON.parse(value) );
        } catch (e) {
            // we don't emit any value when it is not a valid json
        }
    }

    private _formatValue(value: any): string {

        return beautify (
            value,
            (...args: any[]) => args[1],
            config.jsonBeautifier.indentationSpaces
        );
    }
}
