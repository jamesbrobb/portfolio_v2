import {AddParameterToTuple} from "@jbr/types";
import {Observable, of} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {Command, ObservableCommand} from "../command/command";
import {
    CommandGroupTypeTemplate,
    GetCommandGroupAdditionalOutputType,
    GetCommandGroupExtraArgsType,
    GetCommandGroupIOType
} from "../group/command-group";



type CommandsType<IO, BY, Xtra extends ReadonlyArray<unknown>> = (Command<IO, IO | BY, Xtra> | ObservableCommand<IO, IO | BY, Xtra>)

type GetExtraArgsArg<T extends ReadonlyArray<unknown>> = [extraArgs: T extends [] ? never : T]
type GetBypassConditionArg<T, U> = [bypassCondition : [U] extends [never] ? never : CommandProcessorBypassCondition<T, U>]

type GetAdditionalArgs<IOType, BypassType, ExtraArgsType extends ReadonlyArray<unknown>> =
    AddParameterToTuple<
        GetBypassConditionArg<IOType, BypassType>,
        AddParameterToTuple<
            GetExtraArgsArg<ExtraArgsType>
        >
    >


export type CommandProcessorBypassCondition<A, B> = (input: A | B) => input is B;


export class CommandProcessor {

    execute<
        GroupType extends CommandGroupTypeTemplate,
        IOType = GetCommandGroupIOType<GroupType>,
        BypassType = GetCommandGroupAdditionalOutputType<GroupType>,
        ExtraArgsType extends ReadonlyArray<unknown> = GetCommandGroupExtraArgsType<GroupType>
    >(
        commandGroup: GroupType,
        input: GetCommandGroupIOType<GroupType>,
        ...args: GetAdditionalArgs<IOType, GetCommandGroupAdditionalOutputType<GroupType>, GetCommandGroupExtraArgsType<GroupType>>

    ): Observable<IOType | BypassType> {

        const initialValue: Observable<IOType> = input instanceof Observable ? input : of(input),
            commands: ReadonlyArray<CommandsType<IOType, IOType | BypassType, ExtraArgsType>> = commandGroup.getCommands() as ReadonlyArray<CommandsType<IOType, IOType | BypassType, ExtraArgsType>>,
            extraArgs: ReadonlyArray<unknown> = (Array.isArray(args[0]) ? args[0] : []),
            bypassCondition: CommandProcessorBypassCondition<IOType, BypassType> | undefined = this._getBypassCondition<IOType, BypassType>(args);

        return commands.reduce(

            (observable: Observable<IOType | BypassType>, command: CommandsType<IOType, IOType | BypassType, ExtraArgsType>): Observable<IOType | BypassType> => {

                return observable.pipe(
                    mergeMap(
                        (inpt: IOType | BypassType) => {

                            if(bypassCondition?.(inpt)) {
                                return of(inpt);
                            }

                            const result = command.execute(inpt as IOType, ...extraArgs as ExtraArgsType);

                            return result instanceof Observable ? result : of(result);
                        })
                );
            },
            initialValue
        );
    }

    private _getBypassCondition<IOType, BypassType>(args: unknown[]): CommandProcessorBypassCondition<IOType, BypassType> | undefined {

        if(args.length === 1) {

            return Array.isArray(args[0]) ? undefined : args[0] as CommandProcessorBypassCondition<IOType, BypassType>;

        }else if(args.length === 2) {

            return args[1] as CommandProcessorBypassCondition<IOType, BypassType>;
        }

        return undefined;
    }
}
