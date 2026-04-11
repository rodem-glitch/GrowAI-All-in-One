"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const gradients = ["from-cyan-50 to-blue-100", "from-purple-50 to-violet-100", "from-green-50 to-emerald-100"];

export default function Workflow() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          {t.workflow.title}
        </h2>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4">
          {t.workflow.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {t.workflow.steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Step number circle with connecting line */}
              <div className="relative w-full flex items-center justify-center">
                {/* Left connecting line */}
                {index > 0 && (
                  <div className="hidden md:block absolute right-1/2 top-6 w-1/2 border-t-2 border-dashed border-[#14a1c8]/40 dark:border-gray-600" />
                )}
                {/* Right connecting line */}
                {index < t.workflow.steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 top-6 w-1/2 border-t-2 border-dashed border-[#14a1c8]/40 dark:border-gray-600" />
                )}

                <div
                  className="w-12 h-12 rounded-full text-white flex items-center justify-center text-xl font-bold mx-auto relative z-10"
                  style={{ backgroundColor: colors.primary }}
                >
                  {index + 1}
                </div>
              </div>

              {/* Step image placeholder */}
              <div
                className={`mt-6 h-48 rounded-xl mx-auto max-w-[280px] w-full bg-gradient-to-br ${gradients[index % gradients.length]}`}
              />

              {/* Step title */}
              <h3 className="text-xl font-semibold text-[#242727] dark:text-white mt-6 text-center">
                {step.title}
              </h3>

              {/* Step description */}
              <p className="text-[#555c5d] dark:text-gray-400 mt-2 text-center max-w-xs mx-auto whitespace-pre-line">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
