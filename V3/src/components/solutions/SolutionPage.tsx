"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Play, CheckCircle2 } from "lucide-react";

export interface SolutionFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface SolutionScreenshot {
  title: string;
  desc: string;
  gradient: string;
}

export interface SolutionAI {
  title: string;
  desc: string;
}

export interface SolutionPageProps {
  code: string;
  name: string;
  tagline: string;
  subtitle: string;
  icon: LucideIcon;
  videoTitle: string;
  videoDesc: string;
  features: SolutionFeature[];
  screenshots: SolutionScreenshot[];
  aiFeatures: SolutionAI[];
  ctaText: string;
}

export default function SolutionPage({
  code,
  name,
  tagline,
  subtitle,
  icon: HeroIcon,
  videoTitle,
  videoDesc,
  features,
  screenshots,
  aiFeatures,
  ctaText,
}: SolutionPageProps) {
  const { colors } = useTheme();

  return (
    <div>
      {/* ── 1. Hero + Video ── */}
      <section className="pt-32 pb-20 px-6 dark:bg-[#0f1112]">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{
              borderColor: `${colors.primary}40`,
              backgroundColor: `${colors.primary}0d`,
            }}
          >
            <HeroIcon
              className="w-4 h-4"
              style={{ color: colors.primary }}
              strokeWidth={1.8}
            />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: colors.primary }}
            >
              {code}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#242727] dark:text-white leading-tight">
            {name}
          </h1>
          <p className="text-xl md:text-2xl font-medium mt-4" style={{ color: colors.primary }}>
            {tagline}
          </p>
          <p className="text-lg text-[#555c5d] dark:text-gray-400 mt-4 max-w-2xl mx-auto whitespace-pre-line">
            {subtitle}
          </p>

          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <a
              href="#features"
              className="px-8 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              기능 살펴보기
            </a>
            <a
              href="#demo"
              className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              style={{ borderColor: colors.primary, color: colors.primary }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  `${colors.primary}1a`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
              }}
            >
              무료 시작하기
            </a>
          </div>

          {/* Video placeholder */}
          <div
            id="demo"
            className="mt-16 rounded-2xl aspect-video max-w-4xl mx-auto relative overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(135deg, ${colors.primary}25, ${colors.primaryDark}15)`,
            }}
          >
            <div className="text-center">
              <button
                aria-label="Play demo"
                className="w-20 h-20 rounded-full bg-white/80 dark:bg-white/60 flex items-center justify-center shadow-lg hover:bg-white transition-colors mx-auto mb-4"
              >
                <Play
                  className="w-8 h-8 translate-x-0.5"
                  style={{ color: colors.primary }}
                  fill={colors.primary}
                />
              </button>
              <p className="text-lg font-semibold text-[#242727] dark:text-white">
                {videoTitle}
              </p>
              <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-1">
                {videoDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 기능 요약 ── */}
      <section
        id="features"
        className="py-24 px-6 bg-[#fbfbfb] dark:bg-gray-900"
      >
        <div className="max-w-[1200px] mx-auto">
          <p
            className="text-sm uppercase tracking-widest font-semibold text-center mb-2"
            style={{ color: colors.primary }}
          >
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
            핵심 기능
          </h2>
          <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4">
            {code}의 대표 기능을 소개합니다
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <Card
                  key={feat.title}
                  className="rounded-2xl border-[#d7dadb] dark:border-gray-700 hover:shadow-lg transition-shadow p-0"
                >
                  <CardContent className="p-8">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${colors.primary}1a` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: colors.primary }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[#242727] dark:text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-[#555c5d] dark:text-gray-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. 스크린샷 ── */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p
            className="text-sm uppercase tracking-widest font-semibold text-center mb-2"
            style={{ color: colors.primary }}
          >
            Screenshots
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
            화면 미리보기
          </h2>
          <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4">
            실제 {code} 화면을 확인하세요
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {screenshots.map((ss) => (
              <div key={ss.title}>
                <div
                  className={`h-56 rounded-2xl bg-gradient-to-br ${ss.gradient} dark:opacity-80 mb-6`}
                />
                <h3 className="text-lg font-semibold text-[#242727] dark:text-white">
                  {ss.title}
                </h3>
                <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-2">
                  {ss.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AI Intelligence ── */}
      <section className="py-24 px-6 bg-[#fbfbfb] dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto">
          <p
            className="text-sm uppercase tracking-widest font-semibold text-center mb-2"
            style={{ color: colors.primary }}
          >
            AI Intelligence
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
            AI가 만드는 차이
          </h2>
          <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4">
            {code}에 내장된 AI가 업무를 혁신합니다
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {aiFeatures.map((ai) => (
              <div
                key={ai.title}
                className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-2xl border border-[#d7dadb] dark:border-gray-700 p-6"
              >
                <CheckCircle2
                  className="w-6 h-6 shrink-0 mt-0.5"
                  style={{ color: colors.primary }}
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="text-base font-semibold text-[#242727] dark:text-white mb-1">
                    {ai.title}
                  </h3>
                  <p className="text-sm text-[#555c5d] dark:text-gray-400 leading-relaxed">
                    {ai.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-[#242728] dark:bg-[#0a0b0c]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {ctaText}
          </h2>
          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <a
              href="#contact"
              className="px-8 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              무료로 시작하기 →
            </a>
            <a
              href="/portal"
              className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              style={{ borderColor: colors.primary, color: colors.primary }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  `${colors.primary}1a`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
              }}
            >
              전체 솔루션 보기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
