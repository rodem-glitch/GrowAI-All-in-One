import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VlsContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "VLS — Video Lecture System | GrowAI",
  description: "시공간 제약 없는 실시간 화상 교육 시스템",
};

export default function VlsPage() {
  return (<><Header /><main><VlsContent /></main><Footer /><ScrollToTop /></>);
}
