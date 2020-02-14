import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import anime from 'animejs';

import {
  AnimationComponent,
  delayActionCheckVisible,
  delayAnimationCheckVisible,
  hideSectionAfterAnimation
} from "utils/animation";
import {getClientHeight, getClientWidth, getViewHeight} from "utils/sizes";

import MountainClouds from 'assets/components/MountainClouds'
import Mountains1 from 'assets/components/Mountains1'
import Mountains2 from 'assets/components/Mountains2'

import './mountainSection.scss'
import {translateY} from "../../../../utils/style";

const createAnimationComponent = (props: MountainSectionProps, refs: MountainSectionRefs): AnimationComponent => {
  return {
    visible: refs.visible,
    section: refs.section,
  }
}

const cardMovement = (offset: number, card: HTMLDivElement | null) => {
  return -1 * (offset * (getClientHeight(card) - getViewHeight()));
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

const mountains1Movement = (offset: number) => {
  return offset * (getViewHeight() / 30);
}

const mountains2Movement = (offset: number) => {
  return offset * (getViewHeight() / 20);
}

const resetFunc = (props: MountainSectionProps, refs: MountainSectionRefs) => {
  const isVisible = refs.visible.current && !refs.firstLoad;
  if (refs.card) refs.card.style.opacity = isVisible ? '1' : '0';
  translateY(refs.card, isVisible, cardOffScreen(refs.card));
  translateY(refs.mountains1, isVisible, mountains1Offscreen(refs.mountains1));
  translateY(refs.mountains2, isVisible, mountains2Offscreen(refs.mountains2));
  translateY(refs.clouds, isVisible, cloudsOffscreen(refs.clouds));
  if (refs.section) refs.section.style.display = isVisible ? 'block' : 'none';
}

const hideAnimated = (props: MountainSectionProps, refs: MountainSectionRefs) => {
  refs.visible.current = false

  anime({
    targets: refs.card,
    translateY: cardOffScreen(refs.card),
    opacity: 0,
    easing: 'easeOutSine',
    duration: 700,
  });

  anime({
    targets: refs.clouds,
    translateY: cloudsOffscreen(refs.clouds),
    easing: 'easeInOutSine',
    duration: 700,
    opacity: 0,
  });

  anime({
    targets: refs.mountains2,
    translateY: mountains2Offscreen(refs.mountains2),
    easing: 'easeInOutSine',
    duration: 500,
  });

  anime({
    targets: refs.mountains1,
    translateY: mountains1Offscreen(refs.mountains1),
    easing: 'easeInOutSine',
    duration: 300,
  });

  hideSectionAfterAnimation(700, createAnimationComponent(props, refs));
}

const showAnimated = (offset: number, props: MountainSectionProps, refs: MountainSectionRefs) => {
  refs.visible.current = true
  refs.setFirstLoad(false)
  if (refs.section) refs.section.style.display = 'block';

  anime({
    targets: refs.card,
    translateY: cardMovement(offset, refs.card),
    easing: 'easeOutSine',
    duration: 800,
  });
  delayAnimationCheckVisible({
    targets: refs.card,
    opacity: 1,
    easing: 'easeOutSine',
    duration: 500,
  }, 300, createAnimationComponent(props, refs), true);

  anime({
    targets: refs.clouds,
    translateY: 0,
    easing: 'easeOutSine',
    opacity: 1,
    duration: 700,
  });

  delayAnimationCheckVisible({
    targets: refs.mountains2,
    translateY: mountains2Movement(offset),
    easing: 'easeOutSine',
    duration: 500,
  }, 200, createAnimationComponent(props, refs), true);

  delayAnimationCheckVisible({
    targets: refs.mountains1,
    translateY: mountains1Movement(offset),
    easing: 'easeOutSine',
    duration: 300,
  }, 200, createAnimationComponent(props, refs), true)
    .then(() => {
      props.completed()
    });
};

const adjustAnimated = (offset:number, props: MountainSectionProps, refs: MountainSectionRefs) => {
  if (props.showing || !refs.visible.current) return;

  translateY(refs.card, false, cardMovement(offset, refs.card))
  translateY(refs.mountains2, false, mountains2Movement(offset))
  translateY(refs.mountains1, false, mountains1Movement(offset))
}


type MountainSectionRefs = {
  clouds: SVGSVGElement | null
  mountains1: SVGSVGElement | null
  mountains2: SVGSVGElement | null
  cardSub: HTMLDivElement | null
  card: HTMLDivElement | null
  section: HTMLDivElement | null
  visible: MutableRefObject<boolean>
  firstLoad: boolean,
  setFirstLoad: (value: boolean) => void
}

type MountainSectionProps = {
  show: boolean
  hide: boolean
  reset: boolean
  adjust: number | null
  showing: boolean
  top: boolean
  completed: () => void
}

const MountainSection: React.FC<MountainSectionProps> = (props: MountainSectionProps) => {
  const {
    show,
    hide,
    reset,
    top,
    adjust,
    completed,
  } = props;

  const clouds = useRef<SVGSVGElement>(null)
  const mountains1 = useRef<SVGSVGElement>(null)
  const mountains2 = useRef<SVGSVGElement>(null)
  const cardSub = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLDivElement>(null)
  const visible = useRef(show);
  const [firstLoad, setFirstLoad] = useState(true)

  const getRefs = ():MountainSectionRefs => ({
    clouds: clouds.current,
    mountains1: mountains1.current,
    mountains2: mountains2.current,
    cardSub: cardSub.current,
    card: card.current,
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
