import {AsyncSubject, Observable, of} from "rxjs";
import {Command, ObservableCommand} from "./command";


export class TypeA {
    value = 0;
    doSomething(): TypeA {
        this.value += 10;
        return this;
    }
}

export class TypeB {
    value = 0;
    doSomethingElse(): TypeB {
        this.value += 10;
        return this;
    }
}


export class TypeACommand implements Command<TypeA> {

    execute(input: TypeA): TypeA {
        return input.doSomething();
    }
}

export class TypeBCommand implements Command<TypeB> {

    execute(input: TypeB): TypeB {
        return input.doSomethingElse();
    }
}

export class TypeCCommand implements Command<string, string | number | Function>{

    execute(input: string): string | number | Function {
        return input;
    }
}

export class TypeDCommand implements ObservableCommand<string> {

    execute(input: string): Observable<string> {
        return of(input);
    }
}

export class TypeECommand {

    execute(input: string): string | Observable<string> {
        return of(input);
    }
}

export class TypeAInBOutCommand implements Command<TypeA, TypeB> {

    execute(input: TypeA): TypeB {
        return new TypeB()
    }
}

export class TypeAInABOutCommand implements Command<TypeA, TypeA | TypeB> {

    execute(input: TypeA): TypeA | TypeB {
        return new TypeB()
    }
}

export class TypeABInABOutCommand implements Command<TypeA | TypeB, TypeA | TypeB> {

    execute(input: TypeA | TypeB): TypeA | TypeB {
        return new TypeB()
    }
}

export class TypeABInAOutCommand implements Command<TypeA | TypeB, TypeA> {

    execute(input: TypeA | TypeB): TypeA {
        return new TypeA()
    }
}

export class MixedTypeCommand implements Command<TypeA | TypeB> {

    execute(input: TypeA | TypeB): TypeA | TypeB {

        if(input instanceof TypeA) {
            return input.doSomething();
        }
        return input.doSomethingElse();
    }
}

export class BypassTriggerCommandType implements Command<TypeA, TypeB> {

    execute(input: TypeA): TypeB {

        return new TypeB();
    }
}

export class MixedTypeObservableCommand implements Command<string | number, Observable<Function | boolean>> {

    execute(input: string | number): Observable<Function | boolean> {
        return of(() => input);
    }
}

export class MixedTypeObservableCommandV2 implements ObservableCommand<string | number, string | number | Function | boolean> {
    execute(input: string | number): Observable<string> | Observable<string | number | Function | boolean> {
        return of(input);
    }
}

export class MixedDuplicateTypeCommand implements Command<string | number, string | Function> {

    execute(input: string | number): string | Function {
        return `${input}`;
    }
}


export class AsyncTestCommand implements ObservableCommand<TypeA> {

    execute(input: TypeA): Observable<TypeA> {

        const source: AsyncSubject<TypeA> = new AsyncSubject<TypeA>();

        input.value += 1000;

        setTimeout(() => {
            source.next(input);
            source.complete();
        }, 2000);

        return source.asObservable();
    }
}


export class ObservableInAndOutCommand {

    execute(input: Observable<TypeA>): Observable<TypeA> {
        return input;
    }
}

export class ExtraArgsCommand {

    execute(input: TypeA, arg1: string, arg2: Function): Observable<TypeA> {

        arg2();

        return of(input);
    }
}

export class ExtraArgsCommandWithBypassType {

    execute(input: TypeA, arg1: string, arg2: Function): Observable<TypeA|TypeB> {

        arg2();

        return of(input);
    }
}
