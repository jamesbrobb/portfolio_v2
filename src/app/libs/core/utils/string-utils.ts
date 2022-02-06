
export class StringUtils {

    public static replaceMultiple(source: string, targetValues: string[], values: string[]): string {

        let result: string = source;

        targetValues.forEach((targetValue: string, index: number) => {
            result = result.replace(targetValue, values[index]);
        });

        return result;
    }

    public static toCamelCase(text: string): string {
        return text.replace(/-\w/g, (txt) => this._clearAndUpper(txt));
    }

    public static toPascalCase(text: string): string {
        return text.replace(/(^\w|-\w)/g, (txt) => this._clearAndUpper(txt));
    }

    private static  _clearAndUpper(text: string): string {
        return text.replace(/-/, "").toUpperCase();
    }
}
