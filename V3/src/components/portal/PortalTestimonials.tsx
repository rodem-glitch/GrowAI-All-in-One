"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  { quote: "LearnForm 도입 후 이러닝 콘텐츠 제작 시간이 80% 단축되었습니다. CREATOR 프레임워크의 체계적인 접근이 핵심이었습니다.", name: "교육혁신팀", role: "kopo.ac.kr", avatar: "ED" },
  { quote: "MAP 솔루션으로 제조 공정 불량률을 40% 줄였습니다. AI 품질 예측이 실시간으로 작동하여 즉각 대응이 가능해졌습니다.", name: "스마트팩토리팀", role: "daekwangent.co.kr", avatar: "MF" },
  { quote: "VAS 영상 자동 요약으로 수천 시간의 강의 영상을 효율적으로 관리하고 있습니다. 현장 교육 만족도가 크게 향상되었습니다.", name: "현장교육센터", role: "dajimcon.co.kr", avatar: "VD" },
  { quote: "CCB 챗봇 도입 후 문의 응답 시간이 평균 3분에서 15초로 단축되었습니다. 다국어 지원으로 글로벌 서비스 품질도 향상되었습니다.", name: "AI혁신위원회", role: "smiba.kr", avatar: "AI" },
];

export default function PortalTestimonials() {
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sm uppercase tracking-widest font-semibold text-center mb-2" style={{ color: colors.primary }}>
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          Trusted by Industry Leaders
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center mt-4">
          대학, 기업, 공공기관의 리더들이 GrowAI를 신뢰합니다
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {testimonials.map((item) => (
            <Card key={item.name} className="rounded-2xl border-gray-200 dark:border-gray-800 p-0">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#303436] dark:text-gray-300 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}1a` }}>
                    <span className="font-semibold text-sm" style={{ color: colors.primary }}>{item.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
