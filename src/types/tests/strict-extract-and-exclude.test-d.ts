import {StrictExclude, StrictExtract} from "../types";
import {expectType} from "tsd";


interface InterfaceOne {
    prop1: string;
    prop2: number;
}

interface InterfaceTwo extends InterfaceOne {
    prop3: Function;
}

class MyClassOne implements InterfaceOne {
    prop1: string = 'test';
    prop2: number = 1;
}

class MyClassTwo extends MyClassOne implements InterfaceTwo {

    prop3: Function = () => {};
}

class MyClassThree {
    prop1: string = 'test';
    prop2: number = 1;
    prop3: Function = () => {};
}

class MyClassFour {
    prop1: string = 'test';
    prop2: number = 1;
    prop3: Function = () => {};
    prop4: boolean = false;
}


type objOne = {
    prop1: string;
    prop2: number;
}

type objTwo = {
    prop1: string;
    prop2: number;
    prop3: Function;
}


// StrictExtract

declare const ext1: Extract<objOne | objTwo | string | number, string | number | objOne>;
expectType<string | number | objOne | objTwo>(ext1);

declare const stext1: StrictExtract<objOne | objTwo | string | number, string | number | objOne>
expectType<string | number | objOne>(stext1);

declare const one: StrictExtract<objOne | objTwo | MyClassThree, InterfaceTwo>
expectType<objTwo | MyClassThree>(one);

declare const two: StrictExtract<objOne | objTwo | MyClassThree, InterfaceOne>
expectType<objOne>(two);

declare const three: StrictExtract<MyClassOne | MyClassTwo | MyClassThree | MyClassFour, InterfaceOne>
expectType<MyClassOne>(three);

declare const four: StrictExtract<MyClassOne | MyClassTwo | MyClassThree | MyClassFour, InterfaceTwo>
expectType<MyClassTwo | MyClassThree>(four);

declare const five: StrictExtract<MyClassOne | MyClassTwo | MyClassThree | MyClassFour, MyClassFour>
expectType<MyClassFour>(five);
/*
declare const fiveA: StrictExtract<boolean, true | false>
expectType<never>(fiveA);

declare const fiveB: StrictExtract<true | false, boolean>
expectType<never>(fiveB);

declare const fiveC: StrictExtract<true, boolean>
expectType<never>(fiveC);

declare const fiveD: StrictExtract<false, boolean>
expectType<never>(fiveD);

declare const fiveE: StrictExtract<boolean, true>
expectType<never>(fiveE);

declare const fiveF: StrictExtract<boolean, false>
expectType<never>(fiveF);
*/

// StrictExclude

declare const excl: Exclude<objOne | objTwo | string | number, objOne | string | number>
expectType<never>(excl);

declare const strExcl: StrictExclude<objOne | objTwo | string | number, objOne | string | number>
expectType<objTwo>(strExcl);

declare const six: StrictExclude<MyClassOne | MyClassTwo, MyClassOne | MyClassTwo>
expectType<never>(six);

declare const seven: StrictExclude<MyClassOne | MyClassTwo | string, MyClassOne | MyClassTwo>
expectType<string>(seven);

declare const eight: StrictExclude<MyClassOne | MyClassTwo | string, MyClassOne>
expectType<string | MyClassTwo>(eight);

declare const nine: StrictExclude<MyClassOne | MyClassTwo | string, MyClassTwo>
expectType<string | MyClassOne>(nine);

/*
declare const nineA: StrictExclude<boolean, true | false>
expectType<boolean>(nineA);

declare const nineB: StrictExclude<true | false, boolean>
expectType<true | false>(nineB);

declare const nineC: StrictExclude<true, boolean>
expectType<true>(nineC);

declare const nineD: StrictExclude<false, boolean>
expectType<false>(nineD);

declare const nineE: StrictExclude<boolean, true>
expectType<boolean>(nineE);

declare const nineF: StrictExclude<boolean, false>
expectType<boolean>(nineF);
*/
