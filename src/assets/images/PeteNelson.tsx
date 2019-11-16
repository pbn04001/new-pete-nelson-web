import React from 'react';

interface SvgProps {
  className?: string
}

const Svg = React.forwardRef<SVGSVGElement, SvgProps>(({
 className
}, ref)=> {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 433.43 243.24" preserveAspectRatio="xMinYMin meet"
      className={className}
      ref={ref}
    >
      <clipPath id="name-mask">
        <rect id="name-mask-rectangle" x="0" y="0" width="100%" height="100%"/>
      </clipPath>
      <g id="name-remaining" clipPath="url(#name-mask)">
        <path className="cls-1"
              d="M260.05,279.94q-16.34,0-26.09-10.47t-9.77-26.58V240.1q0-16.82,9.24-27.69t24.8-10.82q15.28,0,23.72,9.21t8.45,24.91V246.8H245.33l-.14.42a19.56,19.56,0,0,0,5,12.23q4.42,4.79,12,4.79a39,39,0,0,0,11.23-1.36,51.83,51.83,0,0,0,9.77-4.29l5.51,12.59a37.64,37.64,0,0,1-12.07,6.27A52.26,52.26,0,0,1,260.05,279.94Zm-1.82-62.65a10.63,10.63,0,0,0-8.93,4.32,22.6,22.6,0,0,0-4,11.38l.21.35h25v-1.82q0-6.48-3-10.36T258.23,217.29Z"
              transform="translate(-135.89 -175.85)"/>
        <path className="cls-1"
              d="M326.46,184.5V203h12.7v14.3h-12.7v38.44q0,4.4,1.82,6.28a6.45,6.45,0,0,0,4.88,1.88,18.35,18.35,0,0,0,2.76-.17,26.93,26.93,0,0,0,2.68-.59l1.75,14.72a42.27,42.27,0,0,1-6,1.57,37,37,0,0,1-6.35.52q-10.53,0-16.22-5.79t-5.69-18.35V217.29h-11V203h11V184.5Z"
              transform="translate(-135.89 -175.85)"/>
        <path className="cls-1"
              d="M385.56,279.94q-16.33,0-26.1-10.47t-9.76-26.58V240.1q0-16.82,9.24-27.69t24.8-10.82q15.28,0,23.72,9.21t8.45,24.91V246.8H370.84l-.14.42a19.56,19.56,0,0,0,5,12.23q4.43,4.79,12,4.79A39,39,0,0,0,399,262.88a52.11,52.11,0,0,0,9.77-4.29l5.51,12.59a37.64,37.64,0,0,1-12.07,6.27A52.26,52.26,0,0,1,385.56,279.94Zm-1.82-62.65a10.63,10.63,0,0,0-8.93,4.32,22.6,22.6,0,0,0-4,11.38l.21.35h25v-1.82q0-6.48-3-10.36T383.74,217.29Z"
              transform="translate(-135.89 -175.85)"/>
        <path className="cls-1"
              d="M522.51,342.14l.9,10.81a27.74,27.74,0,0,1,9.28-9,24.19,24.19,0,0,1,12.35-3.2q11.44,0,17.86,7.18t6.42,22.54v47.16H548.88v-47.2q0-7.62-3.07-10.81t-9.28-3.18a15.65,15.65,0,0,0-7.26,1.65,14.88,14.88,0,0,0-5.37,4.65v54.89H503.53V342.14Z"
              transform="translate(-135.89 -175.85)"/>
        <path className="cls-1"
              d="M269.19,419.09q-16.33,0-26.1-10.46t-9.76-26.58v-2.79q0-16.81,9.24-27.7t24.8-10.81q15.28,0,23.72,9.2t8.45,24.91V386H254.47l-.14.42a19.54,19.54,0,0,0,5,12.23q4.43,4.8,12,4.8A39,39,0,0,0,282.58,402a50.83,50.83,0,0,0,9.77-4.29l5.51,12.59a37.24,37.24,0,0,1-12.07,6.27A52.26,52.26,0,0,1,269.19,419.09Zm-1.82-62.65a10.61,10.61,0,0,0-8.93,4.33,22.53,22.53,0,0,0-4,11.37l.21.35h25v-1.82q0-6.48-3-10.36C274.52,357.73,271.47,356.44,267.37,356.44Z"
              transform="translate(-135.89 -175.85)"/>
        <path className="cls-1" d="M332.81,417.63H312.44V308.79h20.37Z" transform="translate(-135.89 -175.85)"/>
        <path className="cls-1"
              d="M390.37,396.84a7.11,7.11,0,0,0-3.24-5.79q-3.25-2.44-12-4.33Q361.7,384,354.9,378.66t-6.81-14.54q0-9.76,8.2-16.57t21.94-6.8q14.44,0,23,6.76t8.2,17.1l-.14.41H389.6a9.94,9.94,0,0,0-2.89-7.39q-2.9-2.86-8.48-2.86-5,0-7.78,2.41a7.59,7.59,0,0,0-2.82,6,6.85,6.85,0,0,0,3,5.72q3,2.24,12,4,14,2.79,20.72,8.19t6.76,14.9q0,10.19-8.72,16.64t-23,6.45q-15.06,0-23.82-7.64t-8.34-17.4l.14-.42H365q.21,6.06,4,8.79a16.44,16.44,0,0,0,9.84,2.72q5.65,0,8.62-2.23A7.21,7.21,0,0,0,390.37,396.84Z"
              transform="translate(-135.89 -175.85)"/>
        <path className="cls-1"
              d="M420.09,379.19q0-16.89,9.42-27.67t26.09-10.77q16.74,0,26.23,10.74t9.49,27.7v1.46q0,17-9.45,27.73t-26.13,10.71q-16.74,0-26.2-10.71t-9.45-27.73Zm20.3,1.43q0,10.31,3.63,16.54t11.72,6.24q7.89,0,11.55-6.27T471,380.62v-1.47q0-10-3.7-16.37t-11.65-6.34q-7.87,0-11.54,6.38t-3.67,16.33Z"
              transform="translate(-135.89 -175.85)"/>
      </g>
      <line id="name-n1" className="cls-2" x1="10.39" y1="241.49" x2="10" y2="139.75"/>
      <line id="name-n2" className="cls-3" x1="13.24" y1="143.81" x2="68.99" y2="237.82"/>
      <line id="name-n3" className="cls-2" x1="72.39" y1="241.79" x2="72" y2="140.05"/>
      <path id="name-p" className="cls-4"
            d="M147,278.38l-.39-93.53h36.78s21.35,2,21,23.48-16.26,25-20.57,25.44-35.22,0-35.22,0"
            transform="translate(-135.89 -175.85)"/>
    </svg>
  );
});

export default Svg;
