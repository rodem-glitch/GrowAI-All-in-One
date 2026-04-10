import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

const CheckIcon = ({ color }: { color: string }) => (
  <svg
    className="w-4 h-4 flex-shrink-0 mt-0.5"
    style={{ color }}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

interface PlanData {
  monthlyPrice: string;
  annualPrice: string;
  recommended: boolean;
  buttonVariant: "outlined" | "solid";
}

const planData: PlanData[] = [
  {
    monthlyPrice: "$0",
    annualPrice: "$0",
    recommended: false,
    buttonVariant: "outlined",
  },
  {
    monthlyPrice: "$9.99",
    annualPrice: "$7.99",
    recommended: false,
    buttonVariant: "outlined",
  },
  {
    monthlyPrice: "$24.99",
    annualPrice: "$19.99",
    recommended: true,
    buttonVariant: "solid",
  },
  {
    monthlyPrice: "$59.99",
    annualPrice: "$47.99",
    recommended: false,
    buttonVariant: "outlined",
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6 bg-[#fbfbfb] dark:bg-gray-900">
      <div className="max-w-[1200px] mx-auto">
        {/* Section title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          {t.pricing.title}
        </h2>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <span
            className={`text-sm font-medium ${
              !isAnnual
                ? "text-[#242727] dark:text-white"
                : "text-[#555c5d] dark:text-gray-400"
            }`}
          >
            {t.pricing.monthly}
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual((prev) => !prev)}
            className="relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: colors.primary,
              // @ts-expect-error CSS custom property
              "--tw-ring-color": colors.primary,
            }}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>

          <span
            className={`text-sm font-medium ${
              isAnnual
                ? "text-[#242727] dark:text-white"
                : "text-[#555c5d] dark:text-gray-400"
            }`}
          >
            {t.pricing.annual}
          </span>

          <span
            className="text-xs px-2 py-1 rounded-full font-medium"
            style={{
              backgroundColor: `${colors.primary}1a`,
              color: colors.primary,
            }}
          >
            {t.pricing.save}
          </span>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {planData.map((plan, i) => {
            const translated = t.pricing.plans[i];
            return (
              <div
                key={translated.name}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-8 flex flex-col ${
                  plan.recommended
                    ? "shadow-xl relative dark:border-gray-700"
                    : "border border-[#d7dadb] dark:border-gray-700"
                }`}
                style={
                  plan.recommended
                    ? { border: `2px solid ${colors.primary}` }
                    : undefined
                }
              >
                {/* Recommended badge */}
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className="text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {t.pricing.recommended}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <p className="text-lg font-semibold text-[#242727] dark:text-white">
                  {translated.name}
                </p>

                {/* Price */}
                <p className="text-4xl font-bold text-[#242727] dark:text-white mt-4">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </p>
                <p className="text-sm text-[#555c5d] dark:text-gray-400">
                  {t.pricing.perMonth}
                </p>

                {/* Description */}
                <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-2">
                  {translated.desc}
                </p>

                {/* CTA button */}
                {plan.buttonVariant === "solid" ? (
                  <button
                    type="button"
                    className="w-full py-3 rounded-lg mt-6 font-semibold border-2 transition-colors duration-200"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = `${colors.primary}1a`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    {t.pricing.getStarted}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full py-3 rounded-lg mt-6 font-semibold border-2 transition-colors duration-200"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = `${colors.primary}1a`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    {t.pricing.getStarted}
                  </button>
                )}

                {/* Feature list */}
                <ul className="mt-8 space-y-3">
                  {translated.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckIcon color={colors.primary} />
                      <span className="text-sm text-[#555c5d] dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
