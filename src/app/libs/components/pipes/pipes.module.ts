import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GuardTypePipe} from "@jbr/components/pipes/type-guard";


const PIPES = [GuardTypePipe]

@NgModule({
  imports: [CommonModule],
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule {}
