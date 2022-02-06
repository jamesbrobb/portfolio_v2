import * as deepMerge from 'deepmerge';
import {Options} from "deepmerge";

export const MISSING_OBJECT_PROP_ERROR_MESSAGE = (propertyName: string, prop: string) => `ObjectUtils:: There is no property '${propertyName}'. Failed at key '${prop}'`;


type VALID_JSON_TYPES = {[key: string]: VALID_JSON_TYPES} | Array<VALID_JSON_TYPES> | string | boolean | number | null;
type VALID_JSON = {[key: string]: VALID_JSON_TYPES};


export class ObjectUtils {

  public static clone<R>(source: VALID_JSON): R {
    return JSON.parse(JSON.stringify(source));
  }

  public static simpleMerge(target: {[key: string]: unknown}, target1: {[key: string]: unknown}): void {

    Object.keys(target1)
      .forEach((key: string) => {
        target[key] = target1[key];
      });
  }

  public static deepMerge(objects: object[]): any {

    const overwriteMerge = (target: any[], source: any[], options?: Options) => source;

    return deepMerge.all(objects, {
      arrayMerge: overwriteMerge
    });
  }

  public static recursivelyFindProperty(propertyName: string, target: {[key:string]: any}): unknown {

    let trgt: {[key:string]: any} = target;

    propertyName.split('.').forEach((prop: string) => {

      trgt = trgt[prop];

      if (trgt === undefined) {
        throw new Error(MISSING_OBJECT_PROP_ERROR_MESSAGE(propertyName, prop));
      }
    });

    return trgt;
  }

  public static isPropertyChainDefined(obj: {[key:string]: any }, path: string): boolean {

    const chainedProperties = path.split('.');

    const res = (chainedProperties.length > 0) ?
      chainedProperties.reduce((accumulator, property) => accumulator[property] || 0, obj) :
      obj[path];

    return !!res;
  }

  public static isEmpty(obj: {[key:string]: any }): boolean {
      return !Object.keys(obj).length;
  }
}
