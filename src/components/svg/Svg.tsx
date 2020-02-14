import React from 'react';

interface SvgProps {
  name: string
  className?: string
}

const Svg = React.forwardRef<SVGSVGElement, SvgProps>(({
  name,
  className
}, ref)=> {
  return (
    <svg
      ref={ref}
      className={className}
    >
      <use xlinkHref={`#${name}`}></use>
    </svg>
  );
});

export default Svg;
