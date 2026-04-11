"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Monitor,
  Terminal,
  Download,
  Globe,
  HardDrive,
  Cpu,
  MemoryStick,
} from "lucide-react";

const VERSION = "v3.8.1";

interface PlatformCard {
  icon: React.ReactNode;
  name: string;
  requirements: string;
  file: string;
  buttonLabel: string;
}

export default function DownloadContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  const platforms: PlatformCard[] = [
    {
      icon: <Monitor className="w-10 h-10" />,
      name: "macOS",
      requirements: isKo
        ? "macOS 11 (Big Sur) 이상"
        : "macOS 11 (Big Sur) or later",
      file: "GrowAI-3.8.1.dmg",
      buttonLabel: isKo
        ? ".dmg 다운로드"
        : "Download .dmg",
    },
    {
      icon: <Monitor className="w-10 h-10" />,
      name: "Windows",
      requirements: isKo
        ? "Windows 10 이상"
        : "Windows 10 or later",
      file: "GrowAI-Setup-3.8.1.exe",
      buttonLabel: isKo
        ? ".exe 다운로드"
        : "Download .exe",
    },
    {
      icon: <Terminal className="w-10 h-10" />,
      name: "Linux",
      requirements: isKo
        ? "Ubuntu 20.04 이상"
        : "Ubuntu 20.04 or later",
      file: "GrowAI-3.8.1.AppImage",
      buttonLabel: isKo
        ? ".AppImage 다운로드"
        : "Download .AppImage",
    },
  ];

  const previousVersions = [
    { version: "v3.7.0", date: "2026-03-15" },
    { version: "v3.6.0", date: "2026-02-10" },
  ];

  const sysReqs = [
    {
      icon: <Cpu className="w-5 h-5" />,
      label: isKo ? "프로세서" : "Processor",
      value: isKo
        ? "Intel i5 / Apple M1 이상"
        : "Intel i5 / Apple M1 or later",
    },
    {
      icon: <MemoryStick className="w-5 h-5" />,
      label: isKo ? "메모리" : "Memory",
      value: isKo ? "8GB RAM 이상" : "8GB RAM minimum",
    },
    {
      icon: <HardDrive className="w-5 h-5" />,
      label: isKo ? "저장 공간" : "Storage",
      value: isKo ? "2GB 이상 여유 공간" : "2GB free space",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: isKo ? "네트워크" : "Network",
      value: isKo
        ? "인터넷 연결 필요"
        : "Internet connection required",
    },
  ];

  return (
    <div
      className="bg-white dark:bg-gray-950
        min-h-screen pt-24 pb-20"
    >
      {/* ── Hero ── */}
      <section className="max-w-[1200px] mx-auto px-6 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold
            text-gray-900 dark:text-white mb-4"
        >
          {isKo
            ? "GrowAI 다운로드"
            : "Download GrowAI"}
        </h1>

        <p
          className="text-lg text-gray-500
            dark:text-gray-400 mb-2"
        >
          {isKo
            ? "AI 비디오 생성의 새로운 기준"
            : "The new standard for AI video generation"}
        </p>

        <span
          className="inline-block text-sm font-mono
            text-gray-400 dark:text-gray-500 mb-8"
        >
          {VERSION}
        </span>

        <div>
          <button
            style={{ backgroundColor: colors.primary }}
            className="text-white rounded-xl px-8 py-3
              text-lg font-semibold inline-flex
              items-center gap-2
              hover:opacity-90 transition-opacity"
          >
            <Download className="w-5 h-5" />
            {isKo
              ? "최신 버전 다운로드"
              : "Download Latest"}
          </button>
        </div>
      </section>

      {/* ── Platform Cards ── */}
      <section
        className="max-w-[1200px] mx-auto px-6
          mt-20"
      >
        <h2
          className="text-2xl font-bold text-center
            text-gray-900 dark:text-white mb-10"
        >
          {isKo
            ? "플랫폼 선택"
            : "Choose Your Platform"}
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-3
            gap-6"
        >
          {platforms.map((p) => (
            <div
              key={p.name}
              className="bg-white dark:bg-gray-900
                border border-gray-200
                dark:border-gray-800
                rounded-2xl p-8 text-center
                flex flex-col items-center gap-4"
            >
              <div
                style={{ color: colors.primary }}
              >
                {p.icon}
              </div>

              <h3
                className="text-xl font-semibold
                  text-gray-900 dark:text-white"
              >
                {p.name}
              </h3>

              <p
                className="text-sm text-gray-500
                  dark:text-gray-400"
              >
                {p.requirements}
              </p>

              <button
                style={{
                  backgroundColor: colors.primary,
                }}
                className="mt-auto text-white
                  rounded-xl px-8 py-3
                  font-medium inline-flex
                  items-center gap-2
                  hover:opacity-90
                  transition-opacity"
              >
                <Download className="w-4 h-4" />
                {p.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── System Requirements ── */}
      <section
        className="max-w-[1200px] mx-auto px-6
          mt-20"
      >
        <h2
          className="text-2xl font-bold text-center
            text-gray-900 dark:text-white mb-10"
        >
          {isKo
            ? "시스템 요구 사항"
            : "System Requirements"}
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2
            lg:grid-cols-4 gap-6"
        >
          {sysReqs.map((r) => (
            <div
              key={r.label}
              className="bg-white dark:bg-gray-900
                border border-gray-200
                dark:border-gray-800
                rounded-2xl p-8 flex flex-col
                items-center text-center gap-3"
            >
              <div
                style={{ color: colors.primary }}
              >
                {r.icon}
              </div>

              <span
                className="text-sm font-semibold
                  text-gray-900 dark:text-white"
              >
                {r.label}
              </span>

              <span
                className="text-sm text-gray-500
                  dark:text-gray-400"
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Previous Versions ── */}
      <section
        className="max-w-[1200px] mx-auto px-6
          mt-20"
      >
        <h2
          className="text-2xl font-bold text-center
            text-gray-900 dark:text-white mb-10"
        >
          {isKo
            ? "이전 버전"
            : "Previous Versions"}
        </h2>

        <div
          className="bg-white dark:bg-gray-900
            border border-gray-200
            dark:border-gray-800
            rounded-2xl overflow-hidden"
        >
          <table className="w-full text-left">
            <thead>
              <tr
                className="border-b border-gray-200
                  dark:border-gray-800"
              >
                <th
                  className="px-6 py-4 text-sm
                    font-semibold text-gray-900
                    dark:text-white"
                >
                  {isKo ? "버전" : "Version"}
                </th>
                <th
                  className="px-6 py-4 text-sm
                    font-semibold text-gray-900
                    dark:text-white"
                >
                  {isKo ? "릴리스 날짜" : "Release Date"}
                </th>
                <th
                  className="px-6 py-4 text-sm
                    font-semibold text-gray-900
                    dark:text-white text-right"
                >
                  {isKo ? "다운로드" : "Download"}
                </th>
              </tr>
            </thead>
            <tbody>
              {previousVersions.map((v) => (
                <tr
                  key={v.version}
                  className="border-b last:border-b-0
                    border-gray-200
                    dark:border-gray-800"
                >
                  <td
                    className="px-6 py-4 text-sm
                      text-gray-700
                      dark:text-gray-300"
                  >
                    {v.version}
                  </td>
                  <td
                    className="px-6 py-4 text-sm
                      text-gray-500
                      dark:text-gray-400"
                  >
                    {v.date}
                  </td>
                  <td
                    className="px-6 py-4 text-right"
                  >
                    <button
                      style={{
                        color: colors.primary,
                      }}
                      className="text-sm font-medium
                        hover:underline
                        inline-flex items-center
                        gap-1"
                    >
                      <Download className="w-3 h-3" />
                      {isKo
                        ? "다운로드"
                        : "Download"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── CTA: Start in Browser ── */}
      <section
        className="max-w-[1200px] mx-auto px-6
          mt-20 text-center"
      >
        <div
          className="bg-white dark:bg-gray-900
            border border-gray-200
            dark:border-gray-800
            rounded-2xl p-12"
        >
          <h2
            className="text-2xl font-bold
              text-gray-900 dark:text-white mb-4"
          >
            {isKo
              ? "설치 없이 웹에서 바로 시작"
              : "Start in Your Browser"}
          </h2>

          <p
            className="text-gray-500
              dark:text-gray-400 mb-8"
          >
            {isKo
              ? "다운로드 없이 브라우저에서 GrowAI를 체험하세요."
              : "Try GrowAI directly in your browser - no download needed."}
          </p>

          <button
            style={{
              backgroundColor: colors.primary,
            }}
            className="text-white rounded-xl px-8
              py-3 font-semibold inline-flex
              items-center gap-2
              hover:opacity-90 transition-opacity"
          >
            <Globe className="w-5 h-5" />
            {isKo
              ? "무료 체험하기"
              : "Try Free"}
          </button>
        </div>
      </section>
    </div>
  );
}
