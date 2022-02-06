import {NgModule, Component, Input, OnDestroy} from '@angular/core';
import {GridLayoutComponentModule} from "../../libs/components/layout/grid/grid-layout.component";



// THIS CODE IS GENERATED - DO NOT EDIT
@Component({
  selector: 'grid-layout-example',
  template: `
<grid-layout class="grid-layout" [dataProvider]="data.dataProvider">

  <ng-template let-item="item">

    <div class="item">
      <div>{{item.title}}</div>
    </div>

  </ng-template>

</grid-layout>

`,
  styleUrls: ['./grid-layout-example.scss']
})
export class GridLayoutExampleComponent implements OnDestroy {

  @Input() data: any;

  ngOnDestroy() {
    console.log('GridLayoutExampleComponent::ngOnDestroy')
  }
}

// THIS CODE IS GENERATED - DO NOT EDIT
@NgModule({
  imports: [
    GridLayoutComponentModule
  ],
  declarations: [
    GridLayoutExampleComponent
  ]
})
export class GridLayoutExampleComponentModule {}
