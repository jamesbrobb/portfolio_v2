import {expectError, expectType} from "tsd";

import {
    CalculateValidAdditionalOutputType,
    CalculateValidExtrasArgType,
    CalculateValidIOType,
    CommandGroup,
    GroupAndCommandAdditionalOutputTypeMismatchError,
    GroupAndSuppliedCommandIOMismatchError,
    GroupAdditionalOutputTypeNeverError,
    GroupExtraArgsMismatchError,
    GroupIOMismatchError,
    IsCommandCompatible,
    NoCommandTypeParamError,
    HasNonMatchingOutputTypeWhenNotAllowed,
    GroupAdditionalOutputTypeError,
    IsGroupValid, IsCommandCompatibleWithGroup
} from "./command-group";

import {Command, CommandTypeTemplate} from "../command/command";

import {
    TypeA,
    TypeB,
    TypeABInABOutCommand,
    TypeACommand,
    TypeAInBOutCommand,
    TypeAInABOutCommand,
    TypeABInAOutCommand,
    TypeBCommand,
    TypeCCommand,
    TypeDCommand,
    TypeECommand,
    MixedTypeObservableCommand,
    MixedTypeObservableCommandV2,
    MixedDuplicateTypeCommand,
    AsyncTestCommand,
    ObservableInAndOutCommand,
    ExtraArgsCommand,
    ExtraArgsCommandWithBypassType
} from "../command/command.mocks";



// CalculateValidIOType

    // should return a match to the supplied IOType when

        // the IOType and supplied commands IOType are an exact match

            declare const cviot1: CalculateValidIOType<TypeA, never, TypeA>;
            expectType<TypeA>(cviot1);

            declare const cviot2: CalculateValidIOType<TypeA, TypeB, TypeA>;
            expectType<TypeA>(cviot2);

            declare const cviot2a: CalculateValidIOType<TypeA | TypeB, never, TypeA | TypeB>;
            expectType<TypeA | TypeB>(cviot2a);

        // the IOType and supplied commands IOType excluding the AdditionalOutputType are an exact match

            declare const cviot3: CalculateValidIOType<TypeA, TypeB, TypeA | TypeB>;
            expectType<TypeA>(cviot3);

        // the Input type of the supplied commands and IOType of the group commands are an exact match

            declare const cviot3a: CalculateValidIOType<TypeA | TypeB, never, TypeA, TypeA | TypeB>;
            expectType<TypeA | TypeB>(cviot3a);

    // should not return a match to the supplied IOType when

        // the IOType and supplied commands IOType aren't an exact match

            declare const cviot4: CalculateValidIOType<TypeA, never, TypeB>;
            expectType<TypeB>(cviot4);

            declare const cviot5: CalculateValidIOType<TypeA, TypeB, TypeB>;
            expectType<TypeB>(cviot5);

        // the IOType of the supplied commands is never

            declare const cviot6: CalculateValidIOType<TypeA, TypeB, never>;
            expectType<never>(cviot6);



// CalculateValidAdditionalOutputType

    // commands group commands type AdditionalOutputType === never

        // supplied commands AdditionalOutputType === never :ok:

            declare const cvat1: CalculateValidAdditionalOutputType<never, never>;
            expectType<never>(cvat1);

        // supplied commands AdditionalOutputType !== never :no:

            declare const cvat2: CalculateValidAdditionalOutputType<never, TypeA>;
            expectType<TypeA>(cvat2);


    // commands group commands type AdditionalOutputType !== never

        // supplied commands AdditionalOutputType === void :no:

            declare const cvat3: CalculateValidAdditionalOutputType<TypeB, never>;
            expectType<TypeB>(cvat3);

        // supplied commands AdditionalOutputType === commands group commands type value :ok:

            declare const cvat4: CalculateValidAdditionalOutputType<TypeA, TypeA>;
            expectType<TypeA>(cvat4);

        // supplied commands AdditionalOutputType !== commands group commands type value :no:

            declare const cvat5: CalculateValidAdditionalOutputType<TypeB, TypeA>;
            expectType<TypeA>(cvat5);


// CalculateValidExtrasArgType

    type CommandExtraArgs1 = [string, number]
    type CommandExtraArgs2 = [string, number, Function, TypeA, TypeB, TypeA]

    // should return the supplied commands group extra args: OK

        // supplied commands extra args === commands group extra args

            declare const cveat1: CalculateValidExtrasArgType<CommandExtraArgs1, CommandExtraArgs1>
            expectType<CommandExtraArgs1>(cveat1);

            declare const cveat2: CalculateValidExtrasArgType<CommandExtraArgs2, CommandExtraArgs2>
            expectType<CommandExtraArgs2>(cveat2);

        // supplied commands extra args length is less than the commands group extra args length but all arg types match

            declare const cveat3: CalculateValidExtrasArgType<CommandExtraArgs1, [string]>
            expectType<CommandExtraArgs1>(cveat3);

            declare const cveat4: CalculateValidExtrasArgType<CommandExtraArgs2, [string]>
            expectType<CommandExtraArgs2>(cveat4)

            declare const cveat5: CalculateValidExtrasArgType<CommandExtraArgs2, [string, number, Function, TypeA]>
            expectType<CommandExtraArgs2>(cveat5)

    // should return the supplied commands extra args : FAIL

        // supplied commands extra args !== group commands extra args

            declare const cveat6: CalculateValidExtrasArgType<CommandExtraArgs1, [string, Function]>
            expectType<[string, Function]>(cveat6);

        // supplied commands extra args !== group commands extra args at all

            declare const cveat6a: CalculateValidExtrasArgType<CommandExtraArgs1, [number, Function]>
            expectType<[number, Function]>(cveat6a);

            declare const cveat6c: CalculateValidExtrasArgType<[string], [number]>
            expectType<[number]>(cveat6c);

        // supplied commands extra args are longer than group commands extra args

            declare const cveat7: CalculateValidExtrasArgType<CommandExtraArgs1, [string, number, Function]>
            expectType<[string, number, Function]>(cveat7);

        // supplied commands extra args are shorter than group commands extra args

            declare const cveat8: CalculateValidExtrasArgType<CommandExtraArgs2, [string, number, boolean]>
            expectType<[string, number, boolean]>(cveat8);


// HasNonMatchingOutputTypeWhenNotAllowed

    // should only return true if not allowed and type supplied

        declare const anmot1: HasNonMatchingOutputTypeWhenNotAllowed<false, string>
        expectType<true>(anmot1);

    // should return false in all other cases

        declare const anmot2: HasNonMatchingOutputTypeWhenNotAllowed<false, never>
        expectType<false>(anmot2);

        declare const anmot3: HasNonMatchingOutputTypeWhenNotAllowed<true, never>
        expectType<false>(anmot3);

        declare const anmot4: HasNonMatchingOutputTypeWhenNotAllowed<true, string>
        expectType<false>(anmot4);


// IsGroupValid

    // Should not be valid if

        // Error if the group CommandType type variable is not set

            declare const igc1: IsGroupValid<unknown, never>;
            expectType<NoCommandTypeParamError>(igc1);

        // The Group CommandType I and O types are a mismatch

            declare const igc2: IsGroupValid<never, TypeB>;
            expectType<GroupIOMismatchError>(igc2);

        // The group has an additional output type but the type parameter wasn't set to allow it

            declare const igc3: IsGroupValid<TypeA, TypeB>;
            expectType<GroupAdditionalOutputTypeError<TypeB>>(igc3);

    // Should be valid if

        // the group has a valid IOType

            declare const igc4: IsGroupValid<TypeA, never>;
            expectType<true>(igc4);

        // the group has an additional output type and it's explicitly declare as ok

            declare const igc5: IsGroupValid<TypeA, TypeB, true>;
            expectType<true>(igc5);


// IsCommandCompatibleWithGroup

// Should not be compatible if

    // Error if the group CommandType type variable is not set

        declare const icc1: IsCommandCompatibleWithGroup<Command<unknown, unknown>, unknown, never>
        expectType<NoCommandTypeParamError>(icc1);

    // Once any calculated AdditionalOutput type has been removed from O, Error if

        // The Group CommandType I and O types are a mismatch

            declare const icc2: IsCommandCompatibleWithGroup<TypeAInBOutCommand, never, TypeB>
            expectType<GroupIOMismatchError>(icc2);

        // The group has an additional output type but the type parameter wasn't set to allow it

            declare const icc2a: IsCommandCompatibleWithGroup<TypeAInABOutCommand, TypeA, TypeB>
            expectType<GroupAdditionalOutputTypeError<TypeB>>(icc2a);

        // IO of supplied commands does not match IOType of group

            declare const icc3: IsCommandCompatibleWithGroup<TypeACommand, TypeB, never>
            expectType<GroupAndSuppliedCommandIOMismatchError<TypeB, TypeA>>(icc3);

        // IO of supplied commands is a union and IOType of group isn't an exact match

            declare const icc4: IsCommandCompatibleWithGroup<TypeABInABOutCommand, TypeA, never>;
            expectType<GroupAndSuppliedCommandIOMismatchError<TypeA, TypeA | TypeB>>(icc4);

            declare const icc4z: IsCommandCompatibleWithGroup<TypeABInABOutCommand, TypeA | string, never>;
            expectType<GroupAndSuppliedCommandIOMismatchError<TypeA | string, TypeA | TypeB>>(icc4z);

        // Group AdditionalOutputType is never and supplied commands AdditionalOutputType is not

            declare const icc4a: IsCommandCompatibleWithGroup<TypeAInABOutCommand, TypeA, never>
            expectType<GroupAdditionalOutputTypeNeverError<TypeB>>(icc4a);

        // Group AdditionalOutputType and supplied commands AdditionalOutputType are both set and do not match

            declare const icc4b: IsCommandCompatibleWithGroup<TypeAInABOutCommand, TypeA, string, true>
            expectType<GroupAndCommandAdditionalOutputTypeMismatchError<string, TypeB>>(icc4b);

    // The Group and supplied commands ExtraArgs type does not match

        declare const icc4c: IsCommandCompatibleWithGroup<ExtraArgsCommand, TypeA, never, true, [number, string]>
        expectType<GroupExtraArgsMismatchError<[number, string], [string, Function]>>(icc4c);

        type TestCommand3 = Command<TypeA, TypeA, [string, Function, TypeB, number]>
        declare const icc4d: IsCommandCompatibleWithGroup<TestCommand3, TypeA, never, true, [string, Function]>
        expectType<GroupExtraArgsMismatchError<[string, Function], [string, Function, TypeB, number]>>(icc4d);



// Should be compatible if

    // The group and supplied commands IOType are an exact match

        // And the AdditionalOutputTypes are an exact match

            declare const icc5: IsCommandCompatibleWithGroup<TypeACommand, TypeA, never>
            expectType<TypeACommand>(icc5);

            declare const icc6: IsCommandCompatibleWithGroup<TypeAInABOutCommand, TypeA, TypeB, true>
            expectType<TypeAInABOutCommand>(icc6);

            declare const icc8: IsCommandCompatibleWithGroup<TypeABInABOutCommand, TypeA | TypeB, never>
            expectType<TypeABInABOutCommand>(icc8);

            declare const icc9: IsCommandCompatibleWithGroup<TypeABInAOutCommand, TypeA, never>
            expectType<TypeABInAOutCommand>(icc9);

            type TestCommand = Command<TypeA | TypeB, TypeA | string>
            declare const icc11: IsCommandCompatibleWithGroup<TestCommand, TypeA, string, true>
            expectType<TestCommand>(icc11);

        // And the group AdditionalOutputType has a type and the supplied commands AdditionalOutputType is never

            declare const icc7: IsCommandCompatibleWithGroup<TypeACommand, TypeA, TypeB, true>
            expectType<TypeACommand>(icc7);

            declare const icc10: IsCommandCompatibleWithGroup<TypeABInAOutCommand, TypeA, TypeB, true>
            expectType<TypeABInAOutCommand>(icc10);

    // The supplied commands IOType with the group AdditionalOutputType excluded is an exact match with group IOType

        declare const icc10a: IsCommandCompatibleWithGroup<TypeABInABOutCommand, TypeA, TypeB, true>
        expectType<TypeABInABOutCommand>(icc10a);

    // The supplied commands InputType is an exact match with the group IOType

        // And the AdditionalOutputType types are an exact match

            declare const icc10b: IsCommandCompatibleWithGroup<TypeABInAOutCommand, TypeA | TypeB, never>
            expectType<TypeABInAOutCommand>(icc10b);

            type TestCommand2 = Command<TypeA | TypeB, TypeA | string>
            declare const icc10d: IsCommandCompatibleWithGroup<TestCommand2, TypeA | TypeB, string, true>
            expectType<TestCommand2>(icc10d);

        // And the AdditionalOutputType of the group has a type but the supplied commands AdditionalOutputType is never

            declare const icc10c: IsCommandCompatibleWithGroup<TypeABInAOutCommand, TypeA | TypeB, TypeB, true>
            expectType<TypeABInAOutCommand>(icc10c);

    // The Group and supplied commands ExtraArgs

        // Are an exact match

            // And its AdditionalOutputType is never
            declare const icc12: IsCommandCompatibleWithGroup<ExtraArgsCommand, TypeA, never, false, [string, Function]>
            expectType<ExtraArgsCommand>(icc12);

            // And its AdditionalOutputType matches
            declare const icc13: IsCommandCompatibleWithGroup<ExtraArgsCommandWithBypassType, TypeA, TypeB, true, [string, Function]>
            expectType<ExtraArgsCommandWithBypassType>(icc13);

        // Are a partial match

            // And its AdditionalOutputType is never
            declare const icc14: IsCommandCompatibleWithGroup<ExtraArgsCommand, TypeA, never, false, [string, Function, number, boolean]>
            expectType<ExtraArgsCommand>(icc14);

            // And its AdditionalOutputType matches
            declare const icc15: IsCommandCompatibleWithGroup<ExtraArgsCommandWithBypassType, TypeA, TypeB, true, [string, Function, number, boolean]>
            expectType<ExtraArgsCommandWithBypassType>(icc15);







// CommandGroup

const group1 = new CommandGroup();
expectType<CommandGroup<CommandTypeTemplate, false, unknown, never, readonly unknown[]>>(group1);
expectError(group1.addCommand(new TypeACommand())); // NoCommandTypeParamError

const group2 = new CommandGroup<TypeACommand>()
expectType<CommandGroup<TypeACommand, false, TypeA, never, []>>(group2);
expectType(group2.addCommand(new TypeACommand()));
expectError(group2.addCommand(new TypeBCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group2.addCommand(new TypeAInBOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group2.addCommand(new TypeAInABOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group2.addCommand(new TypeABInABOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectType(group2.addCommand(new TypeABInAOutCommand()));

expectType(group2.addCommands([new TypeACommand()]));
expectError(group2.addCommands([new TypeBCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group2.addCommands([new TypeAInBOutCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group2.addCommands([new TypeAInABOutCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group2.addCommands([new TypeABInABOutCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectType(group2.addCommands([new TypeABInAOutCommand()]));

expectType(group2.addCommands([new TypeACommand(), new TypeABInAOutCommand()]));

const group3 = new CommandGroup<TypeBCommand>()
expectType<CommandGroup<TypeBCommand, false, TypeB, never, []>>(group3);
expectError(group3.addCommand(new TypeACommand())); // GroupAndSuppliedCommandIOMismatchError
expectType(group3.addCommand(new TypeBCommand()));
expectError(group3.addCommand(new TypeAInBOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group3.addCommand(new TypeAInABOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group3.addCommand(new TypeABInABOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group3.addCommand(new TypeABInAOutCommand())); // GroupAndSuppliedCommandIOMismatchError

expectError(group3.addCommands([new TypeACommand()])); // GroupAndSuppliedCommandIOMismatchError
expectType(group3.addCommands([new TypeBCommand()]));
expectError(group3.addCommands([new TypeAInBOutCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group3.addCommands([new TypeAInABOutCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group3.addCommands([new TypeABInABOutCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group3.addCommands([new TypeABInAOutCommand()])); // GroupAndSuppliedCommandIOMismatchError

expectType(group3.addCommands([new TypeBCommand()]));

const group4 = new CommandGroup<TypeAInBOutCommand>()
expectType<CommandGroup<TypeAInBOutCommand, false, never, TypeB, []>>(group4);
expectError(group4.addCommand(new TypeACommand())); // GroupIOMismatchError
expectError(group4.addCommand(new TypeBCommand())); // GroupIOMismatchError
expectError(group4.addCommand(new TypeAInBOutCommand())); // GroupIOMismatchError
expectError(group4.addCommand(new TypeAInABOutCommand())); // GroupIOMismatchError
expectError(group4.addCommand(new TypeABInABOutCommand())); // GroupIOMismatchError
expectError(group4.addCommand(new TypeABInAOutCommand())); // GroupIOMismatchError

expectError(group4.addCommands([new TypeACommand()])); // GroupIOMismatchError
expectError(group4.addCommands([new TypeBCommand()])); // GroupIOMismatchError
expectError(group4.addCommands([new TypeAInBOutCommand()])); // GroupIOMismatchError
expectError(group4.addCommands([new TypeAInABOutCommand()])); // GroupIOMismatchError
expectError(group4.addCommands([new TypeABInABOutCommand()])); // GroupIOMismatchError
expectError(group4.addCommands([new TypeABInAOutCommand()])); // GroupIOMismatchError

const group5a = new CommandGroup<TypeAInABOutCommand>()
expectType<CommandGroup<TypeAInABOutCommand, false, TypeA, TypeB, []>>(group5a);
expectError(group5a.addCommand(new TypeACommand())); // GroupAdditionalOutputTypeError
expectError(group5a.addCommand(new TypeBCommand())); // GroupAdditionalOutputTypeError
expectError(group5a.addCommand(new TypeAInBOutCommand())); // GroupAdditionalOutputTypeError
expectError(group5a.addCommand(new TypeAInABOutCommand())); // GroupAdditionalOutputTypeError
expectError(group5a.addCommand(new TypeABInABOutCommand())); // GroupAdditionalOutputTypeError
expectError(group5a.addCommand(new TypeABInAOutCommand())); // GroupAdditionalOutputTypeError

expectError(group5a.addCommands([new TypeACommand()])); // GroupAdditionalOutputTypeError
expectError(group5a.addCommands([new TypeBCommand()])); // GroupAdditionalOutputTypeError
expectError(group5a.addCommands([new TypeAInBOutCommand()])); // GroupAdditionalOutputTypeError
expectError(group5a.addCommands([new TypeAInABOutCommand()])); // GroupAdditionalOutputTypeError
expectError(group5a.addCommands([new TypeABInABOutCommand()])); // GroupAdditionalOutputTypeError
expectError(group5a.addCommands([new TypeABInAOutCommand()])); // GroupAdditionalOutputTypeError

const group5 = new CommandGroup<TypeAInABOutCommand, true>()
expectType<CommandGroup<TypeAInABOutCommand, true, TypeA, TypeB, []>>(group5);
expectType(group5.addCommand(new TypeACommand()));
expectError(group5.addCommand(new TypeBCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group5.addCommand(new TypeAInBOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectType(group5.addCommand(new TypeAInABOutCommand()));
expectType(group5.addCommand(new TypeABInABOutCommand()));
expectType(group5.addCommand(new TypeABInAOutCommand()));

expectType(group5.addCommands([new TypeACommand()]));
expectError(group5.addCommands([new TypeBCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group5.addCommands([new TypeAInBOutCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectType(group5.addCommands([new TypeAInABOutCommand()]));
expectType(group5.addCommands([new TypeABInABOutCommand()]));
expectType(group5.addCommands([new TypeABInAOutCommand()]));

expectType(group5.addCommands([new TypeACommand(), new TypeAInABOutCommand(), new TypeABInABOutCommand(), new TypeABInAOutCommand()]));

const group6 = new CommandGroup<TypeABInABOutCommand>()
expectType<CommandGroup<TypeABInABOutCommand, false, TypeA | TypeB, never, []>>(group6);
expectError(group6.addCommand(new TypeACommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group6.addCommand(new TypeBCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group6.addCommand(new TypeAInBOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group6.addCommand(new TypeAInABOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectType(group6.addCommand(new TypeABInABOutCommand()));
expectType(group6.addCommand(new TypeABInAOutCommand()));

expectError(group6.addCommands([new TypeACommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group6.addCommands([new TypeBCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group6.addCommands([new TypeAInBOutCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectError(group6.addCommands([new TypeAInABOutCommand()])); // GroupAndSuppliedCommandIOMismatchError
expectType(group6.addCommands([new TypeABInABOutCommand()]));
expectType(group6.addCommands([new TypeABInAOutCommand()]));

expectType(group6.addCommands([new TypeABInABOutCommand(), new TypeABInAOutCommand()]));

const group7 = new CommandGroup<TypeABInAOutCommand>()
expectType<CommandGroup<TypeABInAOutCommand, false, TypeA, never, []>>(group7);
expectType(group7.addCommand(new TypeACommand()));
expectError(group7.addCommand(new TypeBCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group7.addCommand(new TypeAInBOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group7.addCommand(new TypeAInABOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectError(group7.addCommand(new TypeABInABOutCommand())); // GroupAndSuppliedCommandIOMismatchError
expectType(group7.addCommand(new TypeABInAOutCommand()));

expectType(group7.addCommands([new TypeACommand(), new TypeABInAOutCommand()]));

expectType<CommandGroup<TypeCCommand, true, string, number | Function, []>>(new CommandGroup<TypeCCommand, true>());
expectType<CommandGroup<TypeDCommand, false, string, never, []>>(new CommandGroup<TypeDCommand>());
expectType<CommandGroup<TypeECommand, false, string, never, []>>(new CommandGroup<TypeECommand>());
expectType<CommandGroup<MixedTypeObservableCommand, false, never, boolean | Function, []>>(new CommandGroup<MixedTypeObservableCommand>());
expectType<CommandGroup<MixedTypeObservableCommandV2, true, string | number, boolean | Function, []>>(new CommandGroup<MixedTypeObservableCommandV2, true>());
expectType<CommandGroup<MixedDuplicateTypeCommand, true, string, Function, []>>(new CommandGroup<MixedDuplicateTypeCommand, true>());
expectType<CommandGroup<AsyncTestCommand, false, TypeA, never, []>>(new CommandGroup<AsyncTestCommand>());
expectType<CommandGroup<ObservableInAndOutCommand, false, never, TypeA, []>>(new CommandGroup<ObservableInAndOutCommand>());
expectType<CommandGroup<TypeAInBOutCommand | TypeACommand | TypeABInABOutCommand, false, TypeA | TypeB, never, []>>(new CommandGroup<TypeACommand | TypeAInBOutCommand | TypeABInABOutCommand>());
expectType<CommandGroup<TypeACommand & TypeAInBOutCommand & TypeABInABOutCommand, false, TypeA | TypeB, never, []>>(new CommandGroup<TypeACommand & TypeAInBOutCommand & TypeABInABOutCommand>());
expectType<CommandGroup<ExtraArgsCommand, false, TypeA, never, [string, Function]>>(new CommandGroup<ExtraArgsCommand>());
expectType<CommandGroup<ExtraArgsCommandWithBypassType, true, TypeA, TypeB, [string, Function]>>(new CommandGroup<ExtraArgsCommandWithBypassType, true>());
