import {
  Component,
  ComponentRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DynamicComponent, DynamicComponentService} from "../dynamic-component-service";
import {ExamplesService} from "../examples-service";

@Component({
  selector: 'example-loader',
  templateUrl: './example-loader.component.html',
  styleUrls: ['./example-loader.component.css']
})
export class ExampleLoaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() selector!: string;
  @Input() data: any = {};

  @ViewChild('exampleHost', {read: ViewContainerRef, static: true})
  public container!: ViewContainerRef;

  private _example: ComponentRef<DynamicComponent> | undefined;

  constructor(
    private _componentService: DynamicComponentService,
    private _examplesService: ExamplesService
  ) { }

  ngOnInit(): void {

    this._componentService
      .getComponentBySelector(
        this.selector,
        () => this._examplesService.importModuleByComponentSelector(this.selector)
      )
      .then((componentRef) => {

        this._example = componentRef;
        this._example.instance.data = this.data;
        this.container.insert(this._example.hostView);

        /*const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
        componentRef.instance.data = adItem.data;*/
      });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(!this._example) {
      return;
    }

    this._example.instance.data = this.data;
  }

  ngOnDestroy(): void {

    this.container.clear();

    this._example?.destroy();
    this._example = undefined;
  }
}
