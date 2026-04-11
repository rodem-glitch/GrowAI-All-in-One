import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsNewContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "새 소식 - What's New | GrowAI",
  description:
    "GrowAI 최신 업데이트 및 릴리스 노트",
};

export default function WhatsNewPage() {
  return (
    <>
      <Header />
      <main>
        <WhatsNewContent />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
