import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

const gradients = [
  "from-blue-100 to-cyan-50",
  "from-purple-100 to-pink-50",
  "from-green-100 to-emerald-50",
  "from-orange-100 to-yellow-50",
];

export default function Features() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          {t.features.title}
        </h2>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4 max-w-2xl mx-auto">
          {t.features.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {t.features.items.map((item, i) => (
            <div
              key={item.title}
              className="border border-[#d7dadb] dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow dark:bg-gray-800"
            >
              <div
                className={`h-48 bg-gradient-to-br ${gradients[i]} dark:opacity-80 rounded-xl mb-4`}
              />
              <h3 className="text-lg font-semibold text-[#242727] dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-2">
                {item.desc}
              </p>
              <a
                href="#"
                className="text-sm mt-3 inline-block hover:underline"
                style={{ color: colors.primary }}
              >
                {t.features.learnMore}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
