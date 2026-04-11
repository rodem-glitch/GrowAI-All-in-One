"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Hammer, Share2 } from "lucide-react";

const phases = [
  { letter: "F", name: "Feeling", nameKo: "감성", desc: "머리보다 마음이 먼저 움직입니다.\n왜 배워야 하는지 스스로 느낄 때,\n그 감성이 학습의 첫 동력이 됩니다.", icon: Heart },
  { letter: "K", name: "Knowing", nameKo: "인지", desc: "흩어진 정보를 연결하고 구조화합니다.\n개념과 원리를 체계적으로 이해할 때,\n지식은 비로소 내 것이 됩니다.", icon: BookOpen },
  { letter: "D", name: "Doing", nameKo: "실천", desc: "아는 것과 할 수 있는 것은 다릅니다.\n직접 손으로 해보는 순간,\n지식이 진짜 역량으로 전환됩니다.", icon: Hammer },
  { letter: "S", name: "Sharing", nameKo: "공유", desc: "배움은 나눌 때 완성됩니다.\n경험과 성과를 동료와 함께 나누면,\n그 나눔이 다음 배움의 씨앗이 됩니다.", icon: Share2 },
];

export default function PortalFKDS() {
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sm uppercase tracking-widest font-semibold text-center mb-2" style={{ color: colors.primary }}>
          Learning Model
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          FKDS Cycle
        </h2>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4 whitespace-pre-line">
          {"느끼고 알고 실천하고 나누는 네 단계가 끊임없이 순환할 때\n학습은 경험을 넘어 성장이 됩니다."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <Card key={phase.letter} className="rounded-2xl border-[#d7dadb] dark:border-gray-700 hover:shadow-lg transition-shadow p-0">
                <CardContent className="p-8 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${colors.primary}1a` }}
                  >
                    <Icon className="w-10 h-10" style={{ color: colors.primary }} strokeWidth={1.5} />
                  </div>
                  <span className="text-4xl font-extrabold" style={{ color: colors.primary }}>{phase.letter}</span>
                  <h3 className="text-xl font-bold text-[#242727] dark:text-white mt-2">{phase.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: colors.primary }}>{phase.nameKo}</p>
                  <p className="text-sm text-[#555c5d] dark:text-gray-400 leading-relaxed whitespace-pre-line">{phase.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-sm text-[#555c5d] dark:text-gray-400 text-center mt-10 whitespace-pre-line">
          {"느끼고 알고 해보고 나누는 순환이 멈추지 않을 때\n배움은 성장이 됩니다."}
        </p>
      </div>
    </section>
  );
}
