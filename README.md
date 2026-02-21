# Plural and Branch Demo

A minimal Next.js app demonstrating the `<Plural>` and `<Branch>` components from [gt-next](https://www.generaltranslation.com/docs) for internationalized pluralization and conditional rendering.

**[Live Demo](https://plural-and-branch.generaltranslation.dev)** | **[General Translation Docs](https://generaltranslation.com/docs)**

## About

This app simulates a notification inbox where counts update in real time. `<Plural>` handles singular/plural/zero forms across languages with complex plural rules, while `<Branch>` renders different translated content based on notification type (message, alert, update). All strings are fully translated into Spanish, French, Japanese, and Arabic.

## GT Features Used

- `<T>` — JSX translation
- `<Plural>` — Pluralization (singular/plural/zero)
- `<Branch>` — Conditional rendering by string key
- `<Num>` — Locale-aware number formatting
- `<Var>` — Safe variable interpolation inside translated content
- `useGT` — String translations (for attributes)
- `getGT` — Server-side string translations (for metadata)
- `<LocaleSelector>` — Language picker
- `loadTranslations` — Local translation storage

## Getting Started

```bash
git clone https://github.com/gt-examples/plural-and-branch.git
cd plural-and-branch
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With

- [Next.js](https://nextjs.org)
- [General Translation](https://generaltranslation.com) (gt-next)
- [Tailwind CSS](https://tailwindcss.com)
