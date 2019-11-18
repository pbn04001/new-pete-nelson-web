import React, {useState, useEffect, useRef} from 'react';
import debounce from 'debounce';

import { SCREEN_SIZE, getScreenSizeMax } from 'utils/sizes';

import './homeScroll.scss'
import IntroSection from "./components/intro/IntroSection";
import Svg from "../../components/svg/Svg";
import MountainSection from "./components/mountains/MountainSection";


const getViewHeight = (): number => {
  return window.innerHeight;
};

const getIsMobile = () => {
  return window.innerWidth < getScreenSizeMax(SCREEN_SIZE.SM);
}

const sectionSizes = [{
  position: 0,
  size: 1,
  bodyClass: 'intro',
  hash: 'intro'
}, {
  position: 1,
  size: 2,
  bodyClass: 'mountains',
  hash: 'mountains'
}]

const lockSection:number | null = null;

const totalSectionsSize = sectionSizes.reduce((acc, cur) => acc + cur.size, 0)

const HomeScroll: React.FC = () => {
  const [lockSection] = useState(null);
  const currentSection = useRef(lockSection || 0);
  const lastSection = useRef<number>(0)
  const [hideSection, setHideSection] = useState<number | null>(null)
  const [reset, setReset] = useState<number | null>(null)
  const [adjust, setAdjust] = useState<number>(0)
  const [showing, setShowing] = useState(true);
  const [hasLoadedAnimations, setLoadedAnimations] = useState(false);
  const swapping = useRef<number | null>(null)

  const pageScroll = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!getIsMobile()) {
      stopInitialScroll();
    }
    window.addEventListener('resize', onResize);

    updateBackground(sectionSizes[currentSection.current].bodyClass, true);

    if (!getIsMobile()) {
      loadAnimations();
    } else {
      //TODO show everything for mobile
      // this.sections.forEach((section, index) => {
      //   this.sections[index].showAssets();
      // });
    }
  }, [])

  const sectionCompleted = (hash: string) => {
    swapping.current = null
  }

  const stopInitialScroll = () => {
    // Preventing scrolling until first animating is complete
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  }

  const resetNoVisibleSections = () => {
    setReset(currentSection.current)
    setTimeout(() => {
      setReset(null)
    }, 1)
  }

  const onResize = () => {
    const isMobile = getIsMobile();
    if (!isMobile) {
      if (!hasLoadedAnimations) {
        loadAnimations();
      } else {
        calculatePageSize();
        debounce(resetNoVisibleSections, 200);
      }
    } else if (!getIsMobile()) { // Only run once when first viewing mobile
      if (pageScroll.current) pageScroll.current.style.height = 'auto';
      setReset(-1)
      setTimeout(() => {
        setReset(null)
      },1)
    }
  }

  const calculatePageSize = () => {
    if (pageScroll.current) pageScroll.current.style.height = `${(totalSectionsSize * getViewHeight()) + getViewHeight()}px`;
  }

  const setHash = () => {
    //this.currentHomeSectionPropagation = true;
    window.location.hash = sectionSizes[currentSection.current].hash;
  }

  const calculatePosition = ():{section:number, offset:number} => {
    let offset = window.pageYOffset / (getViewHeight() + 1);
    const section = sectionSizes.findIndex((section) => {
      const { size } = section;
      const newOffset = offset - size;
      if (newOffset <= 0) {
        offset /= size;
        return true;
      }
      offset -= size;
      return false;
    });
    return {
      section: section,
      offset: (offset % 1),
    };
  }

  const onScroll = () => {
    if (swapping.current) {
      window.scrollTo(0, swapping.current);
    }
    if (!getIsMobile()) {
      const position = calculatePosition();
      if (lockSection === null &&
        currentSection.current !== position.section &&
        position.section < sectionSizes.length &&
        position.section >= 0) {
          lastSection.current = currentSection.current;
          currentSection.current = position.section;
          performAnimations(position);
      }
      setAdjust(position.offset)
    }
  }

  const updateBackground = (sectionClass:string, add:boolean) => {
    if (!pageScroll.current) return
    if (add) {
      pageScroll.current.classList.add(`one-page-scroll--${sectionClass}`);
    } else {
      pageScroll.current.classList.remove(`one-page-scroll--${sectionClass}`);
    }
  }

  const performAnimations = (position: {section:number, offset:number}) => {
    setShowing(true)
    swapping.current = window.pageYOffset;
    setHash();
    setHideSection(lastSection.current)
    const timeout = lastSection.current === 0 ? 400 : 0;
    setTimeout(() => {
      updateBackground(sectionSizes[lastSection.current].bodyClass, false);
      updateBackground(sectionSizes[position.section].bodyClass, true);
    }, timeout);
    setTimeout(() => {
      if (currentSection.current === position.section) {
        if (position.section > lastSection.current) {
          currentSection.current = position.section
        }
      }
    }, 500);
  }

  const loadAnimations = () => {
    setLoadedAnimations(true)
    stopInitialScroll();
    calculatePageSize();
    setHash();
    document.body.style.overflow = 'visible';
    window.addEventListener('scroll', onScroll);
    // this.sections[this.currentSection].load()
    //   .then(() => {
    //     if (this.currentSection > 0) {
    //       this.scrollToNewSection(this.currentSection);
    //     }
    //     document.body.style.overflow = 'visible';
    //     window.addEventListener('scroll', this.onScroll);
    //     // TODO: Show scroll indicator to user
    //   });
  }

  return (
    <div className="one-page-scroll" ref={pageScroll}>
      <IntroSection
        viewHeight={getViewHeight()}
        show={currentSection.current === 0}
        hide={(hideSection !== null && hideSection === 0) || false}
        reset={reset !== null && reset !== 1}
        top={lastSection.current === 0}
        adjust={currentSection.current === 0 && adjust || null}
        showing={showing}
        completed={sectionCompleted}
        setShowing={setShowing}
        hash="intro"
      />
      <MountainSection
        viewHeight={getViewHeight()}
        show={currentSection.current === 1}
        hide={(hideSection !== null && hideSection === 1) || false}
        reset={reset !== null && reset !== 1}
        top={lastSection.current < 1}
        adjust={currentSection.current === 1 && adjust || null}
        showing={showing}
        hash="mountain"
        completed={sectionCompleted}
        setShowing={setShowing}
      />
      <div className="scroll-down">
        <span className="scroll-down__txt">
          <span>S</span>
          <span>c</span>
          <span>r</span>
          <span>o</span>
          <span>l</span>
          <span>l</span>
        </span>
        <Svg name="arrow" className="scroll-down__arrow" />
      </div>
    </div>
  );
}

export default HomeScroll;
