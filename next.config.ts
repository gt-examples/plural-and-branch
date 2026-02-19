import { withGTConfig } from 'gt-next/config';

const nextConfig = {};

export default withGTConfig(nextConfig, {
  loadTranslationsPath: './src/loadTranslations.ts',
});
