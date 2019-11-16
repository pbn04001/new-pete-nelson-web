import React from 'react';

import SVG from 'react-inlinesvg-2';

export enum SvgType {
  IMAGE="images",
  ICON="icons"
}

interface SvgProps {
  name: string
  type?: SvgType
  className?: string
}

const Svg = React.forwardRef<SVGSVGElement, SvgProps>(({
  name,
  type = SvgType.ICON,
  className
}, ref)=> {
  return (
    <SVG ref={ref} src={`/assets/${type.valueOf()}/${name}.svg`} className={className} />
  );
});

export default Svg;
