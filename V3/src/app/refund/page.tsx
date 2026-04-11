import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RefundContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "환불 정책 - Refund Policy | GrowAI",
  description:
    "GrowAI 환불 정책 - 환불 조건, 절차, 예외 사항",
};

export default function RefundPage() {
  return (
    <>
      <Header />
      <main><RefundContent /></main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
