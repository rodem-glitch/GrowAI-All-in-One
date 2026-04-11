import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LmsContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "LMS - Learning Management System | GrowAI",
  description: "체계적인 학습 관리와 진도 추적 시스템",
};

export default function LmsPage() {
  return (
    <>
      <Header />
      <main><LmsContent /></main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
