import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpCenterContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Help Center — GrowAI Platform",
  description: "GrowAI 사용 가이드, 튜토리얼, FAQ",
};

export default function HelpCenterPage() {
  return (
    <>
      <Header />
      <main><HelpCenterContent /></main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
