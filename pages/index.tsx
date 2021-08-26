import CallToActionSection from '@packages/components/CallToActionSection';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';
import HowItWorksSection from '@packages/components/HowItWorksSection';

export default function Home() {
  return (
    <>
      <CallToActionModal />
      <CallToActionSection />
      <HowItWorksSection />
    </>
  );
}
