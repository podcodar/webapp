import CallToActionWithIllustration from '@packages/components/CtaWithIllustration';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';
import HomeSection from '@packages/components/HomeSection';

export default function Home() {
  return (
    <>
      <CallToActionModal />
      <div>
        <main>
          {/* Setup placeholder component */}
          <CallToActionWithIllustration />
          <HomeSection />
        </main>
      </div>
    </>
  );
}
