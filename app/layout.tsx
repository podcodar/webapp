import Providers from "@packages/components/Providers";

import "./globals.css";
import Metadata from "@packages/components/Metadata";
import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const cookieStore = await cookies();
  const selectedTheme = cookieStore.get("selected-theme")?.value ?? "system";

  return (
    <html lang="en" data-theme={selectedTheme} className={selectedTheme}>
      <body>
        <Metadata />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
