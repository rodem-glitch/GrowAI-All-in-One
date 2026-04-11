"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  MessagesSquare,
  Hash,
  Megaphone,
  HelpCircle,
  Sparkles,
  MessageCircle,
  Globe,
  Users,
  Zap,
  CalendarDays,
  HeadphonesIcon,
} from "lucide-react";

// Discord 브랜드 컬러 (로고/브랜드 참조 전용)
const DISCORD_PURPLE = "#5865F2";

interface Channel {
  name: string;
  descKo: string;
  descEn: string;
  icon: React.ElementType;
  online: number;
}

const CHANNELS: Channel[] = [
  {
    name: "announcements",
    descKo: "공식 업데이트 및 공지사항",
    descEn: "Official updates and announcements",
    icon: Megaphone,
    online: 1240,
  },
  {
    name: "general",
    descKo: "자유로운 대화와 토론",
    descEn: "General discussion and chat",
    icon: MessageCircle,
    online: 3420,
  },
  {
    name: "help",
    descKo: "도움이 필요할 때 질문하세요",
    descEn: "Ask questions and get support",
    icon: HelpCircle,
    online: 890,
  },
  {
    name: "showcase",
    descKo: "만든 작품을 공유하세요",
    descEn: "Share your creations and projects",
    icon: Sparkles,
    online: 1560,
  },
  {
    name: "feature-requests",
    descKo: "새로운 기능을 제안하세요",
    descEn: "Suggest new features and improvements",
    icon: Zap,
    online: 720,
  },
  {
    name: "한국어",
    descKo: "한국어 전용 채널",
    descEn: "Korean language channel",
    icon: Globe,
    online: 2100,
  },
];

interface Benefit {
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  icon: React.ElementType;
}

const BENEFITS: Benefit[] = [
  {
    titleKo: "직접 지원",
    titleEn: "Direct Support",
    descKo: "팀에서 직접 도움을 받으세요",
    descEn: "Get help directly from the team",
    icon: HeadphonesIcon,
  },
  {
    titleKo: "얼리 액세스",
    titleEn: "Early Access",
    descKo: "베타 기능을 가장 먼저 체험하세요",
    descEn: "Be the first to try beta features",
    icon: Zap,
  },
  {
    titleKo: "커뮤니티 이벤트",
    titleEn: "Community Events",
    descKo: "매주 열리는 Q&A 세션에 참여하세요",
    descEn: "Join weekly Q&A sessions",
    icon: CalendarDays,
  },
];

export default function DiscordContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero */}
      <section
        className="py-24 md:py-32"
        style={{
          background: `linear-gradient(
            180deg,
            ${colors.primary}0D 0%,
            transparent 100%
          )`,
        }}
      >
        <div
          className={
            "mx-auto max-w-[1200px] px-6 text-center"
          }
        >
          <div
            className={
              "mx-auto mb-6 flex h-20 w-20"
              + " items-center justify-center"
              + " rounded-2xl"
            }
            style={{
              backgroundColor: `${colors.primary}15`,
            }}
          >
            <MessagesSquare
              className="h-10 w-10"
              style={{ color: colors.primary }}
            />
          </div>

          <h1
            className={
              "text-4xl font-extrabold tracking-tight"
              + " text-gray-900 dark:text-white"
              + " md:text-5xl"
            }
          >
            GrowAI Discord
          </h1>

          <p
            className={
              "mx-auto mt-4 max-w-lg text-lg"
              + " text-gray-600 dark:text-gray-400"
            }
          >
            {isKo
              ? "실시간으로 소통하고 도움을 받으세요"
              : "Chat in real-time and get help"}
          </p>

          <a
            href="https://discord.gg/growai"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "mt-8 inline-flex items-center gap-2"
              + " rounded-full px-8 py-4 text-lg"
              + " font-semibold text-white"
              + " transition-transform hover:scale-105"
            }
            style={{
              backgroundColor: colors.primary,
            }}
          >
            <MessagesSquare className="h-5 w-5" />
            {isKo
              ? "Discord 참여하기"
              : "Join Discord"}
          </a>

          <p
            className={
              "mt-4 flex items-center justify-center"
              + " gap-1.5 text-sm"
              + " text-gray-500 dark:text-gray-500"
            }
          >
            <Users className="h-4 w-4" />
            {isKo
              ? "15,000+ 멤버"
              : "15,000+ members"}
          </p>
        </div>
      </section>

      {/* Channel Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2
            className={
              "mb-10 text-center text-2xl"
              + " font-bold text-gray-900"
              + " dark:text-white md:text-3xl"
            }
          >
            {isKo ? "채널 미리보기" : "Channel Preview"}
          </h2>

          <div
            className={
              "grid grid-cols-1 gap-4 md:grid-cols-2"
            }
          >
            {CHANNELS.map((ch) => {
              const Icon = ch.icon;
              return (
                <div
                  key={ch.name}
                  className={
                    "flex items-start gap-4"
                    + " rounded-xl bg-gray-50 p-4"
                    + " dark:bg-gray-900"
                  }
                >
                  <div
                    className={
                      "flex h-10 w-10 shrink-0"
                      + " items-center justify-center"
                      + " rounded-lg"
                    }
                    style={{
                      backgroundColor:
                        `${colors.primary}15`,
                    }}
                  >
                    <Hash
                      className="h-5 w-5"
                      style={{ color: colors.primary }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div
                      className={
                        "flex items-center gap-2"
                      }
                    >
                      <span
                        className={
                          "font-semibold"
                          + " text-gray-900"
                          + " dark:text-white"
                        }
                      >
                        {ch.name}
                      </span>
                      <span
                        className={
                          "flex items-center gap-1"
                          + " text-xs text-gray-400"
                        }
                      >
                        <span
                          className={
                            "inline-block h-2 w-2"
                            + " rounded-full bg-green-500"
                          }
                        />
                        {ch.online.toLocaleString()}
                      </span>
                    </div>

                    <p
                      className={
                        "mt-1 text-sm text-gray-500"
                        + " dark:text-gray-400"
                      }
                    >
                      {isKo ? ch.descKo : ch.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="py-20"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            ${colors.primary}08 50%,
            transparent 100%
          )`,
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2
            className={
              "mb-10 text-center text-2xl"
              + " font-bold text-gray-900"
              + " dark:text-white md:text-3xl"
            }
          >
            {isKo
              ? "참여하면 좋은 이유"
              : "Why Join?"}
          </h2>

          <div
            className={
              "grid grid-cols-1 gap-6"
              + " md:grid-cols-3"
            }
          >
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.titleEn}
                  className={
                    "rounded-xl bg-gray-50 p-6"
                    + " text-center dark:bg-gray-900"
                  }
                >
                  <div
                    className={
                      "mx-auto mb-4 flex h-14 w-14"
                      + " items-center justify-center"
                      + " rounded-xl"
                    }
                    style={{
                      backgroundColor:
                        `${colors.primary}15`,
                    }}
                  >
                    <Icon
                      className="h-7 w-7"
                      style={{ color: colors.primary }}
                    />
                  </div>

                  <h3
                    className={
                      "text-lg font-semibold"
                      + " text-gray-900"
                      + " dark:text-white"
                    }
                  >
                    {isKo ? b.titleKo : b.titleEn}
                  </h3>

                  <p
                    className={
                      "mt-2 text-sm text-gray-500"
                      + " dark:text-gray-400"
                    }
                  >
                    {isKo ? b.descKo : b.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div
          className={
            "mx-auto max-w-[1200px] px-6"
            + " text-center"
          }
        >
          <h2
            className={
              "text-2xl font-bold text-gray-900"
              + " dark:text-white md:text-3xl"
            }
          >
            {isKo
              ? "지금 바로 참여하세요"
              : "Join the community today"}
          </h2>

          <p
            className={
              "mx-auto mt-3 max-w-md text-gray-500"
              + " dark:text-gray-400"
            }
          >
            {isKo
              ? "GrowAI 커뮤니티에서 함께 성장하세요"
              : "Grow together with the GrowAI community"}
          </p>

          <a
            href="https://discord.gg/growai"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "mt-8 inline-flex items-center gap-2"
              + " rounded-full px-8 py-4 text-lg"
              + " font-semibold text-white"
              + " transition-transform hover:scale-105"
            }
            style={{
              backgroundColor: colors.primary,
            }}
          >
            <MessagesSquare className="h-5 w-5" />
            {isKo
              ? "무료로 참여"
              : "Join for free"}
          </a>
        </div>
      </section>
    </div>
  );
}
