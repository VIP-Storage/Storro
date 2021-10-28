import {animate, state, style, transition, trigger} from "@angular/animations";

export const storroAnimations = [
  trigger('onEnterLeft', [
    state('true', style({
      opacity: '1',
      transform: 'translateX(0)'
    })),
    transition(
      'void => *',
      [
        style({transform: 'translate{{direction}}(0/**/)'}),
        style({
          opacity: '0',
          transform: 'translate{{direction}}(-50%)'
        }), animate('{{speed}}ms {{delay}}ms ease-in-out')
      ],
      {params: {delay: 0, speed: 250, direction: 'X'}}
    )
  ]),
  trigger('onEnterRight', [
    state('true', style({
      opacity: '1',
      transform: 'translateX(0)'
    })),
    transition(
      'void => *',
      [
        style({transform: 'translate{{direction}}(-50%)'}),
        style({opacity: '0', transform: 'translate{{direction}}(50%)'}), animate('{{speed}}ms {{delay}}ms ease-in-out')
      ],
      {params: {delay: 0, speed: 250, direction: 'X'}}
    )
  ])
]
