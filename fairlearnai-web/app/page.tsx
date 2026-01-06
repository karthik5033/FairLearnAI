import HeroSection from "@/components/hero-section";
import Features from "@/components/features-4";
import StatsSection from "@/components/stats-4";
import ContentSection from "@/components/content-2";
import Pricing from "@/components/pricing";
import FooterSection from "@/components/footer";
import IntegrationsSection from "@/components/integrations-1";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <Features />
      <ContentSection />
      <StatsSection />
      <IntegrationsSection />
      <Pricing />
      <FooterSection />
    </div>
  );
}
