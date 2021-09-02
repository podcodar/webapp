import CallToActionSection from '@packages/components/CallToActionSection';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';
import WhyItWorksSection from '@packages/components/WhyItWorksSection';
import MentoringSection from '@packages/components/MentoringSection';
import TrailSection from '@packages/components/TrailSection';

export default function Home() {
  return (
    <>
      <CallToActionModal />
      <CallToActionSection />
      <WhyItWorksSection />
      <MentoringSection />
      <TrailSection />
    </>
  );
}
