import {DynamicComponentModuleMap} from "./dynamic-component.module";


export class ExamplesService {

  constructor(
    private _modulesMap: DynamicComponentModuleMap
  ) {}

  importModuleByComponentSelector(selector: string): Promise<any> {

    const moduleName = `${this.toPascalCase(selector)}Module`;

    return this.importModuleByName(moduleName);
  }

  importModuleByName(name: string): Promise<any> {

    const func = this._modulesMap[name];

    if(!func) {
      throw new Error(`no module registered for the name ${name}`);
    }

    return func().then((m: any) => m[name]);
  }

  toCamelCase(text: string): string {
    return text.replace(/-\w/g, (txt) => this._clearAndUpper(txt));
  }

  toPascalCase(text: string): string {
    return text.replace(/(^\w|-\w)/g, (txt) => this._clearAndUpper(txt));
  }

  private _clearAndUpper(text: string): string {
    return text.replace(/-/, "").toUpperCase();
  }
}
