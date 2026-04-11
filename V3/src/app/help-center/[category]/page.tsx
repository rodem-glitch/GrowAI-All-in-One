import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CategoryContent from "./CategoryContent";
import { HELP_CATEGORIES, getArticlesByCategory } from "@/data/help-articles";

export function generateStaticParams() {
  return HELP_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = HELP_CATEGORIES.find((c) => c.slug === category);
  return {
    title: `${cat?.title ?? "Help"} | GrowAI Help Center`,
    description: cat?.desc,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = HELP_CATEGORIES.find((c) => c.slug === category);
  const articles = getArticlesByCategory(category);

  if (!cat) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-24 px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            카테고리를 찾을 수 없습니다
          </h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <CategoryContent category={cat} articles={articles} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
