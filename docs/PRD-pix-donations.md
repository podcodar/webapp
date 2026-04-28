# PRD: PIX Donations

**Status:** Draft
**Created:** 2026-04-28
**Author:** AI Agent (from discussion with maintainer)
**Version:** 1.1
**Issue:** [#248](https://github.com/podcodar/webapp/issues/248)

---

## Executive Summary

Add a self-service PIX donation section to the `/contributing` page. Visitors
choose a suggested amount (R$ 25, R$ 50, R$ 100) or enter a custom value
(R$ 5–R$ 10,000) and instantly receive a PIX QR code and "Copia e Cola" string
to complete their donation — no backend, no contact form required.

---

## Problem Statement

The current donations flow requires visitors to fill out a contact form
("Falar sobre doação" → `/contact`) before they can donate. This friction
loses potential donors who want to contribute immediately. Other Brazilian
community projects offer one-click PIX donations, and PodCodar should match
that expectation.

---

## Goals

- Let anyone donate via PIX in under 30 seconds without leaving the page
- Generate valid PIX BR Code + QR code entirely client-side (no server cost)
- Highlight the donation section prominently on the contributing page
- Validate custom amounts with clear error messages (Zod)
- Keep the existing contact-based flow for donors who want to discuss larger
  contributions (> R$ 10,000)

---

## Non-Goals

- **No payment tracking or confirmation** — this is a static site; we cannot
  know if a PIX payment was completed
- **No recurring donations** — one-time PIX only
- **No backend or server-side code** — all generation happens in the browser
- **No donor identity collection** — anonymous donations are fine
- **No dynamic PIX keys** — single key (`doar@podcodar.org`), no per-donor
  or per-amount keys
- **No htmx** — current interactivity needs are fully covered by Alpine.js

---

## User Stories

### Must Have (P0)

- As a visitor, I want to select a suggested donation amount (R$ 25, R$ 50, R$ 100)
  with one click so that I can donate quickly without typing.
- As a visitor, I want to enter a custom donation amount so that I can donate
  any value I choose.
- As a visitor, I want to see a PIX QR code for my chosen amount so that I can
  scan it with my banking app.
- As a visitor, I want to copy the "Copia e Cola" PIX string to my clipboard
  so that I can paste it into my banking app.
- As a visitor, I want clear validation errors if I enter an invalid amount
  so that I can fix it and proceed.

### Should Have (P1)

- As a visitor, I want a visual distinction between the QR code view and the
  "Copia e Cola" view so I can choose my preferred method.
- As a donor considering a large contribution (> R$ 10,000), I want to be
  directed to the contact form instead of being blocked, so that I can discuss
  the donation with the team.

---

## Functional Requirements

### FR-1: Donation Amount Selection

- System must display three suggested amount buttons: R$ 25, R$ 50, R$ 100
- System must provide a custom amount input field
- System must validate the custom input using Zod:
  - Minimum: R$ 5.00
  - Maximum: R$ 10,000.00
  - Must be a valid positive number (two decimal places allowed)
- System must display validation errors inline in Portuguese
- Selecting a suggested button must populate the custom input and generate the
  PIX code immediately
- Changing the custom input must regenerate the PIX code on valid input

### FR-2: PIX BR Code Generation

- System must generate a valid EMV QRCPS-MPM compliant PIX string client-side
- PIX key: `doar@podcodar.org` (email type)
- Required fields in the generated string:
  - `00` — Payload Format Indicator: `01`
  - `26` — Merchant Account Information:
    - `00` — GUI: `br.gov.bcb.pix`
    - `01` — PIX key: `doar@podcodar.org`
  - `52` — Merchant Category Code: `0000`
  - `53` — Transaction Currency: `986` (BRL)
  - `54` — Transaction Amount: user-selected value (when fixed amount)
  - `58` — Country Code: `BR`
  - `59` — Merchant Name: `PodCodar` (max 25 chars)
  - `60` — Merchant City: `Belo Horizonte` (max 15 chars)
  - `63` — CRC16-CCITT checksum over the full string (excluding the `6304` trailer)
- System must compute the CRC16-CCITT checksum per the PIX standard
- When no amount is selected or input is invalid, no PIX code must be generated

### FR-3: QR Code Display

- System must render a QR code from the generated PIX string using **inline SVG**
  (no external QR library — implement a minimal QR code SVG generator as a shared
  utility in `src/lib/qrcode.ts`)
- QR code must be scannable by Brazilian banking apps (PIX-compatible)
- QR code dimensions: minimum 200×200px, should scale on larger screens
- QR code must update immediately when the amount changes

### FR-4: Copia e Cola

- System must display a **truncated** preview of the PIX string (e.g., first
  40 characters + "…") with a toggle to reveal the full string
- System must provide a "Copiar" button that copies the full PIX string to the
  clipboard
- System must show visual feedback on successful copy (e.g., button text changes
  to "Copiado!" for 2 seconds)
- System must handle clipboard API unavailability gracefully (fallback:
  select text for manual copy)

### FR-5: Large Donations (> R$ 10,000)

- When the user enters an amount > R$ 10,000, system must:
  - Not generate a PIX code
  - Show a message directing the donor to contact the team
  - Provide a link to `/contact`
- The validation error for "amount too high" must differ from "invalid format"
  errors — it should be informative, not an error state

### FR-6: Section Layout

- The PIX donation section must be placed immediately after the hero on
  `/contributing`
- The section must be visually highlighted / prominent (distinct background or
  border treatment)
- The section must replace the current "Falar sobre doação" CTA that links
  to `/contact`
- Responsive layout: buttons in a row on desktop, stack on mobile

---

## Non-Functional Requirements

| Category      | Requirement                   | Target                      |
| ------------- | ----------------------------- | --------------------------- |
| Performance   | PIX code + QR generation time | < 100ms on user input       |
| Accessibility | Form inputs and buttons       | Keyboard navigable, labeled |
| Accessibility | QR code alt text              | Meaningful description      |
| i18n          | All strings                   | Via `useTranslations()`     |
| Bundle size   | Added JS (Alpine + QR + PIX)  | < 15 KB gzipped             |
| Browser       | Supported browsers            | Last 2 versions, modern     |

---

## Constraints

- **Technical:** Must work on Astro static site (SSG). No server-side state.
  Must use Alpine.js for interactivity and Zod v4 (via `astro/zod`) for
  validation.
- **Brand:** Must use PodCodar purple/violet color palette. Must match existing
  DaisyUI v5 component style.
- **Language:** All user-facing text in Portuguese (pt-BR) via the i18n system.
- **Dependencies to add:** `alpinejs` (`bun add alpinejs`). Zod is already
  available via `astro/zod` (bundled with Astro). QR code generation must use
  an inline SVG approach implemented as a shared utility (`src/lib/qrcode.ts`)
  — no external QR library.

---

## Dependencies

- **External:** None. PIX BR Code is generated client-side; no third-party API
  calls.
- **Internal:** The `/contact` page must remain available for the "contact us"
  fallback in FR-5. Existing `SectionHeader` and layout components from the
  codebase should be reused.

---

## Open Questions

_All resolved — no open questions remain._

- [x] QR code: Inline SVG, implemented as `src/lib/qrcode.ts` (zero dependencies)
- [x] Copia e Cola: Truncated preview with expand toggle
- [x] Donor name/txid: Anonymous/static — no donor identifier field
- [x] Home page: Contributing page only for v1

---

## Success Metrics

- **Completion rate:** Donors can generate a PIX code in under 30 seconds
- **Zero errors:** PIX QR codes generated by the page scan correctly in
  Itaú, Nubank, PicPay, and Mercado Pago apps
- **No regressions:** Existing contributing page sections (volunteering,
  partnerships) remain unchanged and functional
- **Accessibility:** All form elements pass keyboard navigation and screen
  reader checks

---

## Risks & Mitigations

| Risk                                        | Impact | Likelihood | Mitigation                                                  |
| ------------------------------------------- | ------ | ---------- | ----------------------------------------------------------- |
| PIX BR Code generation bugs (invalid QR)    | High   | Medium     | Test against multiple banking apps; validate CRC16          |
| Alpine.js conflicts with Astro island model | Medium | Low        | Use a single Astro island for the entire donation section   |
| Clipboard API unavailable on some browsers  | Low    | Low        | Fallback to `select()` + manual copy                        |
| Donors confused by too-large QR on mobile   | Medium | Low        | Responsive sizing; test on 375px viewport                   |
| `astro/zod` version incompatibility         | Low    | Low        | Zod v4 API surface is stable; if issues arise, pin explicit |
|                                             |        |            | zod version in package.json                                 |

---

## Appendix

### References

- [PIX BR Code Standard (BCB)](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_PIX/II-ManualdePadroesparaIniciacaodoPix.pdf)
- [EMV QRCPS-MPM Specification](https://www.emvco.com/emv-technologies/qrcodes/)
- [Issue #248](https://github.com/podcodar/webapp/issues/248)
- [Current `/contributing` page](src/pages/contributing.astro)
- [i18n strings](src/i18n/ui.ts) — `contributing.donations.*` namespace

### Test Cases

These are the canonical test cases for validation and PIX code correctness.

#### Amount Validation (Zod)

| Input      | Expected result                             |
| ---------- | ------------------------------------------- |
| `25`       | Valid, PIX code generated with R$ 25.00     |
| `50`       | Valid, PIX code generated with R$ 50.00     |
| `100`      | Valid, PIX code generated with R$ 100.00    |
| `5`        | Valid, PIX code generated with R$ 5.00      |
| `10000`    | Valid, PIX code generated with R$ 10,000.00 |
| `50.50`    | Valid, PIX code generated with R$ 50.50     |
| `4.99`     | Invalid — below minimum (R$ 5.00)           |
| `10000.01` | Invalid — contact us (> R$ 10,000)          |
| `0`        | Invalid — below minimum                     |
| `-10`      | Invalid — negative amount                   |
| `abc`      | Invalid — not a number                      |
| `1,000`    | Invalid — wrong decimal separator           |
| `50.999`   | Invalid — more than 2 decimal places        |
| (empty)    | Invalid — required field                    |

#### PIX BR Code Generation

| Scenario                      | Expected behavior                                    |
| ----------------------------- | ---------------------------------------------------- |
| Default amount (R$ 25 button) | Valid PIX string, QR renders, scan test passes       |
| Custom amount (R$ 50.50)      | Field `54` = `50.50`, CRC correct                    |
| No amount / invalid input     | No PIX code generated, no QR displayed               |
| Amount > R$ 10,000            | "Contact us" message, no PIX code                    |
| Key fields present            | `00`, `26.00`, `26.01`, `53`, `58`, `59`, `60`, `63` |
| CRC16 matches                 | Recompute CRC and verify against field `63`          |

#### QR Code

| Scenario                        | Expected behavior                                    |
| ------------------------------- | ---------------------------------------------------- |
| Valid PIX string                | QR renders as SVG, scannable                         |
| Banking app scan (Nubank)       | Recognizes PIX, shows correct amount and recipient   |
| Banking app scan (Itaú)         | Recognizes PIX, shows correct amount and recipient   |
| Banking app scan (PicPay)       | Recognizes PIX, shows correct amount and recipient   |
| Banking app scan (Mercado Pago) | Recognizes PIX, shows correct amount and recipient   |
| Amount change                   | QR updates immediately without page reload           |
| Dark mode                       | QR has sufficient contrast (light background/border) |

#### Copia e Cola

| Scenario                  | Expected behavior                                   |
| ------------------------- | --------------------------------------------------- |
| Click "Copiar"            | Full PIX string copied to clipboard                 |
| After copy                | Button shows "Copiado!" for 2 seconds, then reverts |
| Truncated preview         | Shows first ~40 chars + "…" + expand toggle         |
| Expand toggle             | Reveals full PIX string                             |
| Clipboard API unavailable | Falls back to text selection for manual copy        |

#### Section Layout

| Scenario                     | Expected behavior                                       |
| ---------------------------- | ------------------------------------------------------- |
| Desktop viewport (≥1024px)   | Amount buttons in a row, QR + Copia e Cola side by side |
| Mobile viewport (375px)      | Buttons stack vertically, QR + Copia e Cola stack       |
| No JS (graceful degradation) | Section shows static message + link to `/contact`       |

### Glossary

- **PIX:** Brazilian instant payment system operated by the Central Bank of
  Brazil (BCB)
- **PIX BR Code / "Copia e Cola":** A standardized string format (EMV
  QRCPS-MPM) encoding PIX payment details that can be rendered as a QR code
  or pasted directly into banking apps
- **CRC16-CCITT:** A 16-bit checksum algorithm (polynomial `0x1021`) used as
  the error-detection trailer in PIX BR Code strings
- **Alpine.js:** A lightweight JavaScript framework for adding interactivity
  to HTML via declarative `x-*` attributes (similar spirit to htmx but
  component-oriented)
