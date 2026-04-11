"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          {t.faq.title}
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center mt-4">
          {t.faq.subtitle}
        </p>

        <Accordion className="mt-12">
          {t.faq.items.map((faq, index) => (
            <AccordionItem
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-4 last:mb-0"
            >
              <AccordionTrigger className="w-full p-6 text-lg font-medium text-gray-900 dark:text-white">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-500 dark:text-gray-400 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
