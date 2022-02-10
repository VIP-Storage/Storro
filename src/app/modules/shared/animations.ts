import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

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
  ),
  trigger(
    'fadeIn',
    [
      transition(
        ':enter',
        [
          style({opacity: 0}),
          animate('300ms ease-in-out',
            style({opacity: 1}))
        ]
      ),
    ]
  ),
  trigger('listAnimation', [
    transition('* => *', [

      query(':enter', style({opacity: 0, transform: 'translateY(-25px)'}), {optional: true}),

      query(':enter', stagger('20ms', [
        animate('300ms ease-in-out', keyframes([
          style({opacity: 1, transform: 'translateY(0)'}),
        ]))]), {optional: true})
    ])
  ]),
  trigger(
    'cardGridAnimation',
    [
      transition(
        ':enter',
        [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('{{speed}}ms {{delay}}ms ease-in-out',
            style({transform: 'translateY(0)', opacity: 1}))
        ],
        {params: {delay: 0, speed: 300}}
      ),
    ],
  ),
  trigger(
    'fromBottom',
    [
      transition(
        ':enter',
        [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('300ms  ease-in-out',
            style({transform: 'translateY(0)', opacity: 1}))
        ],
      ),
    ],
  ),
  trigger(
    'fromTop',
    [
      transition(
        ':enter',
        [
          style({transform: 'translateY(-100%)'}),
          animate('300ms  ease-in-out',
            style({transform: 'translateY(0)'}))
        ],
      ),
    ],
  ),
]
