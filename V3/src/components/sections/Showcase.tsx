"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Showcase() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          {t.showcase.title}
        </h2>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4">
          {t.showcase.subtitle}
        </p>

        {/* Video placeholder */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div
            className="aspect-video rounded-2xl relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primaryDark}), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.06) 39px, rgba(255,255,255,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.06) 39px, rgba(255,255,255,0.06) 40px)`,
            }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.06) 39px, rgba(255,255,255,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.06) 39px, rgba(255,255,255,0.06) 40px)",
              }}
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                aria-label={t.showcase.playLabel}
                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={colors.primaryDark}
                  className="w-8 h-8 translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 md:gap-20 mt-12">
          {t.showcase.stats.map(({ number, label }, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#242727] dark:text-white">{number}</span>
              <span className="text-sm text-[#555c5d] dark:text-gray-400 mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
