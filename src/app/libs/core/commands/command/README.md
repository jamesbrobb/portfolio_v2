# Command

A simple interface that defines an input and output type, and optional additional arguments.
<br/><br/>

```ts

import {Command} from 'commands';

class NonMatchingIOCommand implements Command<string, number> {
    execute(input: string): number {
        return 1;
    }
}

class StringInStringOutCommand implements Command<string> {
    execute(input: string): string {
        // do something useful
        return input;
    }
}

class NumberInNumberOutCommand implements Command<number> {
    execute(input: number): number {
        // do something useful
        return input;
    }
}

class NumberInNumberOrStringOutCommand implements Command<number, number | string> {
    execute(input: number): number | string {
        input++;
        if(input > 5) {
            return 'larger than 5';
        }
        return input;
    }
}

class NumberInNumberOrBooleanOutCommand implements Command<number, number | boolean> {
    execute(input: number): number | boolean {
        input++;
        if(input > 5) {
            return false;
        }
        return input;
    }
}

class CommandWithExtraArguments implements Command<number, number, [string, Function]> {
    execute(input: number, extra1: string, extra2: Function): number {
        input+=2;
        return input;
    }
}
```
