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
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          {t.faq.title}
        </h2>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4">
          {t.faq.subtitle}
        </p>

        <Accordion className="mt-12">
          {t.faq.items.map((faq, index) => (
            <AccordionItem
              key={index}
              className="border border-[#d7dadb] dark:border-gray-700 rounded-xl overflow-hidden mb-4 last:mb-0"
            >
              <AccordionTrigger className="w-full p-6 text-lg font-medium text-[#242727] dark:text-white">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-[#555c5d] dark:text-gray-400 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
