import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { resolveSkillHref } from '../../lib/skills/repo';
import {
  colors,
  font,
  radius,
  space,
  text,
  weight,
} from '../../styles/tokens.stylex';

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x4,
    minWidth: 0,
  },
  h1: {
    marginTop: space.x4,
    fontSize: text.xl,
    fontWeight: weight.medium,
    lineHeight: 1.3,
    letterSpacing: '-0.02em',
    textWrap: 'balance',
  },
  h2: {
    marginTop: space.x6,
    fontSize: text.lg,
    fontWeight: weight.medium,
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
    textWrap: 'balance',
  },
  h3: {
    marginTop: space.x4,
    fontSize: text.md,
    fontWeight: weight.medium,
    lineHeight: 1.5,
  },
  p: {
    lineHeight: 1.7,
    textWrap: 'pretty',
    overflowWrap: 'anywhere',
  },
  a: {
    color: colors.foreground,
    textDecorationLine: 'underline',
    textDecorationColor: colors.ring,
    textUnderlineOffset: '3px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x2,
    margin: 0,
    paddingInlineStart: space.x6,
    lineHeight: 1.7,
  },
  inlineCode: {
    paddingInline: space.x1,
    borderRadius: radius.sm,
    backgroundColor: colors.muted,
    fontFamily: font.mono,
    fontSize: '0.875em',
    overflowWrap: 'anywhere',
  },
  pre: {
    margin: 0,
    padding: space.x4,
    overflowX: 'auto',
    borderRadius: radius.md,
    backgroundColor: colors.muted,
    fontFamily: font.mono,
    fontSize: text.sm,
    lineHeight: 1.6,
  },
  blockquote: {
    margin: 0,
    paddingInlineStart: space.x4,
    borderInlineStartWidth: '2px',
    borderInlineStartStyle: 'solid',
    borderInlineStartColor: colors.border,
    color: colors.mutedForeground,
  },
  hr: {
    width: '100%',
    height: '1px',
    margin: 0,
    borderWidth: 0,
    backgroundColor: colors.border,
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: text.sm,
  },
  cell: {
    paddingBlock: space.x2,
    paddingInlineEnd: space.x4,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    textAlign: 'start',
    verticalAlign: 'top',
  },
  th: {
    fontWeight: weight.medium,
  },
});

/** Joins the text inside a hast node, for code blocks. */
function textOf(node: unknown): string {
  if (!node || typeof node !== 'object') return '';
  if ('value' in node && typeof node.value === 'string') return node.value;
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(textOf).join('');
  }
  return '';
}

function components(path: string): Components {
  return {
    h1: ({ node, ...props }) => <h2 {...props} {...stylex.props(styles.h1)} />,
    h2: ({ node, ...props }) => <h3 {...props} {...stylex.props(styles.h2)} />,
    h3: ({ node, ...props }) => <h4 {...props} {...stylex.props(styles.h3)} />,
    h4: ({ node, ...props }) => <h5 {...props} {...stylex.props(styles.h3)} />,
    p: ({ node, ...props }) => <p {...props} {...stylex.props(styles.p)} />,
    a: ({ node, href = '', ...props }) => (
      <a
        {...props}
        href={resolveSkillHref(href, path)}
        {...stylex.props(styles.a)}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul {...props} {...stylex.props(styles.list)} />
    ),
    ol: ({ node, ...props }) => (
      <ol {...props} {...stylex.props(styles.list)} />
    ),
    code: ({ node, ...props }) => (
      <code {...props} {...stylex.props(styles.inlineCode)} />
    ),
    // Render block code from the node, so it skips the inline code style.
    pre: ({ node }) => (
      <pre {...stylex.props(styles.pre)}>
        <code>{textOf(node).replace(/\n$/, '')}</code>
      </pre>
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote {...props} {...stylex.props(styles.blockquote)} />
    ),
    hr: () => <hr {...stylex.props(styles.hr)} />,
    table: ({ node, ...props }) => (
      <div {...stylex.props(styles.tableWrap)}>
        <table {...props} {...stylex.props(styles.table)} />
      </div>
    ),
    th: ({ node, style, ...props }) => (
      <th {...props} {...stylex.props(styles.cell, styles.th)} />
    ),
    td: ({ node, style, ...props }) => (
      <td {...props} {...stylex.props(styles.cell)} />
    ),
  };
}

interface Props extends Pick<ComponentProps<typeof ReactMarkdown>, 'children'> {
  /** Repository path of the file, used to resolve relative links. */
  path: string;
}

/**
 * Renders a SKILL.md body to static HTML with the site's type styles.
 * Headings shift down one level, since the page already has an `h1`.
 */
export function Markdown({ children, path }: Props) {
  return (
    <div {...stylex.props(styles.root)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components(path)}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
