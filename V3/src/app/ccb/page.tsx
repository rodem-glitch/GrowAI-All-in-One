import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CcbContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "CCB - Customer Care Bot | GrowAI",
  description: "다국어 AI 챗봇으로 글로벌 고객 소통 혁신",
};

export default function CcbPage() {
  return (<><Header /><main><CcbContent /></main><Footer /><ScrollToTop /></>);
}
