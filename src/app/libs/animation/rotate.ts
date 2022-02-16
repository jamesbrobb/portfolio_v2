import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from "@angular/animations";


export type rotationParams = {
  start?: number;
  end?: number;
  timing?: number
}


export function rotate(params?: rotationParams): AnimationTriggerMetadata {

  const start = isNaN(params?.start as number) ? 0 : params?.start,
    end = isNaN(params?.end as number) ? 90 : params?.end,
    timings = params?.timing || '.3s ease'

  return trigger('rotate', [
    state('true', style({ transform: `rotate(${end}deg)` })),
    state('false', style({ transform: `rotate(${start}deg)` })),
    transition('false <=> true', [animate(timings)])
  ])
}
