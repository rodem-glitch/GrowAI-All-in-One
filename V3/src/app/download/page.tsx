import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DownloadContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "다운로드 - Download | GrowAI",
  description:
    "GrowAI 앱 다운로드 - macOS, Windows, Linux 지원",
};

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main>
        <DownloadContent />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
