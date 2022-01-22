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
        style({
          opacity: '0',
          transform: 'translateX(-50%)'
        }), animate('{{speed}}ms {{delay}}ms ease-in-out')
      ],
      {params: {delay: 0, speed: 250}}
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
        style({opacity: '0', transform: 'translateX(50%)'}), animate('{{speed}}ms {{delay}}ms ease-in-out')
      ],
      {params: {delay: 0, speed: 250}}
    )
  ]),
  trigger(
    'fade',
    [
      transition(
        ':enter',
        [
          style({opacity: 0}),
          animate('300ms ease-in-out',
            style({opacity: 1}))
        ]
      ),
      transition(
        ':leave',
        [
          style({opacity: 1}),
          animate('300ms ease-in-out',
            style({opacity: 0}))
        ]
      )
    ]
  )
]
