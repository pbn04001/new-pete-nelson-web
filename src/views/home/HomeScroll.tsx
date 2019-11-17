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
  const [currentSection, setCurrentSection] = useState(lockSection || 0);
  const [hideSection, setHideSection] = useState<number | null>(null)
  const [reset, setReset] = useState<number | null>(null)
  const [adjust, setAdjust] = useState<number>(0)
  const [showing, setShowing] = useState(true);
  const [hasLoadedAnimations, setLoadedAnimations] = useState(false);
  const [swapping, setSwapping] = useState<number | null>(null)

  const pageScroll = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!getIsMobile()) {
      stopInitialScroll();
    }
    window.addEventListener('resize', onResize);

    updateBackground(sectionSizes[currentSection].bodyClass, true);

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
    setSwapping(null)
  }

  const stopInitialScroll = () => {
    // Preventing scrolling until first animating is complete
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  }

  const resetNoVisibleSections = () => {
    setReset(currentSection)
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
    window.location.hash = sectionSizes[currentSection].hash;
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
    setCurrentSection(section)
    return {
      section: section,
      offset: (offset % 1),
    };
  }

  const onScroll = () => {
    if (swapping) {
      window.scrollTo(0, swapping);
    }
    if (!getIsMobile()) {
      const lastSection = currentSection;
      const position = calculatePosition();
      performAnimations(lastSection, position);
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

  const performAnimations = (lastSection: number, position: {section:number, offset:number}) => {
    if (!lockSection && lastSection !== position.section) {
      setSwapping(window.pageYOffset)
      setHash();
      setHideSection(lastSection)
      const timeout = lastSection === 0 ? 400 : 0;
      setTimeout(() => {
        updateBackground(sectionSizes[lastSection].bodyClass, false);
        updateBackground(sectionSizes[position.section].bodyClass, true);
      }, timeout);
      setTimeout(() => {
        if (currentSection === position.section) {
          if (position.section > lastSection) {
            setCurrentSection(position.section)
          }
          // this.sections[position.section].show(position.section > lastSection)
          //   .then(() => { this.swapping = null; });
        }
      }, 300);
    }
    setAdjust(position.offset)
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
        show={currentSection === 0}
        hide={(hideSection && hideSection === 0) || false}
        reset={reset !== null && reset !== 1}
        top={currentSection > 0}
        adjust={currentSection === 0 && adjust || null}
        showing={showing}
        completed={sectionCompleted}
        setShowing={setShowing}
        hash="intro"
      />
      <MountainSection
        viewHeight={getViewHeight()}
        show={currentSection === 1}
        hide={(hideSection && hideSection === 1) || false}
        reset={reset !== null && reset !== 1}
        top={currentSection > 1}
        adjust={currentSection === 1 && adjust || null}
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
