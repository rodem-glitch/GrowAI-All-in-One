import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TermsContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "이용약관 - Terms of Service | GrowAI",
  description: "GrowAI 서비스 이용약관",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main><TermsContent /></main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
