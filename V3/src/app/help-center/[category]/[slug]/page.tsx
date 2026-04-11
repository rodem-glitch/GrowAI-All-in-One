import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ArticleContent from "./ArticleContent";
import {
  HELP_CATEGORIES,
  HELP_ARTICLES,
  getArticle,
  getCategoryBySlug,
} from "@/data/help-articles";

export function generateStaticParams() {
  return HELP_ARTICLES.map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  return {
    title: `${article?.title ?? "Article"} | GrowAI Help Center`,
    description: article?.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cat = getCategoryBySlug(category);
  const article = getArticle(category, slug);

  if (!cat || !article) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-24 px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            아티클을 찾을 수 없습니다
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
        <ArticleContent category={cat} article={article} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
