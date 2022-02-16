import { animate, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';


export type openCloseParams = {
  timings?: string | number;
  opacity?: number
}

export function openClose(params?: openCloseParams): AnimationTriggerMetadata {

  const timings = params?.timings || '.4s ease',
    opacity = params?.opacity || 0;

  return trigger('openClose', [
    state('true', style({height: '*', opacity: 1})),
    state('false', style({height: '0px', opacity: opacity})),
    transition('false <=> true', [animate(timings)])
  ])
}
