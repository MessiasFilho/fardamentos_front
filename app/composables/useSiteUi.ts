/**
 * Classes Tailwind reutilizáveis — tokens em assets/css/main.css + DESIGN.md
 * Evite max-w-xl / max-w-2xl: com --spacing-* no tema viram 24px/32px e quebram o texto.
 * Use max-w-copy, max-w-section, max-w-narrow, max-w-card.
 */
export function useSiteUi() {
  const container =
    'mx-auto w-full max-w-(--container-max) px-lg md:px-xl'

  const eyebrow =
    'text-micro-cap font-normal uppercase tracking-wide text-ink-mute'

  const pillSoft =
    'inline-flex rounded-full bg-primary-bg-subdued px-sm py-xs text-micro-cap font-normal uppercase tracking-wide text-primary-deep'

  const btnPrimary =
    'inline-flex min-h-10 items-center justify-center gap-sm rounded-full bg-primary px-lg py-sm text-base font-normal text-on-primary no-underline transition-colors hover:bg-primary-deep active:bg-primary-press'

  const btnSecondary =
    'inline-flex min-h-10 items-center justify-center gap-sm rounded-full border border-primary bg-canvas px-lg py-sm text-base font-normal text-primary no-underline transition-colors hover:bg-primary-bg-subdued'

  const btnSecondaryOnDark =
    'inline-flex min-h-10 items-center justify-center gap-sm rounded-full border border-white/40 bg-transparent px-lg py-sm text-base font-normal text-white no-underline transition-colors hover:bg-white/10'

  const navLink =
    'rounded-full px-md py-sm text-body-md font-light text-ink-mute-2 no-underline transition-colors hover:bg-canvas-soft hover:text-ink'

  const footerLink =
    'text-body-md font-normal text-primary no-underline transition-colors hover:text-primary-deep'

  const meshHero =
    '[background:radial-gradient(ellipse_90%_70%_at_5%_15%,#f5e9d4_0%,transparent_55%),radial-gradient(ellipse_75%_55%_at_35%_25%,#ffb86c_0%,transparent_50%),radial-gradient(ellipse_70%_60%_at_65%_20%,#c4b5fd_0%,transparent_52%),radial-gradient(ellipse_80%_65%_at_95%_35%,#533afd_0%,transparent_45%),radial-gradient(ellipse_55%_45%_at_55%_45%,#ea2261_0%,transparent_40%),radial-gradient(ellipse_50%_40%_at_80%_55%,#f96bee_0%,transparent_38%),linear-gradient(180deg,transparent_0%,#ffffff_72%)]'

  const cardFeature =
    'rounded-lg border border-hairline bg-canvas p-xxl shadow-1'

  const formLabel =
    'mb-xs block text-caption font-normal text-ink-mute'

  const formInput =
    'w-full min-h-10 rounded-sm border border-hairline-input bg-canvas px-md py-sm text-body-md text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-mute focus:border-primary focus:ring-[3px] focus:ring-primary/12 disabled:cursor-not-allowed disabled:opacity-50'

  const formTextarea =
    'w-full min-h-[140px] resize-none rounded-sm border border-hairline-input bg-canvas px-md py-md text-body-md text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-mute focus:border-primary focus:ring-[3px] focus:ring-primary/12 disabled:cursor-not-allowed disabled:opacity-50'

  const formSectionTitle =
    'mb-md text-micro-cap font-normal uppercase tracking-wide text-ink-mute'

  const alertError =
    'rounded-md border border-ruby/25 bg-ruby/5 px-md py-sm text-body-md text-ruby'

  const alertSuccess =
    'rounded-md border border-primary/20 bg-primary-bg-subdued px-md py-sm text-body-md text-primary-deep'

  const radioPillBase =
    'inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border px-lg py-sm text-body-md transition-colors has-focus-visible:ring-2 has-focus-visible:ring-primary has-focus-visible:ring-offset-2'

  const radioPillIdle =
    'border-hairline bg-canvas text-ink-mute-2 hover:border-primary-soft hover:text-ink'

  const radioPillActive =
    'border-primary bg-primary-bg-subdued font-normal text-primary-deep'

  return {
    container,
    eyebrow,
    pillSoft,
    btnPrimary,
    btnSecondary,
    btnSecondaryOnDark,
    navLink,
    footerLink,
    meshHero,
    cardFeature,
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
