import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CdnContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "CDN - Content Delivery Network | GrowAI",
  description: "글로벌 엣지 캐싱으로 끊김 없는 미디어 경험",
};

export default function CdnPage() {
  return (<><Header /><main><CdnContent /></main><Footer /><ScrollToTop /></>);
}
