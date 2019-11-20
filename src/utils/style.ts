export const translateX = (obj: SVGSVGElement | HTMLDivElement | null, isVisible: boolean, offset: number) => {
  if (obj === null) return;
  obj.style.transform = `translateX(${isVisible ? 0 : offset}px)`
}

export const translateY = (obj: SVGSVGElement | HTMLDivElement | null, isVisible: boolean, offset: number) => {
  if (obj === null) return;
  obj.style.transform = `translateY(${isVisible ? 0 : offset}px)`
}
