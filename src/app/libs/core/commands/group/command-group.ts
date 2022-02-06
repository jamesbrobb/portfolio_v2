import {
    IfElse,
    EqualsNever,
    StrictExclude,
    Equals,
    TupleToUnion,
    TupleElementComparison, Not, Invalid,
} from "../../../../../types";

import {
    Command,
    CommandTypeTemplate,
    GetCommandTypeParams,
    GetCommandTypeParamsResultTemplateType,
    GetExtraArgsType,
    GetInputType,
    GetIOType
} from "../command/command";


export type GetAdditionalOutputType<CommandType extends CommandTypeTemplate> =
    _GetAdditionalOutputType<GetCommandTypeParams<CommandType, true>>;

type _GetAdditionalOutputType<T extends GetCommandTypeParamsResultTemplateType> =
    StrictExclude<T[1], T[0]>;

export type AreExtraArgsCompatible<T1 extends readonly unknown[], T2 extends readonly unknown[]> =
    0 extends (TupleToUnion<TupleElementComparison<T1, T2> & unknown[]>) ? false : true;


export type CalculateValidIOType<IOT, BYT, CMIOT, CMIT = undefined> =
    IfElse<
        Equals<CMIOT, never>,
        CMIOT,
        IfElse<
            Equals<IOT, CMIOT>,
            CMIOT,
            IfElse<
                Equals<IOT, StrictExclude<CMIOT, BYT>>,
                IOT,
                IfElse<
                    Equals<IOT, CMIT>,
                    IOT,
                    CMIOT
                >
            >
        >
    >

export type CalculateValidAdditionalOutputType<BT, CMDBT> =
    IfElse<
        Equals<BT, never>,
        CMDBT,
        IfElse<
            Equals<CMDBT, never>,
            BT,
            CMDBT
        >
    >

export type CalculateValidExtrasArgType<EXT extends ReadonlyArray<unknown>, CMDEXT extends ReadonlyArray<unknown>> =
    IfElse<
        Equals<EXT, CMDEXT>,
        CMDEXT,
        IfElse<
            AreExtraArgsCompatible<EXT, CMDEXT>,
            EXT,
            CMDEXT
        >
    >

export type HasNonMatchingOutputTypeWhenNotAllowed<AllowNonMatchingOutputType extends boolean, AdditionalOutputType> =
    IfElse<
        Not<AllowNonMatchingOutputType>,
        Not<EqualsNever<AdditionalOutputType>>,
        false
    >


export type NoCommandTypeParamError = Invalid<['A type is required for the CommandGroup CommandType type variable']>;
export type GroupIOMismatchError = Invalid<['The CommandType assigned to the CommandGroup must have a common I and O type']>;
export type GroupAdditionalOutputTypeError<AdditionalOutputType> = Invalid<['The CommandGroup CommandType has an additional output type', AdditionalOutputType, ', but AllowAdditionalOutputType type parameter was not explicitly set to true']>;


export type IsGroupValid<
    IOType,
    AdditionalOutputType,
    AllowNonMatchingOutputType extends boolean = false,
> =
    IfElse<
        Equals<[IOType, IOType], [unknown, unknown]>,
        NoCommandTypeParamError,
        IfElse<
            EqualsNever<IOType>,
            GroupIOMismatchError,
            IfElse<
                HasNonMatchingOutputTypeWhenNotAllowed<AllowNonMatchingOutputType, AdditionalOutputType>,
                GroupAdditionalOutputTypeError<AdditionalOutputType>,
                true
            >
        >
    >


export type GroupAndSuppliedCommandIOMismatchError<IOType, CMDIOType> = Invalid<['IOType of CommandGroup', IOType ,'and supplied command IOType', CMDIOType, 'do not match']>;
export type GroupAdditionalOutputTypeNeverError<CMDAOType> = Invalid<['CommandGroup AdditionalOutputType is never but the supplied command AdditionalOutputType is', CMDAOType]>;
export type GroupAndCommandAdditionalOutputTypeMismatchError<AOType, CMDAOType> = Invalid<['CommandGroup AdditionalOutputType', AOType ,'and supplied command AdditionalOutputType', CMDAOType, 'do not match']>
export type GroupExtraArgsMismatchError<ExtraArgs, CMDExtraArgs> = Invalid<['CommandGroup ExtraArgs', ExtraArgs, 'and supplied commands ExtraArgs', CMDExtraArgs, 'do not match']>;


export type IsCommandCompatible<
    CommandType extends CommandTypeTemplate,
    IOType,
    AOType,
    ExtraArgsType extends ReadonlyArray<unknown> = [],
    CMDIOType = GetIOType<CommandType, true>,
    CMDInputType = GetInputType<CommandType, true>,
    CMDAOType = GetAdditionalOutputType<CommandType>,
    CMDExtraArgsType extends ReadonlyArray<unknown> = GetExtraArgsType<CommandType>
> =
    IfElse<
        Equals<IOType, CalculateValidIOType<IOType, AOType, CMDIOType, CMDInputType>>,
        IfElse<
            Equals<AOType, CalculateValidAdditionalOutputType<AOType, CMDAOType>>,
            IfElse<
                Equals<ExtraArgsType, CalculateValidExtrasArgType<ExtraArgsType, CMDExtraArgsType>>,
                CommandType,
                GroupExtraArgsMismatchError<ExtraArgsType, CMDExtraArgsType>
            >,
            IfElse<
                EqualsNever<AOType>,
                GroupAdditionalOutputTypeNeverError<CMDAOType>,
                GroupAndCommandAdditionalOutputTypeMismatchError<AOType, CMDAOType>
            >
        >,
        GroupAndSuppliedCommandIOMismatchError<IOType, CMDIOType>
    >


export type CommandGroupTypeTemplate = CommandGroup<CommandTypeTemplate>;

export type GetCommandGroupTypeParamsResult<
    CommandType extends CommandTypeTemplate,
    AOOK extends boolean,
    IO,
    AO,
    ExtraArgs extends ReadonlyArray<unknown> = readonly unknown[]
> = [CommandType, AOOK, IO, AO, ExtraArgs];

export type GetCommandGroupTypeParamsResultTypeTemplate = GetCommandGroupTypeParamsResult<CommandTypeTemplate, false, unknown, unknown>

export type GetCommandGroupTypeParams<GroupType extends CommandGroupTypeTemplate> =
    GroupType extends CommandGroup<infer CT, infer AddOutTOK, infer IOT, infer AddOutT, infer ExtraArgsT> ?
        [CT, AddOutTOK, IOT, AddOutT, ExtraArgsT] :
        never;

export type GetCommandGroupIOType<GroupType extends CommandGroupTypeTemplate> =
    _GetCommandGroupIOType<GetCommandGroupTypeParams<GroupType>>
type _GetCommandGroupIOType<T extends GetCommandGroupTypeParamsResultTypeTemplate> = T[2];

export type GetCommandGroupAdditionalOutputType<GroupType extends CommandGroupTypeTemplate> =
    _GetCommandGroupAdditionalOutputType<GetCommandGroupTypeParams<GroupType>>
type _GetCommandGroupAdditionalOutputType<T extends GetCommandGroupTypeParamsResultTypeTemplate> = T[3];

export type GetCommandGroupExtraArgsType<GroupType extends CommandGroupTypeTemplate> =
    _GetCommandGroupExtraArgsType<GetCommandGroupTypeParams<GroupType>>
type _GetCommandGroupExtraArgsType<T extends GetCommandGroupTypeParamsResultTypeTemplate> = T[4];


export type IsCommandCompatibleWithGroup<
    CommandType extends CommandTypeTemplate,
    IOType,
    AOType,
    AllowAdditionalOutput extends boolean = false,
    ExtraArgsType extends ReadonlyArray<unknown> = readonly unknown[],
    GroupValid = IsGroupValid<IOType, AOType, AllowAdditionalOutput>
> =
    IfElse<
        Equals<true, GroupValid>,
        IsCommandCompatible<CommandType, IOType, AOType, ExtraArgsType>,
        GroupValid
    >;


// required due to @link https://github.com/microsoft/TypeScript/issues/21729
export type _AreMultipleCommandsCompatibleWithGroupInner<
    CommandType extends unknown,
    IOType,
    AOType,
    AllowAdditionalOutputType extends boolean,
    ExtraArgsType extends ReadonlyArray<unknown>
> =
    CommandType extends Command<unknown> ?
        IsCommandCompatibleWithGroup<CommandType, IOType, AOType, AllowAdditionalOutputType, ExtraArgsType> :
        never;

export type AreMultipleCommandsCompatibleWithGroup<
    T extends CommandTypeTemplate[],
    IOType,
    AOType,
    AllowAdditionalOutputType extends boolean = false,
    ExtraArgsType extends ReadonlyArray<unknown> = []
> =
    [...{ [K in keyof T]:
        _AreMultipleCommandsCompatibleWithGroupInner<
                T[K],
                IOType,
                AOType,
                AllowAdditionalOutputType,
                ExtraArgsType
            > & T[K]
        }
    ];



export class CommandGroup<
    CommandType extends CommandTypeTemplate,
    AllowNonMatchingOutputType extends boolean = false,
    IOType = GetIOType<CommandType, true>,
    AdditionalOutputType = GetAdditionalOutputType<CommandType>,
    ExtraArgsType extends ReadonlyArray<unknown> = GetExtraArgsType<CommandType>
> {

    private _commands: Command<IOType, IOType | AdditionalOutputType, ExtraArgsType>[] = [];

    addCommand<T extends CommandTypeTemplate>(
        command: IsCommandCompatibleWithGroup<T, IOType, AdditionalOutputType, AllowNonMatchingOutputType, ExtraArgsType> & T
    ): void {
        this._commands.push(command as Command<IOType, IOType | AdditionalOutputType, ExtraArgsType>);
    }

    addCommands<T extends CommandTypeTemplate[]>(
        commands: AreMultipleCommandsCompatibleWithGroup<T, IOType, AdditionalOutputType, AllowNonMatchingOutputType, ExtraArgsType>
    ): void {
        commands.forEach((command: CommandTypeTemplate) => {
            this._commands.push(command as Command<IOType, IOType | AdditionalOutputType, ExtraArgsType>);
        });
    }

    getCommands(): ReadonlyArray<Command<IOType, IOType | AdditionalOutputType, ExtraArgsType>> {
        return this._commands.concat();
    }
}
