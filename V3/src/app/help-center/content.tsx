"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { HELP_CATEGORIES, HELP_ARTICLES } from "@/data/help-articles";
import {
  Search,
  Flame,
  Sparkles,
  CreditCard,
  Clapperboard,
  Link as LinkIcon,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  flame: Flame,
  sparkles: Sparkles,
  "credit-card": CreditCard,
  clapperboard: Clapperboard,
  link: LinkIcon,
  wrench: Wrench,
};

export default function HelpCenterContent() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");

  const filtered =
    query.length >= 2
      ? HELP_ARTICLES.filter(
          (a) =>
            a.title.toLowerCase().includes(query.toLowerCase()) ||
            a.summary.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 8)
      : [];

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          Help Center
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center mt-3">
          GrowAI를 더 효과적으로 사용하는 방법을 찾아보세요
        </p>

        {/* Search */}
        <div className="mt-8 relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2"
            style={{ ["--tw-ring-color" as string]: colors.primary }}
          />
          {filtered.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-20 max-h-[300px] overflow-y-auto">
              {filtered.map((a) => (
                <Link
                  key={`${a.category}-${a.slug}`}
                  href={`/help-center/${a.category}/${a.slug}`}
                  className="flex flex-col px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-800 last:border-0"
                  onClick={() => setQuery("")}
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {a.title}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {a.summary}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {HELP_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon];
            return (
              <Link key={cat.slug} href={`/help-center/${cat.slug}`}>
                <Card className="rounded-2xl border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow p-0 h-full">
                  <CardContent className="p-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${colors.primary}1a` }}
                    >
                      {Icon && (
                        <Icon
                          className="w-5 h-5"
                          style={{ color: colors.primary }}
                          strokeWidth={1.8}
                        />
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {cat.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {cat.desc}
                    </p>
                    <p
                      className="text-xs mt-3 font-medium"
                      style={{ color: colors.primary }}
                    >
                      {cat.articleCount} articles
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
