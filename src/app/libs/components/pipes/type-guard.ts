import {Pipe, PipeTransform} from "@angular/core";
import {TypeGuard} from "@jbr/types";



@Pipe({
  name: 'guardType'
})
export class GuardTypePipe implements PipeTransform {

  transform<A, B extends A>(value: A, typeGuard: TypeGuard<A, B>): B | undefined {
    return typeGuard(value) ? value : undefined;
  }
}
