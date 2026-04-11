import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PortalHero from "@/components/portal/PortalHero";
import PortalTrustedBy from "@/components/portal/PortalTrustedBy";
import PortalServices from "@/components/portal/PortalServices";
import PortalAIEngine from "@/components/portal/PortalAIEngine";
import PortalUseCases from "@/components/portal/PortalUseCases";
import PortalTestimonials from "@/components/portal/PortalTestimonials";
import PortalCTA from "@/components/portal/PortalCTA";
import FAQ from "@/components/sections/FAQ";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "GrowAI Platform",
  description:
    "9 integrated AI solutions from LMS to manufacturing, "
    + "video to customer care. One platform, infinite possibilities. "
    + "Powered by Gemini, Claude, and Veo. By NEWKLE Inc.",
  keywords: [
    "GrowAI",
    "AI Platform",
    "LMS",
    "Manufacturing AI",
    "Video AI",
    "NEWKLE Inc",
  ],
};

export default function PortalPage() {
  return (
    <>
      <Header />
      <main>
        <PortalHero />
        <PortalTrustedBy />
        <PortalServices />
        <section id="ai-engine">
          <PortalAIEngine />
        </section>
        <section id="use-cases">
          <PortalUseCases />
        </section>
        <PortalTestimonials />
        <FAQ />
        <PortalCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
