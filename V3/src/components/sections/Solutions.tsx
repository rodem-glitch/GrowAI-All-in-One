"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";

const gradients = [
  "bg-gradient-to-br from-cyan-400 to-blue-500",
  "bg-gradient-to-br from-violet-400 to-purple-500",
  "bg-gradient-to-br from-emerald-400 to-teal-500",
];

export default function Solutions() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6 bg-[#fbfbfb] dark:bg-gray-900">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          {t.solutions.title}
        </h2>
        <p className="text-lg text-gray-500 text-center mt-4 dark:text-gray-400">
          {t.solutions.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {t.solutions.items.map(
            (item: { title: string; desc: string }, i: number) => (
              <Card
                key={item.title}
                className="rounded-2xl overflow-hidden border-gray-200 hover:shadow-xl transition-shadow dark:border-gray-800 p-0 gap-0"
              >
                <div className={`h-56 ${gradients[i % gradients.length]}`} />
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 mt-3 leading-relaxed dark:text-gray-400">
                    {item.desc}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-block font-medium hover:underline"
                    style={{ color: colors.primary }}
                  >
                    {t.solutions.learnMore}
                  </a>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}
