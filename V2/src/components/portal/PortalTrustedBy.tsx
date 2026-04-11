"use client";

import { useInView } from "@/hooks/useInView";
import { GraduationCap, Factory, HardHat, Cpu } from "lucide-react";

const partners = [
  {
    name: "Korea Polytechnics",
    nameKo: "한국폴리텍대학",
    desc: "GrowAI LMS 도입",
    icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-400",
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    name: "DAEKWANG ENTERPRISE",
    nameKo: "대광엔터프라이즈",
    desc: "제조 공정 AI 품질 예측 시스템 구축",
    icon: Factory,
    gradient: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16,185,129,0.12)",
  },
  {
    name: "Dajim Construction",
    nameKo: "다짐건설",
    desc: "IoT + AI 기반 스마트 건설 현장 관리",
    icon: HardHat,
    gradient: "from-amber-500 to-orange-400",
    glowColor: "rgba(245,158,11,0.12)",
  },
  {
    name: "Smart Manufacturing Innovation Business Association",
    nameKo: "스마트제조혁신협회",
    desc: "교육사업을 위한 LMS, 국가자격시험",
    icon: Cpu,
    gradient: "from-violet-500 to-purple-400",
    glowColor: "rgba(139,92,246,0.12)",
  },
];

export default function PortalTrustedBy() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-16 md:py-20 bg-[#06060a] border-y border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-6">
        <p
          ref={ref}
          className={`text-center text-xs font-semibold tracking-widest uppercase text-gray-500 mb-10 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Trusted by Leading Organizations
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((partner, i) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className={`group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center hover:-translate-y-1 transition-all duration-500 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    className="w-6 h-6 text-white"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Name */}
                <h3 className="text-sm font-bold text-white mb-0.5">
                  {partner.name}
                </h3>
                <p
                  className={`text-xs font-medium bg-gradient-to-r ${partner.gradient} bg-clip-text text-transparent mb-2`}
                >
                  {partner.nameKo}
                </p>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed">
                  {partner.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
