"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Shield, Lock, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const items = [
  { icon: Shield, title: "엔터프라이즈 보안", desc: "모든 데이터에 대한 엔드투엔드 암호화와 SOC2/ISO27001 인증 보안 인프라를 운영합니다." },
  { icon: Lock, title: "개인정보 보호 규정 준수", desc: "GDPR, CCPA 및 국내 개인정보보호법을 완벽하게 준수합니다." },
  { icon: UserCheck, title: "데이터 주권 보장", desc: "데이터 내보내기, 삭제, 투명성 도구로 사용자가 데이터를 완전히 통제합니다." },
];

export default function DataProtectionContent() {
  const { colors } = useTheme();

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sm uppercase tracking-widest font-semibold text-center mb-2" style={{ color: colors.primary }}>
          Data Protection
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          데이터 보호
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center mt-4">
          GrowAI는 데이터 보안을 최우선으로 생각합니다
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="rounded-2xl border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow p-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${colors.primary}1a` }}>
                    <Icon className="w-8 h-8" style={{ color: colors.primary }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-3">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
