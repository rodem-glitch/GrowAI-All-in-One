import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function Hero() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <section className="w-full text-center pt-32 pb-20 px-4 dark:bg-[#0f1112]">
      <div className="max-w-5xl mx-auto">
        {/* Main Heading */}
        <h1
          className="text-6xl md:text-7xl lg:text-[88px] font-bold text-[#242727] dark:text-white leading-tight"
        >
          {t.hero.title1}
          <br />
          {t.hero.title2}
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#555c5d] dark:text-gray-400 mt-6 max-w-2xl mx-auto whitespace-pre-line">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <a
            href="#"
            className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            style={{
              borderColor: colors.primary,
              color: colors.primary,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                `${colors.primary}1a`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "transparent";
            }}
          >
            {t.hero.download}
          </a>
          <a
            href="#"
            className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            style={{
              borderColor: colors.primary,
              color: colors.primary,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                `${colors.primary}1a`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "transparent";
            }}
          >
            {t.hero.tryFree}
          </a>
        </div>

        {/* Trust Line */}
        <p className="text-sm text-[#555c5d] dark:text-gray-500 mt-4">
          {t.hero.noCreditCard}
        </p>

        {/* Partner Logos */}
        <div className="flex gap-8 mt-8 justify-center flex-wrap">
          {["SparkLabs", "Bon Angels", "FuturePlay", "Primer", "Korea Investment Partners"].map((name) => (
            <div
              key={name}
              className="border-2 text-sm font-semibold px-6 py-3 rounded-lg flex items-center justify-center min-w-[120px] transition-colors duration-200"
              style={{ borderColor: "#1a5276", color: "#0c2d48", backgroundColor: "rgba(30, 100, 160, 0.08)" }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* Hero Image / Video Placeholder */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-[#14a1c8]/20 to-[#107f9e]/10 dark:from-[#14a1c8]/10 dark:to-[#107f9e]/5 h-[400px] flex items-center justify-center">
          {/* Play Icon */}
          <button
            aria-label="Play video"
            className="w-20 h-20 rounded-full bg-white/80 dark:bg-white/60 flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-white/80 transition-colors duration-200 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 translate-x-0.5 transition-colors duration-200"
              style={{ color: colors.primary }}
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
