import { useLanguage } from "../../contexts/LanguageContext";

const avatarData = [
  { gradient: "from-cyan-400 to-blue-500", initials: "SK" },
  { gradient: "from-violet-400 to-purple-500", initials: "JM" },
  { gradient: "from-emerald-400 to-teal-500", initials: "MP" },
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-[#fbfbfb] dark:bg-gray-900">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          {t.testimonials.title}
        </h2>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4">
          {t.testimonials.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {t.testimonials.items.map(
            (
              item: { quote: string; name: string; role: string },
              i: number
            ) => (
              <div
                key={item.name}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-[#d7dadb] dark:border-gray-700"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[#303436] dark:text-gray-300 mt-4 leading-relaxed">
                  {item.quote}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarData[i].gradient} flex items-center justify-center`}
                  >
                    <span className="text-white font-semibold text-sm">
                      {avatarData[i].initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#242727] dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#555c5d] dark:text-gray-400">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
