import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MapContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "MAP — Manufacturing AI Platform | GrowAI",
  description: "생산 공정의 지능화와 품질 최적화 AI 플랫폼",
};

export default function MapPage() {
  return (<><Header /><main><MapContent /></main><Footer /><ScrollToTop /></>);
}
