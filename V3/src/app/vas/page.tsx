import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VasContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "VAS — Video Auto Summary | GrowAI",
  description: "AI 기반 영상 자동 요약으로 학습 효율 극대화",
};

export default function VasPage() {
  return (<><Header /><main><VasContent /></main><Footer /><ScrollToTop /></>);
}
