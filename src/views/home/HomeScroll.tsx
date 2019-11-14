import React, { useState, useEffect } from 'react';

import './homeScroll.scss'
import ReactSVG from "react-svg";
import IntroSection from "./components/IntroSection";

const getViewHeight = (): number => {
  return window.innerHeight;
};

const HomeScroll: React.FC = () => {
  const [lockSection, setLockSection] = useState(null);
  const [currentSection, setCurrentSection] = useState(0)

  const sectionCompleted = (hash: string) => {
    console.log('Completed', hash)
  }

  return (
    <div className="one-page-scroll">
      <IntroSection
        viewHeight={getViewHeight()}
        show={currentSection === 0}
        top={currentSection > 0}
        completed={sectionCompleted}
        hash="intro"
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
        <ReactSVG src="/assets/icons/arrow.svg" className="scroll-down__arrow" />
      </div>
    </div>
  );
}

export default HomeScroll;
