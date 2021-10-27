import {animate, state, style, transition, trigger} from "@angular/animations";

export const storroAnimations = [
  trigger('onEnterLeft', [
    state('true', style({
      opacity: '1',
      transform: 'translateX(0)'
    })),
    transition(
      'void => *',
      [style({opacity: '0', transform: 'translateX(-50%)'}), animate('250ms {{delay}}ms ease-in-out')],
      {params: {delay: 0}}
    )
  ]),
  trigger('onEnterRight', [
    state('true', style({
      opacity: '1',
      transform: 'translateX(0)'
    })),
    transition(
      'void => *',
      [style({opacity: '0', transform: 'translateX(50%)'}), animate('250ms {{delay}}ms ease-in-out')],
      {params: {delay: 0}}
    )
  ])
]
