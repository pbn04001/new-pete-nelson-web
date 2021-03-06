import React from "react";

interface SvgProps {
  className?: string
}

const Svg = React.forwardRef<SVGSVGElement, SvgProps>(({
                                                         className
                                                       }, ref)=> {
  return (
    <svg data-name="Layer 15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1087.74 1087.74"
         className={className}
         ref={ref}
    >
      <title>moon_back</title>
      <circle cx="1477.08" cy="222.24" r="543.87" transform="translate(-657.73 1431.18) rotate(-45)"
              style={{fill:"#070707"}}/>
      <circle cx="1477.08" cy="222.24" r="454.45" transform="translate(-657.73 1431.18) rotate(-45)"
              style={{fill:"#0a0a0a"}}/>
      <circle cx="1477.08" cy="222.24" r="365.03" transform="translate(-657.73 1431.18) rotate(-45)"
              style={{fill:"#0f0f0f"}}/>
      <circle cx="1477.08" cy="222.24" r="275.61" transform="translate(-657.73 1431.18) rotate(-45)"
              style={{fill:"#161616"}}/>
      <circle cx="543.87" cy="543.87" r="186.2" style={{fill:"#212121"}}/>
    </svg>
  );
});

export default Svg;
