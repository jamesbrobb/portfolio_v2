import {CommandProcessor, CommandProcessorBypassCondition} from "./command-processor";
import {Command, ObservableCommand} from "../command/command";
import {
    AsyncTestCommand,
    BypassTriggerCommandType, ExtraArgsCommand, MixedTypeCommand,
    TypeA,
    TypeACommand, TypeAInABOutCommand,
    TypeB
} from "../command/command.mocks";

import Spy = jasmine.Spy;
import {CommandGroup} from "../group/command-group";
import createSpy = jasmine.createSpy;


describe('CommandProcessor', () => {

    let processor: CommandProcessor,
        commandGroup: CommandGroup<TypeACommand>,
        input: TypeA;

    beforeEach(() => {

        processor = new CommandProcessor();

        commandGroup = new CommandGroup<TypeACommand>();
        commandGroup.addCommand(new TypeACommand());
        commandGroup.addCommand(new TypeACommand());
        commandGroup.addCommand(new TypeACommand());
        commandGroup.addCommand(new TypeACommand());


        input = new TypeA();
    });

    describe('.execute()', () => {

        it('should sequentially process the supplied commands and return the updated input', (done: Function) => {

            processor.execute(commandGroup, input)
                .subscribe((output: TypeA) => {
                    expect(output.value).toEqual(40);
                    done();
                });
        });

        it('should sequentially process the supplied commands and handle async commands', (done: Function) => {

            commandGroup = new CommandGroup<TypeACommand>();
            commandGroup.addCommand(new TypeACommand());
            commandGroup.addCommand(new TypeACommand());
            commandGroup.addCommand(new AsyncTestCommand());
            commandGroup.addCommand(new TypeACommand());
            commandGroup.addCommand(new TypeACommand());

            processor.execute(commandGroup, input)
                .subscribe((output: TypeA) => {
                    expect(output.value).toEqual(1040);
                    done();
                });
        });

        it('should ignore any subsequent commands when supplied with a bypass condition that fails', (done: Function) => {

            const bypassCondition: CommandProcessorBypassCondition<TypeA, TypeB> = (inpt: TypeA|TypeB): inpt is TypeB => {
                return inpt instanceof TypeB;
            };

            const command = new TypeACommand(),
                spy: Spy = spyOn(command, 'execute').and.callThrough();

            const bypassGroup = new CommandGroup<TypeAInABOutCommand, true>();
            bypassGroup.addCommand(new TypeACommand());
            bypassGroup.addCommand(new TypeACommand());
            bypassGroup.addCommand(new TypeACommand());
            bypassGroup.addCommand(new TypeAInABOutCommand());
            bypassGroup.addCommand(command);

            processor.execute(bypassGroup, input, bypassCondition)
                .subscribe((output: TypeA | TypeB) => {
                    expect(output).toEqual(jasmine.any(TypeB));
                    expect(input.value).toBe(30);
                    expect(spy.calls.any()).toBe(false);
                    done();
                });
        });

        it('should forward extra parameters to every commands', (done: Function) => {

            const extraParamsGroup = new CommandGroup<ExtraArgsCommand>()
            extraParamsGroup.addCommand(new ExtraArgsCommand());
            extraParamsGroup.addCommand(new ExtraArgsCommand());
            extraParamsGroup.addCommand(new ExtraArgsCommand());
            extraParamsGroup.addCommand(new ExtraArgsCommand());

            const spy = createSpy('extraArgs');

            processor.execute(extraParamsGroup, new TypeA(), ['test', spy])
                .subscribe((output: TypeA) => {
                    expect(spy).toHaveBeenCalledTimes(4);
                    done();
                });

        })

    });
});
