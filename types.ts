export interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export interface InkTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'span';
}

export interface GridLineProps {
  orientation: 'vertical' | 'horizontal';
  position: string; // e.g., "left-1/3" or "top-20"
  length?: string; // height or width
}