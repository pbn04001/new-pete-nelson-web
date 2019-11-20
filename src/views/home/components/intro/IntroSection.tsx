import React, {useEffect, useRef, useState, MutableRefObject} from 'react';
import anime from 'animejs';

import {
  AnimationComponent,
  delayActionCheckVisible,
  delayAnimationCheckVisible,
  hideSectionAfterAnimation
} from "utils/animation";
import {getClientHeight, getClientWidth, getViewHeight} from "utils/sizes";

import PeteNelson from 'assets/components/PeteNelson'
import Cloud1 from 'assets/components/Cloud1'
import Cloud2 from 'assets/components/Cloud2'
import Moon from 'assets/components/Moon'
import MoonBack from 'assets/components/MoonBack'
import SkyLine1 from 'assets/components/SkyLine1'
import SkyLine2 from 'assets/components/SkyLine2'
import SkyLine3 from 'assets/components/SkyLine3'

import './introSection.scss'
import {translateX, translateY} from "../../../../utils/style";

const createAnimationComponent = (props: IntroSectionProps, refs: IntroSectionRefs): AnimationComponent => {
  return {
    visible: refs.visible,
    section: refs.section,
  }
}

const skyLine1OffScreen = (skyLine1: SVGSVGElement | null): number => {
  return getClientHeight(skyLine1) + 50;
};

const skyLine2OffScreen = (skyLine2: SVGSVGElement | null): number => {
  return getClientHeight(skyLine2) + 50;
};

const skyLine3OffScreen = (skyLine3: SVGSVGElement | null): number => {
  return getClientHeight(skyLine3) + 50;
};

const cloud1OffScreen = (cloud1: SVGSVGElement | null): number => {
  return -1 * ((getViewHeight() * 0.025) + getClientHeight(cloud1) + 50);
};

const cloud2OffScreen = (cloud2: SVGSVGElement | null): number => {
  return -1 * ((getViewHeight() * 0.19) + getClientHeight(cloud2) + 50);
};

const moonOffScreen = (moon: SVGSVGElement | null): number => {
  return -1 * ((getViewHeight() * 0.10) + getClientHeight(moon) + 50);
};

const skyLine1Movement = (offset: number): number => {
  return offset * (getViewHeight() / 15);
};

const skyLine2Movement = (offset: number): number => {
  return offset * (getViewHeight() / 13);
};

const skyLine3Movement = (offset: number): number => {
  return offset * (getViewHeight() / 11);
};

const cloud1Movement = (offset: number): number => {
  return -1 * offset * (getViewHeight() / 25);
};

const cloud2Movement = (offset: number): number => {
  return -1 * offset * (getViewHeight() / 10);
};

const introCardOffScreen = (introCard: HTMLDivElement | null): number => {
  return -1 * (128 + getClientWidth(introCard));
};

const resetFunc = (props: IntroSectionProps, refs: IntroSectionRefs) => {
  const isVisible = refs.visible.current && !refs.firstLoad
  translateX(refs.introCard, isVisible, introCardOffScreen(refs.introCard))
  translateY(refs.skyLine1, isVisible, skyLine1OffScreen(refs.skyLine2))
  translateY(refs.skyLine2, isVisible, skyLine2OffScreen(refs.skyLine2))
  translateY(refs.skyLine3, isVisible, skyLine3OffScreen(refs.skyLine3))
  translateY(refs.moon, isVisible, moonOffScreen(refs.moon))
  translateY(refs.cloud1, isVisible, cloud1OffScreen(refs.cloud1))
  translateY(refs.cloud2, isVisible, cloud2OffScreen(refs.cloud2))
  if (refs.section) refs.section.style.display = isVisible ? 'block' : 'none';
}

const hideAnimated = (props: IntroSectionProps, refs: IntroSectionRefs) => {
  refs.visible.current = false
  if (refs.moonBack) {
    refs.moonBack.classList.remove('intro__moon_back--show')
    refs.moonBack.classList.add('intro__moon_back--hide')
  }

  anime({
    targets: refs.introCard,
    translateX: introCardOffScreen(refs.introCard),
    easing: 'easeOutSine',
    duration: 400,
  });

  delayAnimationCheckVisible({
    targets: refs.moon,
    translateY: moonOffScreen(refs.moon),
    easing: 'easeInOutSine',
    duration: 400,
  }, 300, createAnimationComponent(props, refs), false);

  anime({
    targets: refs.cloud1,
    translateY: cloud1OffScreen(refs.cloud1),
    opacity: 0,
    easing: 'easeOutSine',
    duration: 1000,
  });
  anime({
    targets: refs.cloud2,
    translateY: cloud2OffScreen(refs.cloud2),
    opacity: 0,
    easing: 'easeOutSine',
    duration: 1000,
  });
  anime({
    targets: refs.skyLine1,
    translateY: skyLine1OffScreen(refs.skyLine1),
    easing: 'easeInOutSine',
    duration: 400,
  });

  delayAnimationCheckVisible({
    targets: refs.skyLine2,
    translateY: skyLine2OffScreen(refs.skyLine2),
    easing: 'easeInOutSine',
    duration: 400,
  }, 75, createAnimationComponent(props, refs), false);

  delayAnimationCheckVisible({
    targets: refs.skyLine3,
    translateY: skyLine3OffScreen(refs.skyLine3),
    easing: 'easeInOutSine',
    duration: 400,
  }, 150, createAnimationComponent(props, refs), false);

  hideSectionAfterAnimation(1000, createAnimationComponent(props, refs));
}

const showAnimated = (offset: number, props: IntroSectionProps, refs: IntroSectionRefs) => {
  console.log('Show Animated')
  refs.visible.current = true
  if (refs.section) refs.section.style.display = 'block';

  if (refs.firstLoad) {
    refs.setFirstLoad(false)
    animatePeteNelson(props, refs);
    setTimeout(() => {
      showRemainingAnimated(offset, props, refs)
    }, 700);
  } else {
    if (refs.introCardSub) refs.introCardSub.classList.add('intro__card_sub--show');
    anime({
      targets: refs.introCard,
      translateX: 0,
      easing: 'easeOutSine',
      duration: 400,
    });
    showRemainingAnimated(offset, props, refs)
  }
};

const showRemainingAnimated = (offset: number, props: IntroSectionProps, refs: IntroSectionRefs) => {
  if (refs.moonBack) refs.moonBack.classList.remove('intro__moon_back--hide');
  delayActionCheckVisible(() => {
    if (refs.moonBack) refs.moonBack.classList.add('intro__moon_back--show');
  }, 300, createAnimationComponent(props, refs), true);

  anime({
    targets: refs.moon,
    translateY: 0,
    easing: 'easeOutSine',
    duration: 300,
  });
  anime({
    targets: refs.cloud1,
    translateY: cloud1Movement(offset),
    opacity: 0.6,
    easing: 'easeOutSine',
    duration: 1000,
  });
  anime({
    targets: refs.cloud2,
    translateY: cloud2Movement(offset),
    opacity: 0.6,
    easing: 'easeOutSine',
    duration: 1000,
  });
  anime({
    targets: refs.skyLine3,
    translateY: skyLine3Movement(offset),
    easing: 'easeOutBack',
    duration: 500,
  });
  anime({
    targets: refs.skyLine2,
    translateY: skyLine2Movement(offset),
    easing: 'easeOutBack',
    duration: 500,
    delay: 100,
  });
  anime({
    targets: refs.skyLine1,
    translateY: skyLine1Movement(offset),
    easing: 'easeOutBack',
    duration: 500,
    delay: 100,
  })
    .finished
    .then(() => {
      props.completed()
    });
};

const animatePeteNelson = (props: IntroSectionProps, refs: IntroSectionRefs) => {
  if (refs.introCard) refs.introCard.style.transform = 'translateX(0px)';
  anime({
    targets: document.getElementById('name-p'),
    loop: false,
    direction: 'normal',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 500,
  });
  anime({
    targets: document.getElementById('name-n1'),
    direction: 'normal',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    delay: 500,
    duration: 150,
  });
  anime({
    targets: document.getElementById('name-n2'),
    direction: 'normal',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    delay: 650,
    duration: 200,
  });
  anime({
    targets: document.getElementById('name-n3'),
    direction: 'normal',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    delay: 850,
    duration: 150,
  });
  anime({
    targets: document.getElementById('name-mask-rectangle'),
    width: ['0%', '100%'],
    easing: 'easeInOutSine',
    delay: 1000,
    duration: 500,
  });

  delayActionCheckVisible(() => {
    if (refs.introCardSub) refs.introCardSub.classList.add('intro__card_sub--show');
  }, 1000, createAnimationComponent(props, refs), true);
}

const adjustAnimated = (offset: number, props: IntroSectionProps, refs: IntroSectionRefs) => {
  if (props.showing || !refs.visible.current) return;

  translateY(refs.cloud1, false, cloud1Movement(offset))
  translateY(refs.cloud2, false, cloud2Movement(offset))
  translateY(refs.skyLine1, false, skyLine1Movement(offset))
  translateY(refs.skyLine2, false, skyLine2Movement(offset))
  translateY(refs.skyLine3, false, skyLine3Movement(offset))
}


type IntroSectionRefs = {
  peteNelson: SVGSVGElement | null
  cloud1: SVGSVGElement | null
  cloud2: SVGSVGElement | null
  moon: SVGSVGElement | null
  moonBack: SVGSVGElement | null
  skyLine1: SVGSVGElement | null
  skyLine2: SVGSVGElement | null
  skyLine3: SVGSVGElement | null
  introCardSub: HTMLDivElement | null
  introCard: HTMLDivElement | null
  section: HTMLDivElement | null
  visible: MutableRefObject<boolean>
  firstLoad: boolean,
  setFirstLoad: (value: boolean) => void
}

type IntroSectionProps = {
  show: boolean
  hide: boolean
  reset: boolean
  top: boolean
  adjust: number | null
  showing: boolean
  completed: () => void
}

const IntroSection: React.FC<IntroSectionProps> = (props: IntroSectionProps) => {
  const {
    show,
    hide,
    reset,
    top,
    adjust,
    completed,
  } = props;

  const peteNelson = useRef<SVGSVGElement>(null)
  const cloud1 = useRef<SVGSVGElement>(null)
  const cloud2 = useRef<SVGSVGElement>(null)
  const moon = useRef<SVGSVGElement>(null)
  const moonBack = useRef<SVGSVGElement>(null)
  const skyLine1 = useRef<SVGSVGElement>(null)
  const skyLine2 = useRef<SVGSVGElement>(null)
  const skyLine3 = useRef<SVGSVGElement>(null)
  const introCardSub = useRef<HTMLDivElement>(null)
  const introCard = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLDivElement>(null)
  const visible = useRef(show);
  const [firstLoad, setFirstLoad] = useState(true)

  const getRefs = ():IntroSectionRefs => ({
    peteNelson: peteNelson.current,
    cloud1: cloud1.current,
    cloud2: cloud2.current,
    moon: moon.current,
    moonBack: moonBack.current,
    skyLine1: skyLine1.current,
    skyLine2: skyLine2.current,
    skyLine3: skyLine3.current,
    introCardSub: introCardSub.current,
    introCard: introCard.current,
    section: section.current,
    visible,
    firstLoad,
    setFirstLoad,
  });

  useEffect(() => {
    resetFunc(props, getRefs())
  }, [])

  useEffect(() => {
    if (reset) {
      resetFunc(props, getRefs())
    }
  }, [reset])

  useEffect(() => {
    if (show) {
      if (!visible.current || firstLoad) {
        showAnimated(top ? 0 : 1, props, getRefs())
      } else {
        completed()
      }
    }
  }, [show])

  useEffect(() => {
    if (hide) {
      hideAnimated(props, getRefs())
    }
  }, [hide])

  useEffect(() => {
    if (adjust) {
      adjustAnimated(adjust, props, getRefs())
    }
  }, [adjust])

  return (
    <div ref={section} className="section intro">
      <div ref={introCard} className="intro__card">
        <h1><PeteNelson ref={peteNelson} className="intro__pete-nelson" /></h1>
        <div ref={introCardSub} className="intro__card_sub">
          <hr className="intro__card_bar"/>
          <h3 className="intro__card_text">Experienced Web Developer & Designer</h3>
        </div>
      </div>
      <Cloud1 ref={cloud1} className="intro__cloud intro__cloud--1"/>
      <Cloud2 ref={cloud2} className="intro__cloud intro__cloud--2"/>
      <Moon ref={moon} className="intro__moon" />
      <MoonBack ref={moonBack} className="intro__moon_back"/>
      <SkyLine1 ref={skyLine1} className="intro__sky_line intro__sky_line--1"/>
      <SkyLine2 ref={skyLine2} className="intro__sky_line intro__sky_line--2" />
      <SkyLine3 ref={skyLine3} className="intro__sky_line intro__sky_line--3"/>
    </div>
  );
}

export default IntroSection;
