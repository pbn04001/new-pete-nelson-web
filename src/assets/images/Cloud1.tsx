import React from "react";

interface SvgProps {
  className?: string
}

const Svg = React.forwardRef<SVGSVGElement, SvgProps>(({
                                                         className
                                                       }, ref)=> {
  return (
    <svg id="Clouds" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 484.35 239.54"
      className={className}
      ref={ref}
    >
      <title>cloud_1</title>
      <path style={{ fill: '#30303a' }}
            d="M1431.38,91.15V91H1104.77l-.38,0-.38,0h-.13a13.4,13.4,0,0,0,0,26.78v.2h112.83c.24,0,.47,0,.72,0s.48,0,.72,0h.36v0a13.27,13.27,0,1,1-3.37,26.3H1076.51v.08a13.4,13.4,0,0,0,0,26.77v.13h107v.19a13.26,13.26,0,0,1,0,26.48v.18h-87.59v0h0a13.42,13.42,0,0,0,0,26.83h0v.13H1105v.2l.72,0a13.28,13.28,0,1,1,0,26.56,13.64,13.64,0,0,1-1.57-.1H973.51l-.63,0a13.4,13.4,0,0,0-.39,26.8v.21h323.77v-.07a13.44,13.44,0,0,0,0-26.77v-.14h-70.41v-.14h-.11a13.28,13.28,0,1,1,0-26.56c.41,0,.82,0,1.22.06h148v-.2a13.44,13.44,0,0,0-1-26.84,10.6,10.6,0,0,0-1.14.06h-63.92V198h0a13.28,13.28,0,1,1,0-26.56h0v-.15H1350v-.07a13.43,13.43,0,0,0,0-26.81v-.1h-67.7a14.89,14.89,0,0,1-1.64.11,13.29,13.29,0,1,1,1.8-26.43h148.88v-.1a13.4,13.4,0,0,0,0-26.73Z"
            transform="translate(-959.47 -39.18)"/>
      <path style={{ fill: '#30303a' }}
            d="M1333.1,52.48a13.3,13.3,0,0,0-12.27-13.25v0H1152v0a13.29,13.29,0,0,0,0,26.58v0h168.83v-.11A13.3,13.3,0,0,0,1333.1,52.48Z"
            transform="translate(-959.47 -39.18)"/>
      <circle className="cls-1" cx="141.89" cy="13.94" r="13.3"/>
      <path style={{ fill: '#30303a' }}
            d="M1054.69,158.73a13.3,13.3,0,0,0-12.27-13.25v0h-25.8v0a13.29,13.29,0,0,0,0,26.58v0h25.8V172A13.3,13.3,0,0,0,1054.69,158.73Z"
            transform="translate(-959.47 -39.18)"/>
    </svg>

  );
});

export default Svg;
