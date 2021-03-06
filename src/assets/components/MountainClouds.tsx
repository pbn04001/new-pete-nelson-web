import React from "react";

interface SvgProps {
  className?: string
}

const Svg = React.forwardRef<SVGSVGElement, SvgProps>(({
                                                         className
                                                       }, ref)=> {
  return (
    <svg id="Layer_13" data-name="Layer 13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1924 1068.68"
      ref={ref}
      className={className}
    >
      <title>mountain_clouds</title>
      <path d="M-3,12c0-4,73,4,124,50,0,0,50-40,104-14s64,82,58,106c0,0,30,10,50,35s18,22,23,42c0,0,36,15,50,27,0,0,35-23,87-8,0,0,46-53,106-26s61,62,63,77c0,0,40,20,47,27,0,0,103-40,191,11,0,0,80-27,144,10,0,0,103-64,211-26,0,0,75-83,193-38,0,0,32-38,94-40,0,0,3-150,146-100,0,0,35-34,57-33,0,0,46-109,172-87l1,505,3,548S2,1082,2,1078-3,12-3,12Z"
            transform="translate(3 -11.1)" style={{fill:'#fffdef'}}/>
    </svg>
  );
});

export default Svg;
