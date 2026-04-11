"use client";

import { useInView } from "@/hooks/useInView";
import { Heart, BookOpen, Hammer, Share2 } from "lucide-react";

const phases = [
  {
    letter: "F",
    name: "Feeling",
    nameKo: "감성",
    desc: "머리보다 마음이 먼저 움직입니다.\n왜 배워야 하는지 스스로 느낄 때,\n그 감성이 학습의 첫 동력이 됩니다.",
    icon: Heart,
    color: "from-rose-500 to-pink-400",
    textColor: "text-rose-400",
    position: "top",
  },
  {
    letter: "K",
    name: "Knowing",
    nameKo: "인지",
    desc: "흩어진 정보를 연결하고 구조화합니다.\n개념과 원리를 체계적으로 이해할 때,\n지식은 비로소 내 것이 됩니다.",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-400",
    textColor: "text-blue-400",
    position: "right",
  },
  {
    letter: "D",
    name: "Doing",
    nameKo: "실천",
    desc: "아는 것과 할 수 있는 것은 다릅니다.\n직접 손으로 해보는 순간,\n지식이 진짜 역량으로 전환됩니다.",
    icon: Hammer,
    color: "from-emerald-500 to-teal-400",
    textColor: "text-emerald-400",
    position: "bottom",
  },
  {
    letter: "S",
    name: "Sharing",
    nameKo: "공유",
    desc: "배움은 나눌 때 완성됩니다.\n경험과 성과를 동료와 함께 나누면,\n그 나눔이 다음 배움의 씨앗이 됩니다.",
    icon: Share2,
    color: "from-amber-500 to-yellow-400",
    textColor: "text-amber-400",
    position: "left",
  },
];

export default function PortalFKDS() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 px-6 bg-[#06060a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-rose-600/5 via-blue-600/5 to-emerald-600/5 blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-rose-400 mb-4">
            Learning Model
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            FKDS Cycle
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto whitespace-pre-line">
            {"느끼고 알고 실천하고 나누는 네 단계가 끊임없이 순환할 때\n학습은 경험을 넘어 성장이 됩니다."}
          </p>
        </div>

        {/* Cycle visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.letter}
                className={`relative group transition-all duration-700 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Card */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center hover:-translate-y-1 transition-all duration-300">
                  {/* Icon circle */}
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Letter */}
                  <span
                    className={`text-4xl font-extrabold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}
                  >
                    {phase.letter}
                  </span>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-white mt-2">
                    {phase.name}
                  </h3>
                  <p className={`text-sm font-medium ${phase.textColor} mb-3`}>
                    {phase.nameKo}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {phase.desc}
                  </p>
                </div>

                {/* Arrow connector (hidden on last) */}
                {i < phases.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-gray-700"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cycle indicator */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-700 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.03]">
            <svg
              className="w-5 h-5 text-gray-500 animate-spin-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-sm text-gray-400">
              {"느끼고 알고 해보고 나누는 순환이 멈추지 않을 때\n배움은 성장이 됩니다."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
