import anime from 'animejs';

type AnimationComponent = {
  visible: Boolean,
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
      if (component.visible === visible) {
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
    if (!component.visible && component.section) {
      component.section.style.display = 'none';
    }
  }, delay);
}

export function delayActionCheckVisible(action: Function, delay: number, component: AnimationComponent, visible: boolean) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (component.visible === visible) {
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
