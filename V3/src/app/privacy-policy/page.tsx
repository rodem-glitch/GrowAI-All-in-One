import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PrivacyPolicyContent from "./content";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title:
    "개인정보처리방침 - Privacy Policy | GrowAI",
  description:
    "GrowAI 개인정보처리방침 - "
    + "데이터 수집, 이용, 보호에 관한 정책",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <PrivacyPolicyContent />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
