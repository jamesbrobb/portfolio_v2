import {
  Component,
  ElementRef,
  EventEmitter,
  Input, NgModule,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/display/autorefresh'
import {CommonModule} from "@angular/common";



@Component({
    selector: 'codemirror-component',
    template: '<textarea #editor></textarea>',
    styleUrls: [ './codemirror.component.scss' ]
})
export class CodemirrorComponent implements OnInit, OnChanges {

    @Input('value') value: string | undefined;
    @Input('config') config: CodeMirror.EditorConfiguration | undefined;
    @Output() onChange = new EventEmitter<string>();
    @Output() onFocus = new EventEmitter<boolean>();

    @ViewChild('editor', { static: true }) editor: ElementRef | undefined;

    private _codeMirror: CodeMirror.Editor | undefined;
    private _bindingUpdated: boolean = false;

    public ngOnInit(): void {

        if(!this.editor) {
          console.warn('No editor component found');
          return;
        }

        this._codeMirror = CodeMirror.fromTextArea(
            this.editor.nativeElement,
            this.config
        );

        this._codeMirror.setOption('value', this.value || '');
        this._codeMirror.on('change', () => this._onChange());
        this._codeMirror.on('focus', () => this._onFocus());
    }

    public ngOnChanges(): void {

        if (!this._codeMirror) {
            return;
        }

        this._bindingUpdated = true;
        this._codeMirror.setOption('value', this.value);
    }

    private _onChange(): void {

        if (this._bindingUpdated) {
            this._bindingUpdated = false;
            return;
        }

        this.onChange.emit(this._codeMirror?.getValue());
    }

    private _onFocus(): void {
      this.onFocus.emit();
    }
}


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CodemirrorComponent],
  exports: [CodemirrorComponent]
})
export class CodemirrorComponentModule {}
