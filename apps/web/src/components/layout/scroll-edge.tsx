import * as stylex from '@stylexjs/stylex';
import { colors } from '../../styles/tokens.stylex';

type Side = 'top' | 'bottom';

/** The direction each edge fades in: from the screen edge toward the page. */
const direction: Record<Side, string> = {
  top: 'to bottom',
  bottom: 'to top',
};

/**
 * Progressive blur, like SwiftUI's soft scroll edge: each layer blurs more
 * and is masked to a shorter band at the screen edge, so the blur builds
 * toward the edge and dissolves into the page.
 */
function blurLayers(side: Side) {
  const to = direction[side];
  return [
    {
      blur: 'blur(1px)',
      mask: `linear-gradient(${to}, black 60%, transparent)`,
    },
    {
      blur: 'blur(3px)',
      mask: `linear-gradient(${to}, black 40%, transparent 80%)`,
    },
    {
      blur: 'blur(8px)',
      mask: `linear-gradient(${to}, black 20%, transparent 60%)`,
    },
  ];
}

const styles = stylex.create({
  edge: (to: string) => ({
    position: 'absolute',
    pointerEvents: 'none',
    // A soft tint of the page color that fades out toward the page.
    backgroundImage: `linear-gradient(${to}, color-mix(in oklch, ${colors.background} 92%, transparent), color-mix(in oklch, ${colors.background} 70%, transparent) 55%, transparent)`,
  }),
  blur: (blur: string, mask: string) => ({
    position: 'absolute',
    inset: 0,
    backdropFilter: blur,
    WebkitBackdropFilter: blur,
    maskImage: mask,
    WebkitMaskImage: mask,
  }),
});

interface Props {
  /** The screen edge the fade starts from. */
  side: Side;
  /** Position and size of the edge. */
  xstyle?: stylex.StyleXStyles;
}

/**
 * A soft scroll edge: a tint of the page color over stacked blurs that
 * fade out toward the page, with no hard line. Used under the sticky
 * header and along the bottom of the screen.
 */
export function ScrollEdge({ side, xstyle }: Props) {
  return (
    <div
      aria-hidden="true"
      {...stylex.props(styles.edge(direction[side]), xstyle)}
    >
      {blurLayers(side).map((layer) => (
        <div
          key={layer.blur}
          {...stylex.props(styles.blur(layer.blur, layer.mask))}
        />
      ))}
    </div>
  );
}
