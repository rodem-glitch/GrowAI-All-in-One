"use client";

import { useTheme } from "@/contexts/ThemeContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const gradients = [
  "from-blue-100 to-cyan-50",
  "from-purple-100 to-pink-50",
  "from-green-100 to-emerald-50",
  "from-orange-100 to-yellow-50",
];

const features = [
  {
    title: "AI 콘텐츠 생성",
    desc: "GPT-4o, Claude, Gemini를 활용한 이러닝 콘텐츠 자동 생성",
  },
  {
    title: "CREATOR 프레임워크",
    desc: "7단계 체계적 교수설계로 효과적인 학습 경험 구현",
  },
  {
    title: "FKDS 학습모델",
    desc: "Feeling → Knowing → Doing → Sharing 순환 학습",
  },
  {
    title: "Human-in-the-Loop",
    desc: "AI 생성물에 대한 전문가 검수와 피드백 반영",
  },
];

export default function Features() {
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">
          주요 기능
        </h2>
        <p className="text-lg text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
          AI 기반 이러닝 콘텐츠 자동 생성 플랫폼의 핵심 기능을 소개합니다
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((item, i) => (
            <Card
              key={item.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-4 px-4 pb-0">
                <div
                  className={`h-48 bg-gradient-to-br ${gradients[i]} dark:opacity-80 rounded-xl`}
                />
              </CardContent>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="#"
                  className="text-sm hover:underline"
                  style={{ color: colors.primary }}
                >
                  자세히 보기
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
