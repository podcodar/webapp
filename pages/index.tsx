import CallToActionSection from '@packages/components/CallToActionSection';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';
import WhyItWorksSection from '@packages/components/WhyItWorksSection';

export default function Home() {
  return (
    <>
      <CallToActionModal />
      <CallToActionSection />
      <WhyItWorksSection />
    </>
  );
}
