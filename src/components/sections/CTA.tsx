
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function CTA() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6 bg-[#242728] dark:bg-[#0a0b0c]">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          {t.cta.title}
        </h2>
        <p className="text-lg text-gray-400 mt-4">
          {t.cta.subtitle}
        </p>
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <button
            className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            style={{ borderColor: colors.primary, color: colors.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${colors.primary}1a`)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {t.cta.download}
          </button>
          <button
            className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            style={{ borderColor: colors.primary, color: colors.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${colors.primary}1a`)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {t.cta.tryFree}
          </button>
        </div>
      </div>
    </section>
  );
}
