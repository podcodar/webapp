import { z } from 'astro/zod';
import QRCode from 'qrcode';
import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import { useTranslations } from '@/i18n/utils';
import { generatePixString } from '@/lib/pix';
import {
  CheckIcon,
  ClockIcon,
  CoinIcon,
  CopyIcon,
  ErrorIcon,
  GiftIcon,
  HeartIcon,
  LockIcon,
  SparklesIcon,
} from './icons';

// ── Config ────────────────────────────────────────────────────────────────────
const PIX_KEY = 'doar@podcodar.org';
const MERCHANT_NAME = 'PodCodar';
const MERCHANT_CITY = 'Belo Horizonte';
const SUGGESTED_AMOUNTS = [25, 50, 100];

// ── Validation schema (astro/zod) ─────────────────────────────────────────────
const amountSchema = z
  .string()
  .refine((val) => /^[\d.,]+$/.test(val), {
    message: 'donations.widget.validation.invalidFormat',
  })
  .refine(
    (val) => {
      const parts = val.replace(',', '.').split('.');
      return parts.length <= 2 && (parts.length < 2 || parts[1].length <= 2);
    },
    { message: 'donations.widget.validation.tooManyDecimals' }
  )
  .transform((val) => parseFloat(val.replace(',', '.')))
  .pipe(z.number().min(5, { message: 'donations.widget.validation.belowMin' }));

type ValidationResult =
  | { kind: 'valid'; value: number }
  | { kind: 'empty' }
  | { kind: 'error'; key: string };

function validate(raw: string): ValidationResult {
  const trimmed = raw.trim();
  if (trimmed === '') return { kind: 'empty' };
  const result = amountSchema.safeParse(trimmed);
  if (!result.success) {
    return { kind: 'error', key: result.error.issues[0].message };
  }
  return { kind: 'valid', value: result.data };
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeSvgResponsive(svg: string): string {
  return svg.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"');
}

// ── Sub-components ────────────────────────────────────────────────────────────

function WidgetHeader() {
  const t = useTranslations();

  return (
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
        <GiftIcon />
      </div>
      <div>
        <h3 class="text-lg font-bold text-base-content">{t('donations.widget.title')}</h3>
        <p class="text-sm text-base-content/50">{t('donations.widget.subtitle')}</p>
      </div>
    </div>
  );
}

function SuggestedAmounts(props: { amount: string; onSelect: (val: number) => void }) {
  const t = useTranslations();

  return (
    <fieldset class="grid grid-cols-3 gap-2 md:gap-3 border-0 p-0">
      <legend class="sr-only">{t('donations.widget.suggestedLabel')}</legend>
      {SUGGESTED_AMOUNTS.map((val) => {
        const isSelected = props.amount === String(val);
        return (
          <button
            type="button"
            class={`relative p-2 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 ease-out border-2 ${
              isSelected
                ? 'border-primary bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg shadow-primary/25 scale-[1.02]'
                : 'border-base-300 bg-base-100 text-base-content/70 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:scale-[1.02]'
            }`}
            onClick={() => props.onSelect(val)}
            aria-pressed={isSelected}
          >
            <span class="text-sm relative z-10">R$ {val}</span>
            {isSelected && <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-white/60" />}
          </button>
        );
      })}
    </fieldset>
  );
}

function AmountInput(props: {
  value: string;
  onInput: (e: Event) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const t = useTranslations();

  return (
    <div class={`transition-all duration-300 ${props.isFocused ? 'scale-[1.01]' : ''}`}>
      <label
        class={`flex relative items-center gap-2 p-2 rounded-xl border-2 bg-base-100 transition-all duration-300`}
      >
        <div
          class={`p-1 rounded-xl flex items-center justify-center transition-colors ${
            props.isFocused ? 'bg-primary/10 text-primary' : 'bg-base-200 text-base-content/40'
          }`}
        >
          <CoinIcon />
        </div>
        <span
          class={`text-lg font-semibold transition-colors ${
            props.isFocused ? 'text-primary' : 'text-base-content/60'
          }`}
        >
          R$
        </span>
        <input
          type="text"
          inputmode="decimal"
          value={props.value}
          onInput={props.onInput}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          class="flex-1 bg-transparent focus:outline-none font-bold text-lg text-base-content placeholder:text-base-content/30"
          placeholder={t('donations.widget.customPlaceholder')}
          aria-label={t('donations.widget.customAriaLabel')}
        />
        <span class="text-xs absolute right-2 font-medium text-success bg-success/10 px-2 py-1 rounded-md">
          {t('donations.widget.pixBadge')}
        </span>
      </label>
    </div>
  );
}

function PixCopySection(props: { pixString: string; copied: boolean; onCopy: () => void }) {
  const t = useTranslations();

  return (
    <div class="relative group">
      <div class="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div class="relative flex items-center gap-2 p-1 rounded-xl bg-base-200/80 border border-base-300/60">
        <input
          id="pix-copia-cola"
          type="text"
          value={props.pixString}
          readOnly
          class="flex-1 bg-transparent px-3 py-2.5 font-mono text-[11px] md:text-xs text-base-content/70 truncate focus:outline-none"
          aria-label={t('donations.widget.pixCodeAriaLabel')}
        />
        <button
          type="button"
          class={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            props.copied
              ? 'bg-success text-success-content shadow-md shadow-success/20'
              : 'bg-primary text-primary-content hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5'
          }`}
          onClick={props.onCopy}
          aria-label={
            props.copied
              ? t('donations.widget.copiedAriaLabel')
              : t('donations.widget.copyAriaLabel')
          }
        >
          {props.copied ? (
            <>
              <CheckIcon />
              <span>{t('donations.widget.copiedButton')}</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span>{t('donations.widget.copyButton')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function QrCorner(props: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const classes = {
    'top-left': 'top-3 left-3 border-l-2 border-t-2 rounded-tl-lg',
    'top-right': 'top-3 right-3 border-r-2 border-t-2 rounded-tr-lg',
    'bottom-left': 'bottom-3 left-3 border-l-2 border-b-2 rounded-bl-lg',
    'bottom-right': 'bottom-3 right-3 border-r-2 border-b-2 rounded-br-lg',
  };

  return (
    <div
      class={`absolute w-6 h-6 border-primary/30 z-20 pointer-events-none ${classes[props.position]}`}
    />
  );
}

function QrCodePanel(props: { qrSvg: string }) {
  return (
    <div class="relative justify-center hidden lg:flex">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 animate-pulse" />
      </div>

      <div
        class="relative aspect-square w-full bg-white rounded-3xl border border-base-300/40 shadow-xl shadow-black/5 overflow-hidden"
        role="img"
        aria-label="QR Code para pagamento PIX"
      >
        <div innerHTML={props.qrSvg} class="relative z-10 w-full h-full p-5 md:p-6" />

        <QrCorner position="top-left" />
        <QrCorner position="top-right" />
        <QrCorner position="bottom-left" />
        <QrCorner position="bottom-right" />
      </div>
    </div>
  );
}

function SecurityBadge() {
  const t = useTranslations();

  return (
    <div class="flex items-center justify-center gap-2 text-xs text-base-content/40">
      <LockIcon />
      <span>{t('donations.widget.securityBadge')}</span>
    </div>
  );
}

function EmptyState() {
  const t = useTranslations();

  return (
    <div class="flex flex-col items-center gap-3 py-8 text-center">
      <div class="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center">
        <ClockIcon />
      </div>
      <p class="text-sm text-base-content/50">{t('donations.widget.emptyState')}</p>
    </div>
  );
}

function ValidationError(props: { messageKey: string }) {
  const t = useTranslations();

  return (
    <div class="flex items-center gap-2 p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm">
      <ErrorIcon />
      <span>{t(props.messageKey)}</span>
    </div>
  );
}

function PixErrorMessage(props: { message: string }) {
  return (
    <div class="flex items-center gap-2 p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm">
      <ErrorIcon />
      <span>{props.message}</span>
    </div>
  );
}

function Decorations() {
  return (
    <>
      <div class="absolute -top-6 -right-6 w-16 h-16 text-primary/10 pointer-events-none">
        <SparklesIcon class="w-full h-full animate-pulse" />
      </div>
      <div class="absolute -bottom-4 -left-4 w-10 h-10 text-secondary/20 pointer-events-none">
        <HeartIcon class="w-full h-full" />
      </div>
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function DonationWidget() {
  const t = useTranslations();

  // ── State ─────────────────────────────────────────────────────────────────
  const [amount, setAmount] = createSignal('25');
  const [copied, setCopied] = createSignal(false);
  const [qrSvg, setQrSvg] = createSignal('');
  const [pixErr, setPixErr] = createSignal<string | null>(null);
  const [isFocused, setIsFocused] = createSignal(false);
  let copyTimeout: ReturnType<typeof setTimeout>;

  // ── Derived ───────────────────────────────────────────────────────────────
  const currentValue = (): number => {
    const result = validationResult();
    return result.kind === 'valid' ? result.value : 0;
  };

  const pixString = (): string => {
    const value = currentValue();
    if (value <= 0) return '';
    try {
      return generatePixString({
        pixKey: PIX_KEY,
        merchantName: MERCHANT_NAME,
        merchantCity: MERCHANT_CITY,
        amount: value,
        description: 'Doação',
      });
    } catch {
      setPixErr(t('donations.widget.errorGeneratingPix'));
      return '';
    }
  };

  // ── Generate QR code when PIX string changes ──────────────────────────────
  createEffect(() => {
    const str = pixString();
    if (!str) {
      setQrSvg('');
      return;
    }
    setPixErr(null);
    QRCode.toString(str, {
      type: 'svg',
      width: 220,
      margin: 1,
      color: { dark: '#4c1d95', light: '#ffffff' },
    } as const)
      .then((svg: string) => {
        setQrSvg(makeSvgResponsive(svg));
      })
      .catch(() => {
        setPixErr(t('donations.widget.errorGeneratingQr'));
      });
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixString());
    } catch {
      // Clipboard API unavailable — user can manually copy from the visible input
    }
    setCopied(true);
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => setCopied(false), 2000);
  };

  const handleAmountInput = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const cleaned = input.value.replace(/[^0-9.,]/g, '');
    setAmount(cleaned);
  };

  const handleAmountClick = (val: number) => {
    setAmount(String(val));
  };

  // ── Derived reactive state ────────────────────────────────────────────────
  const validationResult = createMemo(() => validate(amount()));
  const errorKey = createMemo(() => {
    const result = validationResult();
    return result.kind === 'error' ? result.key : undefined;
  });

  return (
    <div class="relative">
      <Decorations />

      {/* Main Card */}
      <div class="relative rounded-3xl border border-base-300/60 bg-gradient-to-b from-base-100 to-base-200/50 p-6 shadow-xl shadow-primary/5 backdrop-blur-sm flex flex-col gap-4">
        <div class="grid lg:grid-cols-2 gap-6">
          {/* Left Column — Amount selection */}
          <div class="space-y-5">
            <WidgetHeader />
            <SuggestedAmounts amount={amount()} onSelect={handleAmountClick} />
            <AmountInput
              value={amount()}
              onInput={handleAmountInput}
              isFocused={isFocused()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Show when={errorKey()}>
              <ValidationError messageKey={errorKey()!} />
            </Show>
            <Show when={pixErr()}>
              <PixErrorMessage message={pixErr()!} />
            </Show>
          </div>

          {/* Right Column — PIX results */}
          <div class="space-y-5">
            <Show when={pixString().length > 0}>
              <QrCodePanel qrSvg={qrSvg()} />
              <SecurityBadge />
            </Show>
            <Show when={pixString().length === 0}>
              <EmptyState />
            </Show>
          </div>
        </div>

        <PixCopySection pixString={pixString()} copied={copied()} onCopy={handleCopy} />
      </div>
    </div>
  );
}
