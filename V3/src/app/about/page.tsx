import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "회사 소개 - About Us | GrowAI",
  description:
    "NEWKL Inc. - Global No.1 AI 영상 생성 플랫폼"
    + " GrowAI를 만드는 사람들",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main><AboutContent /></main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
