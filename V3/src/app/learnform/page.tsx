import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LearnFormContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "LearnForm - AI LMS Content Platform | GrowAI",
  description: "CREATOR x FKDS 기반 AI 이러닝 콘텐츠 자동 생성 플랫폼",
};

export default function LearnFormPage() {
  return (
    <>
      <Header />
      <main><LearnFormContent /></main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
