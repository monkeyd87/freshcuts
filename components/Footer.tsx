import Link from "next/link";

type FooterLink = { label: string; href: string };

type FooterProps = {
  brand?: {
    name: string;
    tagline: string;
    href?: string;
  };
  productLinks?: FooterLink[];
  companyLinks?: FooterLink[];
  app?: {
    title: string;
    iosHref?: string;
    androidHref?: string;
  };
};

const defaultProps: Required<FooterProps> = {
  brand: {
    name: "BarberAI",
    tagline: "Revolutionizing the grooming\nindustry one cut at a time.",
    href: "/",
  },
  productLinks: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "AI Preview", href: "/ai-preview" },
    { label: "For Barbers", href: "/for-barbers" },
  ],
  companyLinks: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  app: {
    title: "Get the App",
    iosHref: "#",
    androidHref: "#",
  },
};

function BrandIcon({ className = "" }: { className?: string }) {
  // Simple “scissor-like” mark (SVG) in the same spirit as the screenshot
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.2 6.7a2.7 2.7 0 1 1 3.8 3.8L6.2 6.7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6.2 17.3a2.7 2.7 0 1 0 3.8-3.8l-3.8 3.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.5 20 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 13.5 20 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AppleBadge() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
        <span className="text-xs font-semibold tracking-wide text-slate-200">
          iOS
        </span>
      </div>
      <div className="leading-tight">
        <div className="text-xs text-slate-400">Download on the</div>
        <div className="text-base font-semibold text-slate-100">App Store</div>
      </div>
    </div>
  );
}

function GoogleBadge() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
        {/* tiny android-ish glyph */}
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-200">
          <path
            fill="currentColor"
            d="M7 9c0-2.2 2.5-4 5-4s5 1.8 5 4v7H7V9Zm3.2-5.2.8.8-1.2 1.2-.8-.8 1.2-1.2Zm4.8 0 1.2 1.2-.8.8-1.2-1.2.8-.8ZM9 17h2v2H9v-2Zm4 0h2v2h-2v-2Z"
          />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="text-xs text-slate-400">GET IT ON</div>
        <div className="text-base font-semibold text-slate-100">Google Play</div>
      </div>
    </div>
  );
}

function StoreButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={[
        "block w-full max-w-sm rounded-2xl p-4",
        "bg-slate-900/35 backdrop-blur",
        "ring-1 ring-white/10",
        "shadow-[0_10px_25px_rgba(0,0,0,0.35)]",
        "transition hover:ring-white/20 hover:bg-slate-900/45",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

export default function Footer(props: FooterProps) {
  const brand = props.brand ?? defaultProps.brand;
  const productLinks = props.productLinks ?? defaultProps.productLinks;
  const companyLinks = props.companyLinks ?? defaultProps.companyLinks;
  const app = props.app ?? defaultProps.app;

  return (
    <footer className="relative overflow-hidden bg-slate-950">
      {/* subtle top glow like the screenshot */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              href={brand.href ?? "/"}
              className="inline-flex items-center gap-3"
            >
              <BrandIcon className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-semibold text-slate-100">
                {brand.name}
              </span>
            </Link>

            <p className="mt-6 max-w-sm whitespace-pre-line text-lg leading-relaxed text-slate-500">
              {brand.tagline}
            </p>
          </div>

          {/* Product */}
          <div className="md:col-span-3 md:col-start-6">
            <h3 className="text-xl font-semibold text-slate-100">Product</h3>
            <ul className="mt-6 space-y-4 text-lg">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-slate-500 transition hover:text-slate-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-semibold text-slate-100">Company</h3>
            <ul className="mt-6 space-y-4 text-lg">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-slate-500 transition hover:text-slate-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get the App */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-slate-100">
              {app.title}
            </h3>

            <div className="mt-6 space-y-5">
              <StoreButton href={app.iosHref ?? "#"}>
                <AppleBadge />
              </StoreButton>

              <StoreButton href={app.androidHref ?? "#"}>
                <GoogleBadge />
              </StoreButton>
            </div>
          </div>
        </div>

        {/* bottom spacing line like a clean footer edge */}
        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-slate-500">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
