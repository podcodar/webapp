import CallToActionWithIllustration from '@packages/components/CtaWithIllustration';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';
import HowItWorksSection from '@packages/components/HowItWorksSection';

export default function Home() {
  return (
    <>
      <CallToActionModal />
      <div>
        <main>
          {/* Setup placeholder component */}
          <CallToActionWithIllustration />
          <HowItWorksSection />
        </main>
      </div>
    </>
  );
}
