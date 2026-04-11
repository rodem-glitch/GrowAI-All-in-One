import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Integrations from "@/components/sections/Integrations";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import Workflow from "@/components/sections/Workflow";
import Solutions from "@/components/sections/Solutions";
import Testimonials from "@/components/sections/Testimonials";
import Privacy from "@/components/sections/Privacy";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Download from "@/components/sections/Download";
import CTA from "@/components/sections/CTA";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "LearnForm - AI e-Learning Content Platform",
  description:
    "CREATOR x FKDS based AI e-Learning content auto-generation platform by GrowAI",
};

export default function LearnFormPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Integrations />
        <Features />
        <Showcase />
        <Workflow />
        <Solutions />
        <Testimonials />
        <Privacy />
        <Pricing />
        <FAQ />
        <Download />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
