import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "블로그 - Blog | GrowAI",
  description:
    "GrowAI 블로그 - AI 기술, 활용 팁, 최신 뉴스",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main><BlogContent /></main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
