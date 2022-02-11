import {Component, Input, NgModule, OnChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ResponsiveContainerDirectiveModule} from "@jbr/components/responsive/container/responsive-container.directive";


@Component({
  selector: 'flex-grid-example',
  template: `
    <div class="grid-layout" responsiveContainer>

      <div class="grid-layout-item" *ngFor="let item of dataProvider">

        <div class="item">
          <div>{{item.title}}</div>
        </div>

      </div>

    </div>
  `,
  styleUrls:['./flex-grid-example.component.scss']
})
export class FlexGridExampleComponent implements OnChanges {

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
    CommonModule,
    ResponsiveContainerDirectiveModule
  ],
  declarations: [
    FlexGridExampleComponent
  ]
})
export class FlexGridExampleComponentModule {}
