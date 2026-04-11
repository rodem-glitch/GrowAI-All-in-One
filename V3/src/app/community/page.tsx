import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CommunityContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "커뮤니티 - Community | GrowAI",
  description:
    "GrowAI 사용자 커뮤니티 - 포럼, 토론, 지식 공유",
};

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main>
        <CommunityContent />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
