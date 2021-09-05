import CallToActionSection from '@packages/components/CallToActionSection';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';
import WhyItWorksSection from '@packages/components/WhyItWorksSection';
import MentoringSection from '@packages/components/MentoringSection';
import { getTranslationProps } from '@packages/utils/i18n';

export default function Home() {
  return (
    <>
      <CallToActionModal />
      <CallToActionSection />
      <WhyItWorksSection />
      <MentoringSection />
    </>
  );
}

interface StaticPropsArgs {
  locale: string;
}

export async function getStaticProps({ locale }: StaticPropsArgs) {
  return {
    props: {
      ...(await getTranslationProps(locale)),
    },
  };
}
