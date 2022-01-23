import {expectError, expectType} from 'tsd';

import {
    IfElse,
    DoesExtend,
    EqualsNever,
    ReplaceNeverWith,
    Equals,
    ReplaceTypeWith, UnwrapObservables, FilterType, SetIndexToType, SpliceTuple, ReplaceTypeInTupleWith
} from '../types';

import {Observable} from "rxjs";


class TypeA {
  doSomething(): TypeA {
    return this;
  }
}

class TypeB {
  doSomethingElse(): TypeB {
    return this;
  }
}

class TypeC {
  doSomething(): TypeC {
    return this;
  }

  doSomethingElse(): TypeB {
    return new TypeB();
  }
}

interface TestInterface<U, T = void> {
    doSomething(arg:U): U | T;
}

class TestClass implements TestInterface<number, string> {

    doSomething(arg: number): number | string {

        if(arg < 5) {
            return arg
        }

        return 'test'
    }
}

class TestClass2 implements TestInterface<number> {

    doSomething(arg: number): number {
        return arg;
    }
}

declare const bool: boolean;
declare const str: string;
declare const num: number;
declare const strOrNum: string | number;



// IfElse

expectType<IfElse<true, TypeA, TypeB>>(new TypeA);

expectType<IfElse<false, TypeA, TypeB>>(new TypeB);


// DoesExtend

expectType<DoesExtend<Object, Function>>(false);

expectType<DoesExtend<Function, Object>>(true);

expectType<DoesExtend<Function, Function>>(true);

expectType<DoesExtend<boolean, true>>(false);

expectType<DoesExtend<boolean, false>>(false);

expectType<DoesExtend<false, boolean>>(true);

expectType<DoesExtend<true, boolean>>(true);

expectType<DoesExtend<boolean, boolean>>(true);

expectType<DoesExtend<number | string, number>>(false); // distributive

expectError<DoesExtend<number | string, number, false>>(bool); // non-distributive

expectType<DoesExtend<number | string, number, false>>(false); // non-distributive

expectType<DoesExtend<TestInterface<string, number>, TestInterface<string, number>>>(true);
expectError<DoesExtend<TestInterface<string, number>, TestInterface<string, number>>>(bool);

expectType<DoesExtend<TestInterface<string, number>, TestInterface<string, number>, false>>(true);
expectError<DoesExtend<TestInterface<string, number>, TestInterface<string, number>, false>>(bool);

expectType<DoesExtend<TestInterface<number, string>, TestInterface<string, number>>>(false);
expectError<DoesExtend<TestInterface<number, string>, TestInterface<string, number>>>(bool);

expectType<DoesExtend<TestInterface<number>, TestInterface<string, number>>>(false);
expectError<DoesExtend<TestInterface<number>, TestInterface<string, number>>>(bool);

expectType<DoesExtend<TestInterface<string>, TestInterface<string, number>>>(false);
expectError<DoesExtend<TestInterface<string>, TestInterface<string, number>>>(bool);

expectType<DoesExtend<TestInterface<string>, TestInterface<string, number>, false>>(false);
expectError<DoesExtend<TestInterface<string>, TestInterface<string, number>, false>>(bool);

expectType<DoesExtend<TestInterface<string, number>, TestInterface<string>>>(false);
expectError<DoesExtend<TestInterface<string, number>, TestInterface<string>>>(bool);

expectType<DoesExtend<TestInterface<string, number>, TestInterface<number>>>(false);
expectError<DoesExtend<TestInterface<string, number>, TestInterface<number>>>(bool);

expectType<DoesExtend<TestClass, TestClass>>(true);
expectError<DoesExtend<TestClass, TestClass>>(bool);

expectType<DoesExtend<TestClass, TestClass2>>(false);
expectError<DoesExtend<TestClass, TestClass2>>(bool);

expectType<DoesExtend<TestClass2, TestClass>>(true);
expectError<DoesExtend<TestClass2, TestClass>>(bool);

expectType<DoesExtend<TestClass, TestClass2, false>>(false);
expectError<DoesExtend<TestClass, TestClass2, false>>(bool);

expectType<DoesExtend<TestClass2, TestClass, false>>(true);
expectError<DoesExtend<TestClass2, TestClass, false>>(bool);


// Equals

expectType<Equals<TypeA, TypeB>>(false);

expectType<Equals<TypeB, TypeA>>(false);

expectType<Equals<TypeB, TypeC>>(false);

expectType<Equals<TypeB, TypeC, true>>(false);

expectType<Equals<TypeC, TypeB, true>>(true);

expectType<Equals<TypeA, TypeB, true>>(false);

expectType<Equals<TypeB, TypeA, true>>(false);

expectType<Equals<TypeB | TypeA, TypeA>>(false);
expectError<Equals<TypeB | TypeA, TypeA>>(bool);

expectType<Equals<TypeA, TypeA | TypeB>>(false);
expectError<Equals<TypeA, TypeA | TypeB>>(bool);

expectType<Equals<TypeB | TypeA, TypeA | TypeB>>(true);
expectError<Equals<TypeB | TypeA, TypeA | TypeB>>(bool);

// EqualsNever

expectType<EqualsNever<never>>(true);

expectType<EqualsNever<true>>(false);


// ReplaceNeverWith

expectType<ReplaceNeverWith<never, string>>(str);

expectType<ReplaceNeverWith<number, string>>(num);

expectType<ReplaceNeverWith<Exclude<string | number, string | number>, true>>(true);


// ReplaceTypeWith

expectType<ReplaceTypeWith<void, void, string>>(str);

expectType<ReplaceTypeWith<string | number, string, never>>(num);

expectType<ReplaceTypeWith<string | number, boolean, never>>(strOrNum);

expectType<ReplaceTypeWith<string | void, void, never>>(str);


// UnwrapObservables

expectType<UnwrapObservables<Observable<string>>>(str);

expectType<UnwrapObservables<number | Observable<string>>>(strOrNum);


// FilterType

type ftTuple = [undefined, string, undefined, Function, undefined, number];

declare const ft1: [string, Function, number];
expectType<FilterType<ftTuple>>(ft1);

declare const ft2: [undefined, string, undefined, Function, undefined];
expectType<FilterType<ftTuple, number>>(ft2);

declare const ft3: [undefined, string, undefined, Function, undefined, number];
expectType<FilterType<ftTuple, null>>(ft3);

declare const ft4: [string, number];
expectType<FilterType<ftTuple, undefined | Function>>(ft4);


// SetIndexToType

type siTuple = [undefined, string, undefined, Function, undefined, number];

declare const si1: [undefined, undefined, undefined, Function, undefined, number]
expectType<SetIndexToType<siTuple, 1>>(si1);

declare const si2: [undefined, string, boolean, Function, undefined, number]
expectType<SetIndexToType<siTuple, 2, boolean>>(si2);


// SpliceTuple

type splTuple = [number, string, Function, boolean, number];

declare const spl1: [number, string, boolean, number];
expectType<SpliceTuple<splTuple,2>>(spl1);


// ReplaceTypeInTupleWith

type rtitwTuple = [undefined, string, undefined, Function, undefined, number];

declare const rtitw1: [boolean, string, boolean, Function, boolean, number];
expectType<ReplaceTypeInTupleWith<rtitwTuple, undefined, boolean>>(rtitw1)

declare const rtitw2: rtitwTuple;
expectType<ReplaceTypeInTupleWith<rtitwTuple, boolean, number>>(rtitw2)

