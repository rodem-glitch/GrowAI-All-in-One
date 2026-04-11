import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ApiDocsContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "API 문서 - API Docs | GrowAI",
  description:
    "GrowAI API 문서 - 개발자 레퍼런스, SDK, 연동 가이드",
};

export default function ApiDocsPage() {
  return (
    <>
      <Header />
      <main>
        <ApiDocsContent />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
