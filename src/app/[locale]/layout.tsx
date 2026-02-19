import type { Metadata } from 'next';
import { GTProvider } from 'gt-next';
import { getGT } from 'gt-next/server';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const gt = await getGT();
  return {
    title: gt('Plural and Branch Demo'),
    description: gt('Demonstrating Plural and Branch components from gt-next'),
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
