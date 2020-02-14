import { MutableRefObject } from 'react';
import anime from 'animejs';

export type AnimationComponent = {
  visible: MutableRefObject<boolean>,
  section?: HTMLDivElement | null,
}

export function delayAnimationCheckVisible(
  animation: any,
  delay: number,
  component: AnimationComponent,
  visible: boolean)
{
  return new Promise((resolve) => {
    setTimeout(() => {
      if (component.visible.current === visible) {
        anime(animation)
          .finished
          .then(() => {
            resolve(true);
          });
      } else {
        resolve(false);
      }
    }, delay);
  });
}

export function hideSectionAfterAnimation(delay: number, component: AnimationComponent) {
  setTimeout(() => {
    if (!component.visible.current && component.section) {
      component.section.style.display = 'none';
    }
  }, delay);
}

export function delayActionCheckVisible(action: Function, delay: number, component: AnimationComponent, visible: boolean) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (component.visible.current === visible) {
        action();
        resolve(true);
      } else {
        resolve(false);
      }
    }, delay);
  });
}

export default {
  delayAnimationCheckVisible,
};
