

export type ControlGroupOption = {
  key: string,
  value: string,
  label?: string
}

export type ControlGroup = {
  controlType: 'input' | 'select' | 'code-mirror' | 'json-editor' | 'divider' | 'header',
  key: string,
  label: string,
  type?: 'text' | 'email' | 'url' | 'number' | 'checkbox' | 'radio',
  value?: string,
  options?: ControlGroupOption[],
  optionsId?: string,
  min?: number,
  max?: number
};
