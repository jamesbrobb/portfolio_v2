

export class SvgRegistryMock {


    get availableSvgNameList(): string[] { return []; }

    public registerSvgs(icons: any): void {

    }

    public isSvgRegistered(svgName: string): boolean {
        return false;
    }

    public getSvgByName(name: string): any {
        return;
    }
}
