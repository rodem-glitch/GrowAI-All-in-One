"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Factory, HardHat, Cpu } from "lucide-react";

const partners = [
  { name: "Korea Polytechnics", nameKo: "한국폴리텍대학", desc: "GrowAI LMS 도입", icon: GraduationCap },
  { name: "DAEKWANG ENTERPRISE", nameKo: "대광엔터프라이즈", desc: "제조 공정 AI 품질 예측 시스템 구축", icon: Factory },
  { name: "Dajim Construction", nameKo: "다짐건설", desc: "IoT + AI 기반 스마트 건설 현장 관리", icon: HardHat },
  { name: "Smart Manufacturing Innovation Business Association", nameKo: "스마트제조혁신협회", desc: "교육사업을 위한 LMS, 국가자격시험", icon: Cpu },
];

export default function PortalTrustedBy() {
  const { colors } = useTheme();

  return (
    <section className="py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sm uppercase tracking-widest text-[#555c5d] dark:text-gray-500 font-medium text-center mb-10">
          Trusted by Leading Organizations
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <Card key={partner.name} className="rounded-2xl border-[#d7dadb] dark:border-gray-700 hover:shadow-lg transition-shadow p-0">
                <CardContent className="p-6 text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${colors.primary}1a` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: colors.primary }} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm font-bold text-[#242727] dark:text-white">{partner.name}</h3>
                  <p className="text-xs font-medium mt-0.5 mb-2" style={{ color: colors.primary }}>{partner.nameKo}</p>
                  <p className="text-xs text-[#555c5d] dark:text-gray-400">{partner.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 border-t border-[#d7dadb] dark:border-gray-700" />
      </div>
    </section>
  );
}
