<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->

<a name="dynamic-component-loader"></a>
# Dynamic component loader

Renders a transparent color overlay.

<a name="dynamic-component-loader-usage"></a>
## Usage

```ts
import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Output} from "@angular/core";


export interface MyComponentIO {
  myComponentInput?: string;
  myComponentOutput: EventEmitter<string>;
}

@Component({
  selector: 'my-component'
})
export class MyComponent implements MyComponentIO {

  @Input() myComponentInput?: string;
  @Output() myComponentOutput = new EventEmitter<string>();
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MyComponent],
  exports: [MyComponent]
})
export class MyComponentModule {}
```

```ts
import {NgModule} from "@angular/core";
import {BaseDynamicModule} from "@jbr/components/dynamic/dynamic-component-service";

@NgModule({
  imports: [
    MyComponentModule
  ]
})
export class MyComponentDynamicModule extends BaseDynamicModule {
  static override readonly COMPONENT = MyComponent;
  static override readonly MODULE = MyComponentModule;
}
```

```ts
import {Directive} from "@angular/core";

import {DynamicComponentModule} from "@jbr/components/dynamic/dynamic-component.module";
import {DynamicComponentModuleMapService} from "@jbr/components/dynamic/dynamic-component-service";
import {DynamicLoaderDirective} from "@jbr/components/dynamic/dynamic-component.directive";


@Directive({
  selector: '[myComponentLoader]'
})
export class MyComponentLoaderDirective extends DynamicLoaderDirective<MyComponent> implements MyComponentIO {

  @Input() myComponentInput?: string;
  @Output() myComponentOutput = new EventEmitter<string>();

  ngOnInit() {
    this._setComponentSelector('my-component-dynamic');
  }

  protected override _updateInstanceInputValues(): void {
    this._instance!.myComponentInput = this.myComponentInput;
  }

  protected override _setUpInstanceOutputs(): void {
    this._instance!.myComponentOutput
      .pipe(takeUntil(this._destroyed$))
      .subscribe((arg) => this.myComponentOutput.emit(arg));
  }
}


@NgModule({
  imports:[
    DynamicComponentModule
  ],
  providers: [{
    provide: DynamicComponentModuleMapService,
    useValue: {
      'my-component-dynamic': () => import('./my-component.dynamic.module'),
    },
    multi: true
  }],
  declarations: [MyComponentLoaderDirective],
  exports: [MyComponentLoaderDirective]
})
export class MyCompnonentLoaderModule {}
```


```html

<ng-container myComponentLoader
              [myComponentInput]="myComponentInput"
              (myComponentOutput)="onMyComponentInput($event)">
</ng-container>

```

