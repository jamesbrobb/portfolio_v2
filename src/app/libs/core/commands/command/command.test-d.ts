import {expectType} from "tsd";
import {Equals} from "../../../../../types";
import {Command, GetCommandTypeParams} from "./command";
import {
    AsyncTestCommand,
    BypassTriggerCommandType, MixedDuplicateTypeCommand,
    MixedTypeCommand, MixedTypeObservableCommand, MixedTypeObservableCommandV2, ObservableInAndOutCommand, TypeA,
    TypeACommand, TypeB,
    TypeBCommand,
    TypeCCommand,
    TypeDCommand,
    TypeECommand
} from "./command.mocks";

import {Observable} from "rxjs";


// GetCommandTypeParams

// Interfaces

type ghp1 = GetCommandTypeParams<Command<string>>;
expectType<Equals<[string, string, []], ghp1>>(true);

type ghp2 = GetCommandTypeParams<Command<string, number>>;
expectType<Equals<[string, number, []], ghp2>>(true)

type ghp3 = GetCommandTypeParams<Command<string | number, boolean>>;
expectType<Equals<[string | number, boolean, []], ghp3>>(true);

type ghp4 = GetCommandTypeParams<Command<string | number, number>>;
expectType<Equals<[string | number, number, []], ghp4>>(true);

type ghp5 = GetCommandTypeParams<Command<string, string>>;
expectType<Equals<[string, string, []], ghp5>>(true);

type ghp6 = GetCommandTypeParams<Command<string, string | boolean>>;
expectType<Equals<[string, string | boolean, []], ghp6>>(true);

type ghp7 = GetCommandTypeParams<Command<string, number | boolean | Function>>;
expectType<Equals<[string, boolean | number | Function, []], ghp7>>(true);

// Classes

type ghp8 = GetCommandTypeParams<TypeACommand>;
expectType<Equals<[TypeA, TypeA, []], ghp8>>(true);

type ghp9 = GetCommandTypeParams<TypeBCommand>;
expectType<Equals<[TypeB, TypeB, []], ghp9>>(true);

type ghp10 = GetCommandTypeParams<TypeCCommand>;
expectType<Equals<[string, (string | number | Function), []], ghp10>>(true);

type ghp11 = GetCommandTypeParams<TypeDCommand>;
expectType<Equals<[string, Observable<string>, []], ghp11>>(true);

type ghp12 = GetCommandTypeParams<TypeECommand>;
expectType<Equals<[string, string | Observable<string>, []], ghp12>>(true);

type ghp13 = GetCommandTypeParams<MixedTypeCommand>;
expectType<Equals<[TypeB | TypeA, TypeA | TypeB, []], ghp13>>(true);

type ghp14 = GetCommandTypeParams<BypassTriggerCommandType>;
expectType<Equals<[TypeA, TypeB, []], ghp14>>(true);

type ghp15 = GetCommandTypeParams<MixedTypeObservableCommand>;
expectType<Equals<[string | number, Observable<boolean | Function>, []], ghp15>>(true);

type ghp16 = GetCommandTypeParams<MixedTypeObservableCommandV2>;
expectType<Equals<[string | number, Observable<string | number | boolean | Function>, []], ghp16>>(true);

type ghp17 = GetCommandTypeParams<MixedDuplicateTypeCommand>;
expectType<Equals<[string | number, string | Function, []], ghp17>>(true);

type ghp18 = GetCommandTypeParams<AsyncTestCommand>;
expectType<Equals<[TypeA, Observable<TypeA>, []], ghp18>>(true);

type ghp19 = GetCommandTypeParams<ObservableInAndOutCommand>;
expectType<Equals<[Observable<TypeA>, Observable<TypeA>, []], ghp19>>(true);

// unwrap output Observables

type ghp20 = GetCommandTypeParams<TypeDCommand, true>;
expectType<Equals<[string, string, []], ghp20>>(true);

type ghp21 = GetCommandTypeParams<TypeECommand, true>;
expectType<Equals<[string, string | string, []], ghp21>>(true);

type ghp22 = GetCommandTypeParams<MixedTypeObservableCommand, true>;
expectType<Equals<[string | number, boolean | Function, []], ghp22>>(true);

type ghp23 = GetCommandTypeParams<MixedTypeObservableCommandV2, true>;
expectType<Equals<[string | number, string | number | boolean | Function, []], ghp23>>(true);

type ghp24 = GetCommandTypeParams<AsyncTestCommand, true>;
expectType<Equals<[TypeA, TypeA, []], ghp24>>(true);

type ghp25 = GetCommandTypeParams<ObservableInAndOutCommand, true>;
expectType<Equals<[Observable<TypeA>, TypeA, []], ghp25>>(true);
