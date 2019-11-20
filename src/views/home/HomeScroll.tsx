import React, {Component, createRef} from 'react';
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

interface HomeState {
  currentSection: number
  lastSection: number
  hide: number | null
  reset: number | null
  adjust: number,
  hasLoadedAnimations: boolean
  swapping: number | null
}

interface  HomeProps {}

class HomeScroll extends Component<HomeProps,HomeState> {

  private pageScroll = createRef<HTMLDivElement>()

  constructor(props: HomeProps) {
    super(props);

    this.state = {
      currentSection: lockSection != null && lockSection >= 0 ? lockSection : 0,
      lastSection: 0,
      hide: null,
      reset: null,
      adjust: 0,
      hasLoadedAnimations: false,
      swapping: null
    };
  }

  componentDidMount(): void {
    const { currentSection } = this.state
    const isMobile = getIsMobile()
    if (!isMobile)  {
      this.stopInitialScroll();
    }
    window.addEventListener('resize', this.onResize);

    this.updateBackground(sectionSizes[currentSection].bodyClass, true);

    if (!isMobile) {
      this.loadAnimations();
    } else {
      //TODO show everything for mobile
      // this.sections.forEach((section, index) => {
      //   this.sections[index].showAssets();
      // });
    }
  }

  sectionCompleted = (hash: string) => {
    this.setState({
      swapping: null,
    })
  };

  stopInitialScroll = () => {
    // Preventing scrolling until first animating is complete
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  };

  onResize = () => {
    const { hasLoadedAnimations, currentSection } = this.state;
    const isMobile = getIsMobile();
    if (!isMobile) {
      if (!hasLoadedAnimations) {
        this.loadAnimations();
      } else {
        this.calculatePageSize();
        debounce(() => this.setReset(currentSection), 200);
      }
    } else if (!isMobile) { // Only run once when first viewing mobile
      if (this.pageScroll.current) this.pageScroll.current.style.height = 'auto';
      this.setReset()
    }
  }

  calculatePageSize = () => {
    if (this.pageScroll.current) this.pageScroll.current.style.height = `${(totalSectionsSize * getViewHeight()) + getViewHeight()}px`;
  }

  setHash = () => {
    const { currentSection } = this.state;
    //this.currentHomeSectionPropagation = true;
    window.location.hash = sectionSizes[currentSection].hash;
  }

  calculatePosition = ():{section:number, offset:number} => {
    const { currentSection } = this.state;
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
      section: section >= 0 ? section : currentSection,
      offset: (offset % 1),
    };
  }

  onScroll = () => {
    const { currentSection, swapping } = this.state;
    if (swapping != null) {
      window.scrollTo(0, swapping);
      return
    }
    if (!getIsMobile()) {
      const position = this.calculatePosition();
      if (lockSection === null &&
        currentSection !== position.section) {
          this.performAnimations(currentSection, position);
      }
      this.setState({
        adjust: position.offset,
      })
    }
  }

  updateBackground = (sectionClass:string, add:boolean) => {
    if (!this.pageScroll.current) return
    if (add) {
      this.pageScroll.current.classList.add(`one-page-scroll--${sectionClass}`);
    } else {
      this.pageScroll.current.classList.remove(`one-page-scroll--${sectionClass}`);
    }
  }

  performAnimations = (lastSection:number, position: {section:number, offset:number}) => {
    this.setState({
      lastSection,
      swapping: window.pageYOffset,
      hide: lastSection,
    })
    this.setHash();
    const timeout = lastSection === 0 ? 400 : 0;
    setTimeout(() => {
      this.updateBackground(sectionSizes[lastSection].bodyClass, false);
      this.updateBackground(sectionSizes[position.section].bodyClass, true);
    }, timeout);
    setTimeout(() => {
      this.setState({
        currentSection: position.section
      })
    }, 500);
  }

  loadAnimations = () => {
    this.setState({
      hasLoadedAnimations: true,
    })
    this.stopInitialScroll();
    this.calculatePageSize();
    this.setHash();
    document.body.style.overflow = 'visible';
    window.addEventListener('scroll', this.onScroll);
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

  setReset = (exclude: number = -1) => {
    this.setState({
      reset: exclude,
    });
    setTimeout(() => {
      this.setState({
        reset: null,
      })
    }, 1)
  };

  shouldShow = (section: number) => this.state.currentSection === section

  shouldHide = (section: number) => (this.state.hide !== null && this.state.hide === section) || false

  shouldReset = (section: number) => this.state.reset !== null && this.state.reset !== section

  getAdjustAmount = (section: number) => (this.state.currentSection === section && this.state.adjust) || null

  render() {
    const { lastSection,swapping } = this.state;
    return (
      <div className="one-page-scroll" ref={this.pageScroll}>
        <IntroSection
          viewHeight={getViewHeight()}
          show={this.shouldShow(0)}
          hide={this.shouldHide(0)}
          reset={this.shouldReset(0)}
          adjust={this.getAdjustAmount(0)}
          top={lastSection === 0}
          showing={swapping != null}
          completed={this.sectionCompleted}
          hash="intro"
        />
        <MountainSection
          viewHeight={getViewHeight()}
          show={this.shouldShow(1)}
          hide={this.shouldHide(1)}
          reset={this.shouldReset(1)}
          adjust={this.getAdjustAmount(1)}
          top={lastSection < 1}
          showing={swapping != null}
          hash="mountain"
          completed={this.sectionCompleted}
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
          <Svg name="arrow" className="scroll-down__arrow"/>
        </div>
      </div>
    );
  }
}

export default HomeScroll;
