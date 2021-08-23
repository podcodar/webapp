import CallToActionWithIllustration from '@packages/components/CtaWithIllustration';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';
import SectionMentorship from 'packages/components/SectionMentorship';

export default function Home() {
  return (
    <>
      <CallToActionModal />
      <div>
        <main>
          {/* Setup placeholder component */}
          <CallToActionWithIllustration />
          <SectionMentorship />
        </main>
      </div>
    </>
  );
}
