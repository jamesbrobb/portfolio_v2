# Command group

A collection of commands that can safely execute sequentially.

## Command Compatibility within a group

The following types are calculated from the command type assigned to the group:

- a common IO type - this is determined by extracting the input type from the output type
- an additional output type - this is determined by excluding the IO type from the output type
- any additional argument types in its `execute` method - i.e `execute(input: string, arg1: number, arg2: Function): string // [arg1:number, arg2:Function]`

<br/>
When attempting to add a command to the group the corresponding types are inferred from the command to test its compatibility.
<br/><br/>

A command's common **IO type** is compatible if:

- it's an exact match to the group IO type
- once the group additional output type is excluded from the commands IO type, the result is an exact match to the group IO type
- it's a subtype of the group IO type when compared through a non-distributive conditional type, and its input type is an exact match to the group IO type

A command's **Additional output type** is compatible if:

- it's `never`
- it's an exact match with the group additional output type
- it's a subtype of the group's additional output type when compared through a non-distributive conditional type

A command's **Extra arguments** are compatible if:

- it has none
- they're an exact match with the group
- it has fewer than the group, but the types match sequentially

<br/>

## Usage

A command type must be specified for the first type parameter of the `CommandGroup` on creation. If not an error occurs when attempting to add commands to the group.
<br/><br/>

```ts
const badGroup = new CommandGroup();
badGroup.addCommand(new StringInStringOutCommand()); // Error - A type is required for the CommandGroup CommandType type variable

const goodGroup = new CommandGroup<Command<string>>();
goodGroup.addCommand(new StringInStringOutCommand()); // ok

```
<br/>
The supplied command type must have a common input and output type to ensure commands can be safely executed sequentially.
<br/><br/>

```ts
const badGroup = new CommandGroup<Command<string, number>>();
badGroup.addCommand(new StringInStringOutCommand()); // Error - The CommandGroup CommandType type variable has an Input and Output type mismatch

const goodGroup = new CommandGroup<StringInStringOutCommand>();
goodGroup.addCommand(new StringInStringOutCommand()); // ok - string

```
<br/>
If the supplied command has a common IO type but also an additional output type, it must be explicitly flagged that this is allowed 
<br/><br/>

```ts
const badGroup = new CommandGroup<Command<number, number|string>>();
badGroup.addCommand(new NumberInNumberOrStringOutCommand()); // Error - The CommandGroup CommandType has an additional output type, but the AllowNonMatchingOutputType type parameter was not explicitly set to true

const goodGroup = new CommandGroup<Command<number, number|string>, true>();
goodGroup.addCommand(new NumberInNumberOrStringOutCommand()); // ok - string | number

```
<br/>
Once a command type is set on a group any attempt to add a non-compatible command will result in one of the following errors:

- IO type of `CommandGroup` and supplied command do not match
- `CommandGroup` additional output type is `never` but the supplied commands additional output type has a type set
- `CommandGroup` and supplied commands additional output type do not match
- `CommandGroup` and supplied commands extra arguments do not match

<br/>

```ts

const group1 = new CommandGroup<Command<number>>();

group1.addCommand(new NumberInNumberOutCommand()); // OK
group1.addCommand(new StringInStringOutCommand()); // Error - IO type of CommandGroup and supplied commands do not match
group1.addCommand(new NumberInNumberOrStringOutCommand()) // Error - additional output type is `never` but the supplied commands additional output type has a type set
group1.addCommand(new CommandWithExtraArguments()) // Error - the supplied commands extra arguments do not match

const group2 = new CommandGroup<Command<number, number|string>>();

group2.addCommand(new NumberInNumberOrStringOutCommand()); // OK
group2.addCommand(new NumberInNumberOrBooleanOutCommand()); // Error - supplied commands additional output type do not match

const group3 = new CommandGroup<Command<number, number, [string, Function]>>();

group3.addCommand(new CommandWithExtraArguments()) // OK
group3.addCommand(new NumberInNumberOutCommand()) // OK - IO matches and has no extra args
```
