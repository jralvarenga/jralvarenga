import * as stylex from '@stylexjs/stylex';
import type { CSSProperties, SVGProps } from 'react';
import uca from '../../assets/logos/uca.png';
import { colors } from '../../styles/tokens.stylex';

const styles = stylex.create({
  denzo: {
    fill: colors.denzo,
  },
  caban: {
    fill: colors.caban,
  },
  cabanDot: {
    fill: colors.cabanDot,
  },
  fiverrTile: {
    fill: colors.fiverr,
  },
  fiverrMark: {
    fill: colors.fiverrForeground,
  },
  // The UCA crest is black on white and taller than wide, so it sits
  // centered on a white tile in both themes.
  uca: {
    boxSizing: 'border-box',
    padding: '0.08em',
    backgroundColor: colors.ucaTile,
    objectFit: 'contain',
  },
});

/** What `InlineLogo` passes to every logo: the tile-filling styles. */
export interface LogoProps {
  className?: string;
  style?: CSSProperties;
}

type SvgLogoProps = LogoProps & Omit<SVGProps<SVGSVGElement>, 'children'>;

/** Denzo Studios' mark, in its brand blue in both themes. */
export function DenzoLogo(props: SvgLogoProps) {
  return (
    <svg viewBox="0 0 50 50" aria-hidden="true" {...props}>
      <g {...stylex.props(styles.denzo)}>
        <path d="M0.5 2.5H35V11.5H0.5V2.5Z" />
        <path d="M0 38.5H35V47.5H0V38.5Z" />
        <path d="M38.5 16H48.5V35H38.5V16Z" />
        <path d="M35 2C40.09 2 43.6232 3.40245 45.873 5.91699C48.113 8.4208 49 11.9384 49 16V35C49 39.0771 47.9803 42.3554 45.6611 44.6084C43.3448 46.8586 39.8203 48 35 48H0V38L20.7158 12H0V2H35ZM0.5 47H34.5V39H0.5V47ZM38.9775 35.5C38.9038 36.3864 38.6264 37.2052 38.0596 37.835C37.4655 38.495 36.6079 38.8895 35.5 38.9795V46.9922C39.9104 46.9155 42.9794 45.8192 44.9639 43.8916C46.9313 41.9804 47.9115 39.1761 47.9922 35.5H38.9775ZM15.0146 38H35C36.1473 38 36.8711 37.6588 37.3154 37.165C37.7683 36.6618 38 35.9238 38 35V16C38 15.1122 37.662 14.0879 37.0928 13.291C36.5207 12.4902 35.7791 12 35 12L15.0146 38ZM1.04492 38H13.7539L33.7383 12H22L1.04492 38ZM39 34.5H48V16.5H39V34.5ZM35.5 11.0439C36.4966 11.2174 37.3242 11.8928 37.9072 12.709C38.4872 13.5209 38.8703 14.5311 38.9717 15.5H47.9932C47.9222 11.7879 47.051 8.73337 45.127 6.58301C43.1955 4.42459 40.1293 3.09378 35.5 3.00488V11.0439ZM1 11H34.5V3H1V11Z" />
        <path d="M1.04492 38H13.7539L33.7383 12H22L1.04492 38Z" />
        <path d="M35.5 11.0439C36.4966 11.2174 37.3242 11.8928 37.9072 12.709C38.4872 13.5209 38.8703 14.5311 38.9717 15.5H47.9932C47.9222 11.7879 47.051 8.73337 45.127 6.58301C43.1955 4.42459 40.1293 3.09378 35.5 3.00488V11.0439Z" />
        <path d="M38.9775 35.5C38.9038 36.3864 38.6264 37.2052 38.0596 37.835C37.4655 38.495 36.6079 38.8895 35.5 38.9795V46.9922C39.9104 46.9155 42.9794 45.8192 44.9639 43.8916C46.9313 41.9804 47.9115 39.1761 47.9922 35.5H38.9775Z" />
      </g>
    </svg>
  );
}

/** Caban's mark: a blue C (white in dark mode) and a green dot. */
export function CabanLogo(props: SvgLogoProps) {
  return (
    <svg viewBox="0 0 52 50" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.3759 14.7478C35.8363 14.7478 31.3472 19.1561 31.3472 24.5959C31.3472 30.0357 35.8384 34.444 41.3759 34.444C46.9133 34.444 51.4045 30.0337 51.4045 24.5959C51.4045 19.1581 46.9133 14.7478 41.3759 14.7478Z"
        {...stylex.props(styles.cabanDot)}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7912 25C12.7912 18.1835 18.5168 12.5609 25.4582 12.5609H42.0003V0H25.4582C11.4575 0 0 11.2492 0 25C0 38.7508 11.4575 50 25.4582 50H42.0003V37.4391H25.4582C18.5168 37.4391 12.7912 31.8165 12.7912 25Z"
        {...stylex.props(styles.caban)}
      />
    </svg>
  );
}

/**
 * Fiverr's "fi" in white on its green, like its app icon. The full
 * "fiverr." wordmark is too wide to read at the size of a letter, so only
 * the "fi" glyphs from it are drawn, centered in a 12-unit square.
 */
export function FiverrLogo(props: SvgLogoProps) {
  return (
    <svg viewBox="-3.19 5.93 12 12" aria-hidden="true" {...props}>
      <rect
        x="-3.19"
        y="5.93"
        width="12"
        height="12"
        {...stylex.props(styles.fiverrTile)}
      />
      <path
        d="M.908 15.44H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z"
        {...stylex.props(styles.fiverrMark)}
      />
    </svg>
  );
}

/**
 * UCA's crest, a raster image. StyleX merges its tile styles with the ones
 * `InlineLogo` passes in, so the class names are combined here.
 */
export function UcaLogo({ className, style }: LogoProps) {
  const own = stylex.props(styles.uca);

  return (
    <img
      src={uca.src}
      alt=""
      width={uca.width}
      height={uca.height}
      className={[className, own.className].filter(Boolean).join(' ')}
      style={style}
    />
  );
}
