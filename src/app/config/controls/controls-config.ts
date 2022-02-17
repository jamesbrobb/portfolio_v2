import {OptionalLiteralKeys, RequiredLiteralKeys, TypeGuard} from "@jbr/types";


export enum ControlTypes {
  header='header',
  divider='divider',
  input='input',
  select='select',
  json='json'
}

export type ControlTypeStrings = keyof typeof ControlTypes


export enum InputTypes {
  text='text',
  email='email',
  url='url',
  num='number',
  checkbox='checkbox',
  radio='radio'
}


export type ControlGroup = InputControl | SelectControl | JsonControl | ControlGroupHeader | ControlGroupDivider;
export type InteractiveControlGroup = Extract<ControlGroup, InteractiveControl>


export type LabeledControl = {
  label: string
}

export type InteractiveControl = {
  key: string,
  value?: unknown
}

export type InputControl = {
  controlType: ControlTypes.input,
  type: InputTypes,
  min?: number,
  max?: number
} & LabeledControl & InteractiveControl

export type SelectControl = {
  controlType: ControlTypes.select,
  options?: ControlGroupOption[],
  optionsId?: string,
} & LabeledControl & InteractiveControl

export type JsonControl = {
  controlType: ControlTypes.json,
} & LabeledControl & InteractiveControl;

export type ControlGroupHeader = {
  controlType: ControlTypes.header,
  label: string
}

export type ControlGroupDivider = {
  controlType: ControlTypes.divider
}


export type ControlGroupOption = {
  key: string,
  value: string,
  label?: string
}


export const isInputControl = controlTypeGuard<InputControl>(ControlTypes.input);
export const isSelectControl = controlTypeGuard<SelectControl>(ControlTypes.select);
export const isJsonControl = controlTypeGuard<JsonControl>(ControlTypes.json);
export const isHeaderControl = controlTypeGuard<ControlGroupHeader>(ControlTypes.header);
export const isDividerControl = controlTypeGuard<ControlGroupDivider>(ControlTypes.divider);

type requiredInteractiveControlProp = RequiredLiteralKeys<InteractiveControl>

export const isInteractiveControl: TypeGuard<ControlGroup, InteractiveControlGroup>
  = (control: ControlGroup): control is InteractiveControlGroup => {
    const prop: requiredInteractiveControlProp = 'key';
    return prop in control;
  }



function controlTypeGuard<C extends ControlGroup>(type: ControlTypeStrings): TypeGuard<ControlGroup, C> {
  return (control: ControlGroup): control is C => control.controlType === type
}
