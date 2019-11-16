export const getBaseFontSize = (): number => parseInt(window.getComputedStyle(document.documentElement).fontSize, 10);

export const getSpacingUnit = (): number => getBaseFontSize() / 2;

export const SCREEN_SIZE = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
});

export function getScreenSizeMax(size: String): number {
  switch (size) {
    case SCREEN_SIZE.SM: {
      return getBaseFontSize() * 48;
    }
    case SCREEN_SIZE.MD: {
      return getBaseFontSize() * 64;
    }
    case SCREEN_SIZE.LG: {
      return getBaseFontSize() * 90;
    }
    default: {
      return getBaseFontSize() * 90;
    }
  }
}

export function getClientHeight(client?: HTMLDivElement | SVGSVGElement | null): number {
  if (!client) return 0;
  return client.clientHeight || (client.parentNode as HTMLDivElement | HTMLSpanElement).clientHeight;
}

export function getClientWidth(client?: HTMLDivElement | SVGSVGElement | null): number {
  if (!client) return 0;
  return client.clientWidth || (client.parentNode as HTMLDivElement | HTMLSpanElement).clientWidth;
}
