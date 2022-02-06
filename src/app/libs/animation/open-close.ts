import { animate, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';


export const openClose: AnimationTriggerMetadata = trigger('openClose', [
    state('true', style({ height: '*', opacity: 1 })),
    state('false', style({ height: '0px', opacity: 0 })),
    transition('false <=> true', [ animate('.5s ease') ])
])
