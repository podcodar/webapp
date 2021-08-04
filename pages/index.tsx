import CallToActionWithIllustration from '@packages/components/CtaWithIllustration';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';

export default function Home() {
  return (
    <>
      <CallToActionModal />
      <div>
        <main>
          {/* Setup placeholder component */}
          <CallToActionWithIllustration />
        </main>
      </div>
    </>
  );
}
