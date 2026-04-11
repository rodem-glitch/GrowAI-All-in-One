import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DataProtectionContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "데이터 보호 - Data Protection | GrowAI",
  description:
    "GrowAI의 데이터 보호 정책 및 보안 인프라 소개",
};

export default function DataProtectionPage() {
  return (
    <>
      <Header />
      <main>
        <DataProtectionContent />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
