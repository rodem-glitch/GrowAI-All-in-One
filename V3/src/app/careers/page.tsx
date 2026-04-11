import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CareersContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "채용 - Careers | GrowAI",
  description:
    "NEWKL Inc. 채용 - AI의 미래를 함께 만들어갈 인재를 찾습니다",
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <CareersContent />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
