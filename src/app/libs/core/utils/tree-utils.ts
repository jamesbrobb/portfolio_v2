import {GetPropNamesByType, TypeGuard} from "@jbr/types";


export function walk<T, C extends T>(
  arg: T[],
  hasChildren: TypeGuard<T, C>,
  childrenPropName: GetPropNamesByType<C, T[]>,
  func: (arg: T) => void
): void {

  for(let i: number = 0; i < arg.length; i++) {

    const node: T = arg[i];

    func(node);

    if(hasChildren(node)) {
      walk<T, C>((node[childrenPropName] as unknown) as T[], hasChildren, childrenPropName, func);
    }
  }
}


export function flatten<T, C extends T>(
  arg: T[],
  hasChildren: TypeGuard<T, C>,
  childrenPropName: GetPropNamesByType<C, T[]>,
): T[] {

  const result: T[] = [],
    func = (arg: T) => {
      const node: T = {...arg};
      delete node[(childrenPropName as unknown) as keyof T];
      result.push(node);
    };

  walk<T, C>(arg, hasChildren, childrenPropName, func);

  return result;
}
