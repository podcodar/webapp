import Image from "next/image";

import { Logo } from "@packages/components/icons";
import { PIX_KEY, images } from "@packages/config/site";

import { LocalizedText } from "@packages/locale/context";
import Section from "./Section";
import SocialIconLinks from "./SocialIconLinks";

export default function Footer() {
  return (
    <Section className="items-center bg-neutral-950 px-6 py-6">
      <div className="grid grid-cols-1 text-gray-50 sm:grid-cols-3">
        <PodCodarLogo />
        <Copyrights />
        <Pix />
      </div>
    </Section>
  );
}

function PodCodarLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Logo size="large" />
    </div>
  );
}

function Pix() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p>
        <LocalizedText token={"footer.contribution"} />
      </p>
      <p className="text-sm text-zinc-500">{PIX_KEY}</p>
      <Image src={images.pixQRCode} width={125} height={125} alt={"qr code"} />
    </div>
  );
}

function Copyrights() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col items-center gap-2">
      <p>
        <LocalizedText token={"footer.podcodar"} />
      </p>
      <SocialIconLinks />
      <p className="text-sm">
        <LocalizedText token="footer.legal" params={{ currentYear }} />
      </p>
    </div>
  );
}
