import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { YRLGDBooksSeriesSection } from "@/components/sections/YRLGDBooksSeriesSection";
import { YRLGDDailyAudioSection } from "@/components/sections/YRLGDDailyAudioSection";
import { YRLGDDownloadsSection } from "@/components/sections/YRLGDDownloadsSection";
import { YRLGDHeroSection } from "@/components/sections/YRLGDHeroSection";
import { YRLGDMiniWebinarSection } from "@/components/sections/YRLGDMiniWebinarSection";
import { YRLGDPodcastSection } from "@/components/sections/YRLGDPodcastSection";

export function YouReadyLetsGrowDigital(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <YRLGDHeroSection />
      <YRLGDDownloadsSection />
      <YRLGDDailyAudioSection />
      <YRLGDPodcastSection />
      <YRLGDMiniWebinarSection />
      <YRLGDBooksSeriesSection />
      <Copyright />
    </>
  );
}
