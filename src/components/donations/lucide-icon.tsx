import { type Component } from 'solid-js';

/**
 * Icon names used by the DonationWidget.
 * Only the subset we actually need — keeps the bundle small.
 */
export type LcIconName =
  | 'gift'
  | 'circle-dollar-sign'
  | 'circle-x'
  | 'check'
  | 'copy'
  | 'lock'
  | 'clock'
  | 'zap'
  | 'heart'
  | 'sparkles';

// ── SVG body fragments extracted from @iconify-json/lucide/icons.json ──────
// Each body is the inner content of a <svg> (no <svg> wrapper).
// Attributes: fill="none" stroke="currentColor" stroke-linecap="round"
//             stroke-linejoin="round" stroke-width="2"

const ICON_BODIES: Record<LcIconName, string> = {
  gift: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 7v14m8-10v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8m3.5-4a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5a1 1 0 0 1 0 5"/><rect width="18" height="4" x="3" y="7" rx="1"/></g>`,
  'circle-dollar-sign': `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8m4 2V6"/></g>`,
  'circle-x': `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9l-6 6m0-6l6 6"/></g>`,
  check: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/>`,
  copy: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></g>`,
  lock: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></g>`,
  clock: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g>`,
  zap: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>`,
  heart: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>`,
  sparkles: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4"/><circle cx="4" cy="20" r="2"/></g>`,
};

export interface LcIconProps {
  name: LcIconName;
  class?: string;
  width?: number;
  height?: number;
  'stroke-width'?: number;
  fill?: string;
}

/**
 * Renders a Lucide icon from pre-extracted SVG body data.
 *
 * The <svg> wrapper applies the standard Lucide viewport (0 0 24 24) and
 * forwards className / size props.  The inner body is rendered via
 * innerHTML because SolidJS does not have a JSX equivalent of Astro's
 * `set:html` — and we're already shipping the body strings.
 */
export const LcIcon: Component<LcIconProps> = (props) => {
  const body = ICON_BODIES[props.name];
  const w = props.width ?? 24;
  const h = props.height ?? 24;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill={props.fill ?? 'none'}
      stroke="currentColor"
      stroke-width={props['stroke-width'] ?? 2}
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
      aria-hidden="true"
      innerHTML={body}
    />
  );
};
