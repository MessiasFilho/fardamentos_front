/**
 * Classes Tailwind — tokens Mintlify em assets/css/main.css + DESIGN.md
 */
export function useSiteUi() {
  const container = 'mx-auto w-full max-w-(--container-max) px-lg md:px-xl'

  const eyebrow =
    'text-micro-cap font-semibold uppercase tracking-wide text-steel'

  const pillSoft =
    'inline-flex rounded-full bg-brand-green-soft px-sm py-xs text-micro-cap font-semibold uppercase tracking-wide text-ink'

  const btnPrimary =
    'inline-flex min-h-10 items-center justify-center gap-sm rounded-full bg-primary px-5 py-2.5 text-button-md font-medium text-on-primary no-underline transition-colors hover:bg-charcoal active:bg-primary-press'

  const btnAccent =
    'inline-flex min-h-10 items-center justify-center gap-sm rounded-full bg-brand-green px-5 py-2.5 text-button-md font-medium text-primary no-underline transition-colors hover:bg-brand-green-deep'

  const btnSecondary =
    'inline-flex min-h-10 items-center justify-center gap-sm rounded-full border border-hairline bg-transparent px-5 py-2.5 text-button-md font-medium text-ink no-underline transition-colors hover:bg-surface'

  const btnOnDark =
    'inline-flex min-h-10 items-center justify-center gap-sm rounded-full bg-on-dark px-5 py-2.5 text-button-md font-medium text-primary no-underline transition-colors hover:bg-white/90'

  const btnSecondaryOnDark =
    'inline-flex min-h-10 items-center justify-center gap-sm rounded-full border border-white/35 bg-transparent px-5 py-2.5 text-button-md font-medium text-on-dark no-underline transition-colors hover:bg-white/10'

  const navLink =
    'rounded-full px-md py-sm text-body-sm font-medium text-steel no-underline transition-colors hover:bg-surface hover:text-ink'

  const footerLink =
    'text-body-sm font-normal text-steel no-underline transition-colors hover:text-ink'

  const heroSky = 'hero-band-sky'

  const cardBase =
    'rounded-lg border border-hairline bg-canvas p-xl shadow-[var(--shadow-subtle)]'

  const cardFeature =
    'rounded-lg border border-hairline bg-surface p-xxl'

  const cardHelp =
    'rounded-lg border border-hairline bg-canvas p-xl shadow-[var(--shadow-subtle)]'

  const formLabel = 'mb-xs block text-caption font-normal text-steel'

  const formInput =
    'w-full min-h-10 rounded-md border border-hairline bg-canvas px-md py-sm text-body-md text-ink outline-none transition-[border-color,box-shadow] placeholder:text-stone focus:border-brand-green focus:ring-[3px] focus:ring-brand-green/15 disabled:cursor-not-allowed disabled:opacity-50'

  const formTextarea =
    'w-full min-h-[140px] resize-none rounded-md border border-hairline bg-canvas px-md py-md text-body-md text-ink outline-none transition-[border-color,box-shadow] placeholder:text-stone focus:border-brand-green focus:ring-[3px] focus:ring-brand-green/15 disabled:cursor-not-allowed disabled:opacity-50'

  const formSectionTitle =
    'mb-md text-micro-cap font-semibold uppercase tracking-wide text-steel'

  const alertError =
    'rounded-md border border-brand-error/25 bg-brand-error/5 px-md py-sm text-body-md text-brand-error'

  const alertSuccess =
    'rounded-md border border-brand-green/30 bg-brand-green-soft px-md py-sm text-body-md text-ink'

  const radioPillBase =
    'inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border px-lg py-sm text-body-md transition-colors has-focus-visible:ring-2 has-focus-visible:ring-brand-green has-focus-visible:ring-offset-2'

  const radioPillIdle =
    'border-hairline bg-canvas text-steel hover:border-brand-green/50 hover:text-ink'

  const radioPillActive =
    'border-brand-green bg-brand-green-soft font-medium text-ink'

  return {
    container,
    eyebrow,
    pillSoft,
    btnPrimary,
    btnAccent,
    btnSecondary,
    btnOnDark,
    btnSecondaryOnDark,
    navLink,
    footerLink,
    heroSky,
    cardBase,
    cardFeature,
    cardHelp,
    formLabel,
    formInput,
    formTextarea,
    formSectionTitle,
    alertError,
    alertSuccess,
    radioPillBase,
    radioPillIdle,
    radioPillActive,
  }
}
