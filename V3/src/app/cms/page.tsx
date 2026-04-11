import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CmsContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "CMS — Construction Management System | GrowAI",
  description: "IoT + AI 기반 건설 현장 관리의 스마트화",
};

export default function CmsPage() {
  return (<><Header /><main><CmsContent /></main><Footer /><ScrollToTop /></>);
}
