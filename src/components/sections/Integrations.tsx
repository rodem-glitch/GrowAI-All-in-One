import { useLanguage } from "../../contexts/LanguageContext";

export default function Integrations() {
  const { t } = useLanguage();
  return (
    <section className="py-16 px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-[#555c5d] dark:text-gray-500 font-medium">
          {t.integrations.title}
        </p>
        <div className="mt-8 flex justify-center items-center">
          <div className="text-2xl font-bold text-[#242727] dark:text-gray-300">
            Korea Polytechnics
          </div>
        </div>
        <div className="mt-16 border-t border-[#d7dadb] dark:border-gray-700" />
      </div>
    </section>
  );
}
