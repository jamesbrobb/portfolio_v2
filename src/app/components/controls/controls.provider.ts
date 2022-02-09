import {InjectionToken} from "@angular/core";

export type ControlsOptionsMap = {
  [key: string]: unknown
}

export const ControlsOptionsMapService = new InjectionToken<ControlsOptionsMap>('ControlsOptionsMapService');
