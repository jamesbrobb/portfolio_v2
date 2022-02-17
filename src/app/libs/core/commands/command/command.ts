import {Observable} from 'rxjs';
import {IfElse, StrictExtract, UnwrapObservables} from "@jbr/types";


export type CommandTypeTemplate = Command<unknown, unknown, ReadonlyArray<unknown>>;
export type GetCommandTypeParamsResult<I, O, ExtraArgs extends ReadonlyArray<unknown> = readonly unknown[]> = [I, O, ExtraArgs];
export type GetCommandTypeParamsResultTemplateType = GetCommandTypeParamsResult<unknown, unknown>


export type GetCommandTypeParams<T extends CommandTypeTemplate, UnwrapObs extends boolean = false> =
    T extends Command<infer I, infer O, infer ExtraArgs> ?
        IfElse<
            UnwrapObs,
            GetCommandTypeParamsResult<I, UnwrapObservables<O>, ExtraArgs>,
            GetCommandTypeParamsResult<I, O, ExtraArgs>
            > :
        never;


export type GetInputType<CommandType extends CommandTypeTemplate, UnwrapObs extends boolean = false> =
    _GetInputType<GetCommandTypeParams<CommandType, UnwrapObs>>;
type _GetInputType<T extends GetCommandTypeParamsResultTemplateType> = T[0];

export type GetOutputType<CommandType extends CommandTypeTemplate, UnwrapObs extends boolean = false> =
    _GetOutputType<GetCommandTypeParams<CommandType, UnwrapObs>>;
type _GetOutputType<T extends GetCommandTypeParamsResultTemplateType> = T[1];

export type GetIOType<CommandType extends CommandTypeTemplate, UnwrapObs extends boolean = false> =
    _GetIOType<GetCommandTypeParams<CommandType, UnwrapObs>>;
type _GetIOType<T extends GetCommandTypeParamsResultTemplateType> = StrictExtract<T[0], T[1]>

export type GetExtraArgsType<CommandType extends CommandTypeTemplate, UnwrapObs extends boolean = false> =
    _GetExtraArgsType<GetCommandTypeParams<CommandType, UnwrapObs>>
type _GetExtraArgsType<T extends GetCommandTypeParamsResultTemplateType> = T[2];





export interface Command<I, O = I, ExtraArgsType extends ReadonlyArray<unknown> = []> {
    execute(input: I, ...args: ExtraArgsType): O;
}

export interface ObservableCommand<I, O = I, ExtraArgsType extends ReadonlyArray<unknown> = []> extends Command<I, Observable<O>, ExtraArgsType> {}
