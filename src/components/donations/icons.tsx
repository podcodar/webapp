import { LcIcon } from './lucide-icon';

/**
 * Named icon exports used by DonationWidget.
 * Re-exported from the centralised Lucide icon component.
 */
export function GiftIcon(props: { class?: string }) {
  return <LcIcon name="gift" width={20} height={20} class={props.class} />;
}

export function CoinIcon() {
  return <LcIcon name="circle-dollar-sign" width={18} height={18} />;
}

export function ErrorIcon() {
  return <LcIcon name="circle-x" width={16} height={16} />;
}

export function CheckIcon() {
  return <LcIcon name="check" width={16} height={16} stroke-width={2.5} />;
}

export function CopyIcon() {
  return <LcIcon name="copy" width={16} height={16} />;
}

export function LockIcon() {
  return <LcIcon name="lock" width={14} height={14} />;
}

export function ClockIcon(props: { class?: string }) {
  return <LcIcon name="clock" width={24} height={24} class={props.class} />;
}

export function SparklesIcon(props: { class?: string }) {
  return <LcIcon name="sparkles" fill="currentColor" class={props.class} />;
}

export function HeartIcon(props: { class?: string }) {
  return <LcIcon name="heart" fill="currentColor" class={props.class} />;
}
