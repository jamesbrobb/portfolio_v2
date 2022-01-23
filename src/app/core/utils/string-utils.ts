
export class StringUtils {

    public static replaceMultiple(source: string, targetValues: string[], values: string[]): string {

        let result: string = source;

        targetValues.forEach((targetValue: string, index: number) => {
            result = result.replace(targetValue, values[index]);
        });

        return result;
    }
}
