const MIN_DESKTOP = 768;
const SCREEN_SIZES: Record<BerakPoints, string> = {
  lg: `${MIN_DESKTOP}px`,
};

export const mediaQuery = (breakpoint: BerakPoints) =>
  `@media (min-width: ${SCREEN_SIZES[breakpoint] || 0})`;

export const isDesktop = (width: number) => width >= MIN_DESKTOP;

const patterns = {
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
};

export type PatternType = keyof typeof patterns;

export const isValid = (type: PatternType, value: string) => {
  const pattern = patterns[type];

  if (!pattern) return true;

  return pattern.test(value);
};
