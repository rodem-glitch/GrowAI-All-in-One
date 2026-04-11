import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscordContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Discord - GrowAI",
  description:
    "GrowAI Discord 서버에 참여하세요 - 실시간 소통과 지원",
};

export default function DiscordPage() {
  return (
    <>
      <Header />
      <main><DiscordContent /></main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
