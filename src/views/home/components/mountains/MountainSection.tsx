import React, {useEffect, useRef, useState} from 'react';
import anime from 'animejs';

import {delayActionCheckVisible, delayAnimationCheckVisible, hideSectionAfterAnimation} from "utils/animation";
import {getClientHeight, getClientWidth} from "utils/sizes";

import MountainClouds from 'assets/components/MountainClouds'
import Mountains1 from 'assets/components/Mountains1'
import Mountains2 from 'assets/components/Mountains2'

import './mountainSection.scss'

const cardMovement = (offset: number, card: HTMLDivElement | null, viewHeight: number) => {
  return -1 * (offset * (getClientHeight(card) - viewHeight));
}

const mountains1Offscreen = (mountains1: SVGSVGElement | null) => {
  return getClientHeight(mountains1);
}

const mountains2Offscreen = (mountains2: SVGSVGElement | null) => {
  return getClientHeight(mountains2);
}

const cloudsOffscreen = (clouds: SVGSVGElement | null) => {
  return getClientHeight(clouds);
}

const cardOffScreen = (card: HTMLDivElement | null) => {
  return (getClientHeight(card) + 50);
}

const mountains1Movement = (offset: number, viewHeight: number) => {
  return offset * (viewHeight / 30);
}

const mountains2Movement = (offset: number, viewHeight: number) => {
  return offset * (viewHeight / 20);
}

type MountainSectionProps = {
  viewHeight: number
  show: boolean
  hide: boolean
  reset: boolean
  adjust: number | null
  showing: boolean
  top: boolean
  hash: string
  completed: (hash: string) => void
}

const MountainSection: React.FC<MountainSectionProps> = ({
   viewHeight,
   show,
   hide,
   reset,
   top,
   adjust,
   showing,
   completed,
   hash,
 }: MountainSectionProps) => {
  const clouds = useRef<SVGSVGElement | null>(null)
  const mountains1 = useRef<SVGSVGElement | null>(null)
  const mountains2 = useRef<SVGSVGElement | null>(null)
  const cardSub = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLDivElement>(null)

  const visible = useRef(show);
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    resetFunc()
  }, [])

  useEffect(() => {
    if (reset) {
      resetFunc()
    }
  }, [reset])

  useEffect(() => {
    if (show) {
      console.log('Show')
      if (!visible.current || firstLoad) {
        showAnimated(top ? 0 : 1)
      } else {
        completed(hash)
      }
    }
  }, [show])

  useEffect(() => {
    if (hide) {
      hideAnimated()
    }
  }, [hide])

  useEffect(() => {
    if (adjust) {
      adjustAnimated(adjust)
    }
  }, [adjust])

  const resetFunc = () => {
    const isVisible = visible.current && !firstLoad
    if (card.current) {
      card.current.style.opacity = isVisible ? '1' : '0';
      card.current.style.transform = `translateY(${isVisible ? 0 : cardOffScreen(card.current)}px)`;
    }
    if (mountains1.current) mountains1.current.style.transform = `translateY(${isVisible ? 0 : mountains1Offscreen(mountains1.current)}px)`;
    if (mountains2.current) mountains2.current.style.transform = `translateY(${isVisible ? 0 : mountains2Offscreen(mountains2.current)}px)`;
    if (clouds.current) clouds.current.style.transform = `translateY(${isVisible ? 0 : cloudsOffscreen(clouds.current)}px)`;
    if (section.current) section.current.style.display = isVisible ? 'block' : 'none';
  }

  const hideAnimated = () => {
    visible.current = false

    anime({
      targets: card.current,
      translateY: cardOffScreen(card.current),
      opacity: 0,
      easing: 'easeOutSine',
      duration: 700,
    });

    anime({
      targets: clouds.current,
      translateY: cloudsOffscreen(clouds.current),
      easing: 'easeInOutSine',
      duration: 700,
      opacity: 0,
    });

    anime({
      targets: mountains2.current,
      translateY: mountains2Offscreen(mountains2.current),
      easing: 'easeInOutSine',
      duration: 500,
    });

    anime({
      targets: mountains1.current,
      translateY: mountains1Offscreen(mountains1.current),
      easing: 'easeInOutSine',
      duration: 300,
    });

    hideSectionAfterAnimation(700, { visible, section: section.current });
  }

  const showAnimated = (offset: number) => {
    visible.current = true
    setFirstLoad(false)
    if (section.current) section.current.style.display = 'block';

    anime({
      targets: card.current,
      translateY: cardMovement(offset, card.current, viewHeight),
      easing: 'easeOutSine',
      duration: 800,
    });
    delayAnimationCheckVisible({
      targets: card.current,
      opacity: 1,
      easing: 'easeOutSine',
      duration: 500,
    }, 300, {visible, section: section.current}, true);

    anime({
      targets: clouds.current,
      translateY: 0,
      easing: 'easeOutSine',
      opacity: 1,
      duration: 700,
    });

    delayAnimationCheckVisible({
      targets: mountains2.current,
      translateY: mountains2Movement(offset, viewHeight),
      easing: 'easeOutSine',
      duration: 500,
    }, 200, {visible, section: section.current}, true);

    delayAnimationCheckVisible({
      targets: mountains1.current,
      translateY: mountains1Movement(offset, viewHeight),
      easing: 'easeOutSine',
      duration: 300,
    }, 200, {visible, section: section.current}, true)
      .then(() => {
        completed(hash)
      });
  };

  const adjustAnimated = (offset:number) => {
    if (showing || !visible.current) return;

    if (card.current) card.current.style.transform = `translateY(${cardMovement(offset, card.current, viewHeight)}px)`;
    if (mountains2.current) mountains2.current.style.transform = `translateY(${mountains2Movement(offset, viewHeight)}px)`;
    if (mountains1.current) mountains1.current.style.transform = `translateY(${mountains1Movement(offset, viewHeight)}px)`;
  }

  return (
    <div ref={section} className="section mountains">
      <div ref={card} className="mountains__card">
        <h1 className="mountains__title">Developer</h1>
        <div ref={cardSub} className="mountains__card_sub">
          Accomplished full stack web developer / designer with over 13 years of professional experience. Have worked on
          delivering full stack
          solutions from the initial design phase into full production implementation. Extensive experience using major
          UI frameworks React, Vue,
          and Angular. Written both rest and soap services in Node and Java. Setup and integrated with many types of
          databases including SQL Server,
          Postgres, and MySql. Able to create site designs, illustrations, and logos using Sketch, Illustrator and
          Photoshop. Written backend
          python scripts using Spark and Kafka for processing 20k network transactions a second. Experience working in
          AWS to setup services using
          S3, EC2, Lambda, etc. Education includes both a BA in Computer Science, and a Masters in Business
          Administration.

          <h4>Languages</h4>
          <span className="mountains__tech_list">
          Javascript, Java, Scala, Python, Swift
        </span>

          <h4>UI Frameworks</h4>
          <span className="mountains__tech_list">
          React/Redux, Angular, VUE, ExtJS
        </span>

          <h4>UI</h4>
          <span className="mountains__tech_list">
          CSS3, SASS, PostCSS, SVG, HTML5
        </span>

          <h4>Server</h4>
          <span className="mountains__tech_list">
          Node, Express, Spring, Rest, Soap, Kafka, Spark
        </span>

          <h4>Design</h4>
          <span className="mountains__tech_list">
          Illustrator, Sketch, Photoshop
        </span>

          <h4>Databases</h4>
          <span className="mountains__tech_list">
          MySQL, SQL Server, Postgress, Hadoop, OpenTSDB
        </span>

          <h4>Databases</h4>
          <span className="mountains__tech_list">
          Enzyme, Karma, Chai, Sinon, Nightwatch, Cucumber
        </span>
        </div>
      </div>
      <Mountains2 ref={mountains2} className="mountains__mountains mountains__mountains--2"/>
      <Mountains1 ref={mountains1} className="mountains__mountains mountains__mountains--1"/>
      <MountainClouds ref={clouds} className="mountains__clouds"/>
    </div>
  );
}

export default MountainSection;
