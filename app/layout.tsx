import Providers from "@packages/components/Providers";

import "./globals.css";
import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const theme = "system";
  const cookieStore = cookies();
  const selectedTheme = cookieStore.get("selected-theme")?.value ?? theme;

  return (
    <html lang="en" data-theme={selectedTheme}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
