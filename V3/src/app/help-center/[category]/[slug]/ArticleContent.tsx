"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import type { HelpCategory, HelpArticle } from "@/data/help-articles";
import {
  ArrowLeft, Clock, Download, Printer,
  Flame, Sparkles, CreditCard, Clapperboard, Link as LinkIcon, Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  flame: Flame, sparkles: Sparkles, "credit-card": CreditCard,
  clapperboard: Clapperboard, link: LinkIcon, wrench: Wrench,
};

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{line.replace("## ", "")}</h2>;
    if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">{line.replace("### ", "")}</h3>;
    if (line.startsWith("- ")) return <li key={i} className="text-sm text-gray-500 dark:text-gray-400 ml-4 list-disc mb-1">{line.replace("- ", "")}</li>;
    if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1 my-3 text-sm text-gray-500 dark:text-gray-400 italic">{line.replace("> ", "")}</blockquote>;
    if (line.startsWith("| ")) {
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      if (cells.every((c) => c.match(/^-+$/))) return null;
      return (
        <div key={i} className="flex border-b border-gray-200 dark:border-gray-800">
          {cells.map((cell, ci) => (
            <div key={ci} className="flex-1 px-2 py-1.5 text-xs text-gray-500 dark:text-gray-400">{cell}</div>
          ))}
        </div>
      );
    }
    if (line.startsWith("```")) return null;
    if (line.trim() === "") return <div key={i} className="h-2" />;
    if (/^\d+\. /.test(line)) return <li key={i} className="text-sm text-gray-500 dark:text-gray-400 ml-4 list-decimal mb-1">{line.replace(/^\d+\. /, "")}</li>;
    return <p key={i} className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2">{line}</p>;
  });
}

export default function ArticleContent({
  category,
  article,
}: {
  category: HelpCategory;
  article: HelpArticle;
}) {
  const { colors } = useTheme();

  const handleDownload = () => {
    const text = `# ${article.title}\n\n${article.summary}\n\n${article.content}`;
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${article.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/help-center" className="hover:text-gray-900 dark:hover:text-white">Help Center</Link>
          <span>/</span>
          <Link href={`/help-center/${category.slug}`} className="hover:text-gray-900 dark:hover:text-white">{category.title}</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white truncate">{article.title}</span>
        </div>

        {/* Back */}
        <Link
          href={`/help-center/${category.slug}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> {category.title}로 돌아가기
        </Link>

        {/* Header */}
        {(() => { const Icon = ICON_MAP[category.icon]; return Icon ? (
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${colors.primary}1a` }}>
            <Icon className="w-6 h-6" style={{ color: colors.primary }} strokeWidth={1.8} />
          </div>
        ) : null; })()}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {article.title}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          {article.summary}
        </p>

        <div className="flex items-center gap-4 mt-4 mb-8">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" /> {article.readTime} 읽기
          </span>
          <span className="text-xs text-gray-500">Updated {article.updatedAt}</span>
          <div className="flex-1" />
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 print:border-0 print:shadow-none">
          {renderMarkdown(article.content)}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            도움이 필요하신가요?{" "}
            <a href="mailto:help@newkl.net" className="font-medium hover:underline" style={{ color: colors.primary }}>
              고객 지원팀에 문의하기
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
