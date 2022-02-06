import {NgModule, Component, Input, OnDestroy} from '@angular/core';
import {ResponsiveContainerDirectiveModule} from "../../libs/components/responsive/container/responsive-container.directive";


// THIS CODE IS GENERATED - DO NOT EDIT
@Component({
  selector: 'responsive-container-example',
  template: `
<div class="container" responsiveContainer></div>
`,
  styleUrls: ['./responsive-container-example.scss']
})
export class ResponsiveContainerExampleComponent implements OnDestroy {

  @Input() data: any;

  ngOnDestroy() {
    console.log('ResponsiveContainerExampleComponent::ngOnDestroy')
  }
}

// THIS CODE IS GENERATED - DO NOT EDIT
@NgModule({
  imports: [
    ResponsiveContainerDirectiveModule
  ],
  declarations: [
    ResponsiveContainerExampleComponent
  ]
})
export class ResponsiveContainerExampleComponentModule {}
