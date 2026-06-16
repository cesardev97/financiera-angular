import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    
    transition('PageForm => PageFormParent', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
        })
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0.7 })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('0ms ease-in-out', style({ opacity: 0.3 }))
        ], { optional: true }),
        query(':enter', [
          animate('0ms ease-in-out', style({ opacity: 1 }))
        ], { optional: true }),
      ]),
    ]),
    transition('PageFormParent <=> PageFormParent', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          // position: 'absolute',
          // top: 0,
          // left: 0,
          // width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0.7 })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('600ms ease-in-out', style({ opacity: 0.3 }))
        ], { optional: true }),
        query(':enter', [
          animate('600ms ease-in-out', style({ opacity: 1 }))
        ], { optional: true }),
      ]),
    ]),
    
  ],
  );