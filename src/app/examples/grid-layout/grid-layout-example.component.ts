import {NgModule, Component, Input, OnDestroy, OnChanges} from '@angular/core';
import {GridLayoutComponentModule} from "@jbr/components/layout/grid/grid-layout.component";



@Component({
  selector: 'grid-layout-example',
  template: `
<grid-layout class="grid-layout" [dataProvider]="dataProvider">

  <ng-template let-item="item">

    <div class="item">
      <div>{{item.title}}</div>
    </div>

  </ng-template>

</grid-layout>
`,
  styleUrls: ['./grid-layout-example.scss']
})
export class GridLayoutExampleComponent implements OnChanges {

  @Input() set itemCount(arg: number) {
    this._itemCount = Math.min(Math.max(1, arg), 20);
  };

  dataProvider: {title: string}[] = [];

  private _itemCount: number = 1;

  ngOnChanges() {
    this.dataProvider = [];
    this.dataProvider = Array.from(new Array(this._itemCount)).map((arg, index) => ({title: `Item ${index + 1}`}));
  }
}


@NgModule({
  imports: [
    GridLayoutComponentModule
  ],
  declarations: [
    GridLayoutExampleComponent
  ]
})
export class GridLayoutExampleComponentModule {}
