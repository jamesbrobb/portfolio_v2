import {Component, ContentChild, Input, NgModule, TemplateRef} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResponsiveContainerDirectiveModule} from "../../responsive/container/responsive-container.directive";



@Component({
  selector: 'grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss']
})
export class GridLayoutComponent {

  @Input() dataProvider: unknown[] | undefined;

  @ContentChild(TemplateRef, {static: true})
  public itemTemplate: TemplateRef<any> | null = null;

  public trackById(index: number, item: any): string {
    return item['id'] ?? undefined;
  }
}


@NgModule({
  imports: [
    CommonModule,
    ResponsiveContainerDirectiveModule
  ],
  declarations: [GridLayoutComponent],
  exports: [GridLayoutComponent]
})
export class GridLayoutComponentModule { }
