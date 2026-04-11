import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PricingContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { PAGE_VISIBILITY } from "@/config/feature-flags";

export const metadata: Metadata = {
  title: "가격 - Pricing | GrowAI",
  description:
    "GrowAI 요금제 - 무료부터 엔터프라이즈까지"
    + " 모든 규모에 맞는 플랜",
};

export default function PricingPage() {
  if (!PAGE_VISIBILITY.pricing) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <main>
        <PricingContent />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
