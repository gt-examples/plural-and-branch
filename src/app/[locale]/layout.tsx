import type { Metadata } from 'next';
import { GTProvider } from 'gt-next';
import { getGT, getLocale } from 'gt-next/server';
import './globals.css';

const locales = ['en', 'es', 'fr', 'ja', 'ar'];

export async function generateMetadata(): Promise<Metadata> {
  const gt = await getGT();
  const locale = await getLocale();
  const title = gt('Plural and Branch Demo');
  const description = gt('Demonstrating Plural and Branch components from gt-next');

  const alternates: Record<string, string> = {};
  for (const l of locales) {
    alternates[l] = `https://plural-and-branch.generaltranslation.dev/${l}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://plural-and-branch.generaltranslation.dev/${locale}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      locale,
      url: `https://plural-and-branch.generaltranslation.dev/${locale}`,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <GTProvider>
          {children}
        </GTProvider>
      </body>
    </html>
  );
}
