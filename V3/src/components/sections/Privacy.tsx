"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const icons = [
  (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  ),
  (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 text-green-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  ),
  (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 text-purple-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75"
      />
    </svg>
  ),
];

const iconBgClasses = [
  "bg-blue-100 dark:bg-blue-900/50",
  "bg-green-100 dark:bg-green-900/50",
  "bg-purple-100 dark:bg-purple-900/50",
];

export default function Privacy() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          {t.privacy.title}
        </h2>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4">
          {t.privacy.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {t.privacy.items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${iconBgClasses[i]}`}
              >
                {icons[i]}
              </div>
              <h3 className="text-xl font-semibold text-[#242727] dark:text-white mt-6">
                {item.title}
              </h3>
              <p className="text-[#555c5d] dark:text-gray-400 mt-3 max-w-xs mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#"
          className="text-center mt-12 block hover:underline font-medium"
          style={{ color: colors.primary }}
        >
          {t.privacy.learnMore}
        </a>
      </div>
    </section>
  );
}
