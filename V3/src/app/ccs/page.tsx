import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CcsContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "CCS - Claude Code Skill | GrowAI",
  description: "AI 코드 어시스턴트로 개발 생산성의 도약",
};

export default function CcsPage() {
  return (<><Header /><main><CcsContent /></main><Footer /><ScrollToTop /></>);
}
