import {
  Component,
  ComponentRef,
  EventEmitter, Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {DynamicComponentService} from "../dynamic-component/dynamic-component-service";



export interface ExampleComponent {
  data: any;
}


@Component({
  selector: 'example-loader-component',
  template: `<ng-container #host></ng-container>`,
  styles: [`:host{display:block}`]
})
export class ExampleLoaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() selector!: string;
  @Input() data: any = {};

  @Output() dataChange = new EventEmitter<any>();

  @ViewChild('host', {read: ViewContainerRef, static: true})
  public container!: ViewContainerRef;

  private _example: ComponentRef<ExampleComponent> | undefined;
  private _inputs: {[key:string]: string} | undefined;

  constructor(
    private _injector: Injector,
    private _componentService: DynamicComponentService
  ) {}

  async ngOnInit() {

    const {ngModuleRef, componentType} = await this._componentService.loadComponentBySelector<ExampleComponent>(this.selector);

    this._example = this.container.createComponent<ExampleComponent>(componentType, {injector:this._injector, ngModuleRef:ngModuleRef});

    //this._inputs = (arg.componentType as any).ɵcmp.inputs;

    this.ngOnChanges();
  }

  ngOnChanges(): void {

    if(!this._example) {
      return;
    }

    /*for(let input in this._inputs) {
      (this._example.instance as any)[input] = this.data[input];
    }*/

    this._example.instance.data = this.data;
  }

  ngOnDestroy(): void {

    this.container.clear();

    this._example?.destroy();
    this._example = undefined;
  }
}
