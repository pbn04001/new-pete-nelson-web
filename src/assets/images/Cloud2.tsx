import React from "react";

interface SvgProps {
  className?: string
}

const Svg = React.forwardRef<SVGSVGElement, SvgProps>(({
                                                         className
                                                       }, ref)=> {
  return (
    <svg id="Clouds" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 515.42 247.82"
         className={className}
         ref={ref}
    >
      <title>cloud_2</title>
      <path d="M2040.38,461.79l-144.54-1.28s-11.94-.43-11.94-13.22,13.22-14.5,13.22-14.5h18.76c.85,0,9.8-2.13,10.23-14.07s-13.22-12.79-13.22-12.79l-96.36-.43s-14.07-1.28-14.07-14.07,15.35-14.07,15.35-14.07h113.42s12.36-1.28,12.79-14.07-13.65-12.79-13.65-12.79l-144.12-.86s-17,1.28-16.63-13.64,16.63-14.07,16.63-14.07h122c5.12-.43,11.09-5.12,11.52-14.92s-12.8-12.37-12.8-12.37H1618.26c-8.53,0-14.5,3-14.93,14.5S1617,321.93,1617,321.93h112.14l4.13.62c4.61,1.12,11.36,4.26,10.79,13-.85,13.22-12.79,14.5-12.79,14.5s-32-.43-46.48-.43-15.35,9.81-15.35,16.21,7.68,11.94,17.91,11.94,15.35,3.41,14.5,15.77-14.5,12.37-14.5,12.37h-130.9s-14.07,0-14.07,13.22,14.07,14.07,14.07,14.07,223-.43,226.41,0,13.22,2.56,12.79,14.5S1782,461.79,1782,461.79l-32.83.42s-13.65-1.28-13.65,12.79,13.65,13.22,13.65,13.22l131.33.43-.45-.43h160.34c1.28,0,11.09-2.13,11.52-14.07S2040.38,461.79,2040.38,461.79Z"
            transform="translate(-1536.49 -240.83)" style={{fill:"#30303a"}}/>
      <path d="M1550.4,294.9h27.81s12.68-.41,12.68,12.68-10.63,12.68-10.63,12.68l-30.68.82s-13.09.4-13.09-12.93C1536.49,298.41,1543.85,294.9,1550.4,294.9Z"
            transform="translate(-1536.49 -240.83)" style={{fill:"#30303a"}}/>
      <path d="M1967.88,350h27.82s12.68-.41,12.68,12.68-10.64,12.68-10.64,12.68l-30.68.82s-13.08.41-13.08-12.93C1954,353.54,1961.34,350,1967.88,350Z"
            transform="translate(-1536.49 -240.83)" style={{fill:"#30303a"}}/>
      <circle cx="368.16" cy="14.19" r="13.7" style={{fill:"#30303a"}}/>
      <path d="M1860.15,254.13a13.3,13.3,0,0,0-12.27-13.25v0H1679.05v0a13.29,13.29,0,0,0,0,26.58v0h168.83v-.11A13.29,13.29,0,0,0,1860.15,254.13Z"
            transform="translate(-1536.49 -240.83)" style={{fill:"#30303a"}}/>
    </svg>

  );
});

export default Svg;
