"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { HelpCategory, HelpArticle } from "@/data/help-articles";
import {
  ArrowLeft, Clock, ChevronRight,
  Flame, Sparkles, CreditCard, Clapperboard, Link as LinkIcon, Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  flame: Flame, sparkles: Sparkles, "credit-card": CreditCard,
  clapperboard: Clapperboard, link: LinkIcon, wrench: Wrench,
};

export default function CategoryContent({
  category,
  articles,
}: {
  category: HelpCategory;
  articles: HelpArticle[];
}) {
  const { colors } = useTheme();

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <Link
          href="/help-center"
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Help Center
        </Link>

        <div className="flex items-center gap-3 mb-2">
          {(() => { const Icon = ICON_MAP[category.icon]; return Icon ? (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${colors.primary}1a` }}>
              <Icon className="w-5 h-5" style={{ color: colors.primary }} strokeWidth={1.8} />
            </div>
          ) : null; })()}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {category.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {category.desc} · {articles.length} articles
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/help-center/${category.slug}/${article.slug}`}
            >
              <Card className="rounded-xl border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow p-0">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                      {article.summary}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                      <span className="text-xs text-gray-500">
                        Updated {article.updatedAt}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
