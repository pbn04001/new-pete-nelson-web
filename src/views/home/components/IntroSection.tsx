import React, { useState, useEffect, useRef } from 'react';
import ReactSVG from "react-svg";
import anime from 'animejs';

import {delayActionCheckVisible, delayAnimationCheckVisible, hideSectionAfterAnimation} from "../../../utils/animation";
import {getClientHeight, getClientWidth} from "../../../utils/sizes";

import './introSection.scss'

type IntroSectionProps = {
  viewHeight: number,
  show: boolean,
  top: boolean,
  hash: string,
  completed: Function,
  toggleShowing: Function,
}

const IntroSection: React.FC<IntroSectionProps> = ({
  viewHeight,
  show,
  top,
  completed,
  hash,
  toggleShowing,
}: IntroSectionProps) => {
  const peteNelson = useRef<ReactSVG & (HTMLDivElement | HTMLSpanElement)>(null)
  const cloud1 = useRef<ReactSVG & (HTMLDivElement | HTMLSpanElement)>(null)
  const cloud2 = useRef<ReactSVG & (HTMLDivElement | HTMLSpanElement)>(null)
  const moon = useRef<ReactSVG & (HTMLDivElement | HTMLSpanElement)>(null)
  const moonBack = useRef<ReactSVG & (HTMLDivElement | HTMLSpanElement)>(null)
  const skyLine1 = useRef<ReactSVG & (HTMLDivElement | HTMLSpanElement)>(null)
  const skyLine2 = useRef<ReactSVG & (HTMLDivElement | HTMLSpanElement)>(null)
  const skyLine3 = useRef<ReactSVG & (HTMLDivElement | HTMLSpanElement)>(null)
  const introCardSub = useRef<HTMLDivElement>(null)
  const introCard = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(show);
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    reset()
  },[])

  useEffect(() => {
    if (show && (!visible || firstLoad)) {
        showAnimated(top ? 0 : 1)
          .then(() => { completed(hash) });
    } else {
      completed(hash)
    }
  }, [show])

  const reset = () => {
    const isVisible = visible && !firstLoad
    if (introCard.current) introCard.current.style.transform = `translateX(${isVisible ? 0 : introCardOffScreen()}px)`;
    if (skyLine1.current?.container) skyLine1.current.container.style.transform = `translateY(${isVisible ? 0 : skyLine1OffScreen()}px)`;
    if (skyLine2.current?.container) skyLine2.current.container.style.transform = `translateY(${isVisible ? 0 : skyLine2OffScreen()}px)`;
    if (skyLine3.current?.container) skyLine3.current.container.style.transform = `translateY(${isVisible ? 0 : skyLine3OffScreen()}px)`;
    if (moon.current?.container) moon.current.container.style.transform = `translateY(${isVisible ? 0 : moonOffScreen()}px)`;
    if (cloud1.current?.container) cloud1.current.container.style.transform = `translateY(${isVisible ? 0 : cloud1OffScreen()}px)`;
    if (cloud2.current?.container) cloud2.current.container.style.transform = `translateY(${isVisible ? 0 : cloud2OffScreen()}px)`;
    if (section.current) section.current.style.display = isVisible ? 'block' : 'none';
  }

  const skyLine1OffScreen = (): number => {
    return getClientHeight(skyLine1?.current?.container) + 50;
  };

  const skyLine2OffScreen = (): number => {
    return getClientHeight(skyLine2?.current?.container) + 50;
  };

  const skyLine3OffScreen = (): number => {
    return getClientHeight(skyLine3?.current?.container) + 50;
  };

  const cloud1OffScreen = (): number => {
    return -1 * ((viewHeight * 0.025) + getClientHeight(cloud1?.current?.container) + 50);
  };

  const cloud2OffScreen = (): number => {
    return -1 * ((viewHeight * 0.19) + getClientHeight(cloud2?.current?.container) + 50);
  };

  const moonOffScreen = (): number => {
    return -1 * ((viewHeight * 0.10) + getClientHeight(moon?.current?.container) + 50);
  };

  const skyLine1Movement = (offset: number): number => {
    return offset * (viewHeight / 15);
  };

  const skyLine2Movement = (offset: number): number => {
    return offset * (viewHeight / 13);
  };

  const skyLine3Movement = (offset: number): number => {
    return offset * (viewHeight / 11);
  };

  const cloud1Movement = (offset: number): number => {
    return -1 * offset * (viewHeight / 25);
  };

  const cloud2Movement = (offset: number): number => {
    return -1 * offset * (viewHeight / 10);
  };

  const introCardOffScreen = (): number => {
    return -1 * (128 + getClientWidth(introCard?.current));
  };

  const hideAnimated = () => {
    setVisible(false)
    if (moonBack.current?.container) {
      moonBack.current.container.classList.remove('intro__moon_back--show')
      moonBack.current.container.classList.add('intro__moon_back--hide')
    }

    anime({
      targets: introCard.current,
      translateX: introCardOffScreen(),
      easing: 'easeOutSine',
      duration: 400,
    });

    delayAnimationCheckVisible({
      targets: moon.current?.container,
      translateY: moonOffScreen(),
      easing: 'easeInOutSine',
      duration: 400,
    }, 300, { visible, section: section.current }, false);

    anime({
      targets: cloud1.current?.container,
      translateY: cloud1OffScreen(),
      opacity: 0,
      easing: 'easeOutSine',
      duration: 1000,
    });
    anime({
      targets: cloud2.current?.container,
      translateY: cloud2OffScreen(),
      opacity: 0,
      easing: 'easeOutSine',
      duration: 1000,
    });
    anime({
      targets: skyLine1.current?.container,
      translateY: skyLine1OffScreen(),
      easing: 'easeInOutSine',
      duration: 400,
    });

    delayAnimationCheckVisible({
      targets: skyLine2.current?.container,
      translateY: skyLine2OffScreen(),
      easing: 'easeInOutSine',
      duration: 400,
    }, 75, { visible, section: section.current }, false);

    delayAnimationCheckVisible({
      targets: skyLine3.current?.container,
      translateY: skyLine3OffScreen(),
      easing: 'easeInOutSine',
      duration: 400,
    }, 150, { visible, section: section.current }, false);

    hideSectionAfterAnimation(1000, { visible, section: section.current });
  }

  const showAnimated = (offset: number) => {
    setVisible(true)
    toggleShowing(true)
    if (section.current) section.current.style.display = 'block';

    return new Promise((resolve) => {
      if (firstLoad) {
        setFirstLoad(false)
        animatePeteNelson();
        setTimeout(() => {
          showRemainingAnimated(offset)
            .then(resolve);
        }, 700);
      } else {
        if (introCardSub.current) introCardSub.current.classList.add('intro__card_sub--show');
        anime({
          targets: introCard.current,
          translateX: 0,
          easing: 'easeOutSine',
          duration: 400,
        });
        showRemainingAnimated(offset)
          .then(resolve);
      }
    });
  };

  const showRemainingAnimated = (offset: number) => {
    return new Promise((resolve) => {
      if (moonBack.current?.container) moonBack.current.container.classList.remove('intro__moon_back--hide');
      delayActionCheckVisible(() => {
        if (moonBack.current?.container) moonBack.current.container.classList.add('intro__moon_back--show');
      }, 300, { visible, section: section.current }, true);

      anime({
        targets: moon.current?.container,
        translateY: 0,
        easing: 'easeOutSine',
        duration: 300,
      });
      anime({
        targets: cloud1.current?.container,
        translateY: cloud1Movement(offset),
        opacity: 0.6,
        easing: 'easeOutSine',
        duration: 1000,
      });
      anime({
        targets: cloud2.current?.container,
        translateY: cloud2Movement(offset),
        opacity: 0.6,
        easing: 'easeOutSine',
        duration: 1000,
      });
      anime({
        targets: skyLine3.current?.container,
        translateY: skyLine3Movement(offset),
        easing: 'easeOutBack',
        duration: 500,
      });
      anime({
        targets: skyLine2.current?.container,
        translateY: skyLine2Movement(offset),
        easing: 'easeOutBack',
        duration: 500,
        delay: 100,
      });
      anime({
        targets: skyLine1.current?.container,
        translateY: skyLine1Movement(offset),
        easing: 'easeOutBack',
        duration: 500,
        delay: 100,
      })
        .finished
        .then(() => {
          toggleShowing(false)
          resolve();
        });
    });
  };

  const animatePeteNelson = () => {
    if (introCard.current) introCard.current.style.transform = 'translateX(0px)';
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
      if (introCardSub.current) introCardSub.current.classList.add('intro__card_sub--show');
    }, 1000, { visible, section: section.current}, true);
  }

  return (
    <div ref={section} className="section intro">
      <div ref={introCard} className="intro__card">
        {<h1><ReactSVG src="/assets/images/pete_nelson.svg" ref={peteNelson} className="intro__pete-nelson" /></h1>}
        <div ref={introCardSub} className="intro__card_sub">
          <hr className="intro__card_bar"/>
          <h3 className="intro__card_text">Experienced Web Developer & Designer</h3>
        </div>
      </div>
      <ReactSVG src="/assets/images/cloud_1.svg" ref={cloud1} className="intro__cloud intro__cloud--1"/>
      <ReactSVG src="/assets/images/cloud_2.svg" ref={cloud2} className="intro__cloud intro__cloud--2"/>
      <ReactSVG src="/assets/images/moon.svg" ref={moon} className="intro__moon"/>
      <ReactSVG src="/assets/images/moon_back.svg" ref={moonBack} className="intro__moon_back"/>
      <ReactSVG src="/assets/images/skyline_1.svg" ref={skyLine1} className="intro__sky_line intro__sky_line--1"/>
      <ReactSVG src="/assets/images/skyline_2.svg" ref={skyLine2} className="intro__sky_line intro__sky_line--2"/>
      <ReactSVG src="/assets/images/skyline_3.svg" ref={skyLine3} className="intro__sky_line intro__sky_line--3"/>
    </div>
  );
}

export default IntroSection;
