import * as React from "react";

export type PricingBenefit = {
  text: string;
  included?: boolean; // default true
};

export type PricingCardProps = {
  tierLabel?: string; // e.g. "Pay as you go" / "Membership" / "Unlimited"
  planName?: string; // e.g. "Standard"
  price?: string; // e.g. "$29"
  priceSuffix?: string; // e.g. "/mo"
  subtitle?: string; // e.g. "Plus cost of haircuts"
  benefits?: PricingBenefit[];

  // highlight styles (middle card)
  mostPopular?: boolean;
  accent?: "blue" | "purple" | "green"; // optional theme switcher

  // button
  buttonText?: string;
  href?: string; // if provided, renders <a>
  onClick?: () => void; // if provided, renders <button>
  disabled?: boolean;
};

const accentMap = {
  blue: {
    ring: "ring-blue-500/70",
    badge: "bg-blue-500 text-white",
    check: "text-blue-400",
    button: "bg-blue-600 hover:bg-blue-500",
  },
  purple: {
    ring: "ring-purple-500/70",
    badge: "bg-purple-500 text-white",
    check: "text-purple-400",
    button: "bg-purple-600 hover:bg-purple-500",
  },
  green: {
    ring: "ring-emerald-500/70",
    badge: "bg-emerald-500 text-white",
    check: "text-emerald-400",
    button: "bg-emerald-600 hover:bg-emerald-500",
  },
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PricingCard({
  tierLabel,
  planName,
  price,
  priceSuffix = "",
  subtitle,
  benefits,
  mostPopular = false,
  accent = "blue",
  buttonText,
  href,
  onClick,
  disabled = false,
}: PricingCardProps) {
  const a = accentMap[accent];

  const CardButton = () => {
    const base =
      "mt-10 w-full rounded-xl px-5 py-4 text-center text-base font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed";

    if (href) {
      return (
        <a
          href={href}
          className={`${base} ${a.button}`}
          aria-disabled={disabled ? "true" : "false"}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
        >
          {buttonText}
        </a>
      );
    }

    return (
      <button
        type="button"
        className={`${base} ${a.button}`}
        onClick={onClick}
        disabled={disabled}
      >
        {buttonText}
      </button>
    );
  };

  return (
    <div
      className={[
        "relative h-full rounded-3xl bg-slate-900/40 px-12 py-8  text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur",
        "ring-1 ring-white/10",
        mostPopular ? `ring-2 ${a.ring}` : "",
      ].join(" ")}
    >
      {mostPopular && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div
            className={[
              "rounded-full px-4 py-1 text-xs font-bold tracking-widest",
              a.badge,
            ].join(" ")}
          >
            MOST POPULAR
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="text-sm font-medium text-slate-300">{tierLabel}</div>

        <div className="text-5xl font-extrabold tracking-tight">
          {planName}
        </div>

        <div className="pt-3">
          <div className="flex items-baseline gap-2">
            <div className="text-5xl font-extrabold">{price}</div>
            {priceSuffix ? (
              <div className="text-xl font-medium text-slate-300">
                {priceSuffix}
              </div>
            ) : null}
          </div>
          {subtitle ? (
            <div className="mt-2 text-base text-slate-400">{subtitle}</div>
          ) : null}
        </div>
      </div>

      <ul className="mt-10 space-y-5">
        {benefits&&benefits.map((b, idx) => {
          const included = b.included ?? true;
          return (
            <li key={idx} className="flex items-start gap-3">
              <CheckIcon
                className={[
                  "mt-0.5 shrink-0",
                  included ? a.check : "text-slate-600",
                ].join(" ")}
              />
              <span className={included ? "text-slate-100" : "text-slate-500"}>
                {b.text}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-12">
        <CardButton />
      </div>
    </div>
  );
}
