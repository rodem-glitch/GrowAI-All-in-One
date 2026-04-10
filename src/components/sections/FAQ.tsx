import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          {t.faq.title}
        </h2>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4">
          {t.faq.subtitle}
        </p>

        <ul className="mt-12 space-y-4">
          {t.faq.items.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <li
                key={index}
                className="border border-[#d7dadb] dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full p-6 flex justify-between items-center text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-medium text-[#242727] dark:text-white">
                    {faq.q}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 ml-4 text-[#555c5d] dark:text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 text-[#555c5d] dark:text-gray-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
