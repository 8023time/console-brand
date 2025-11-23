# Console Brand

A lightweight toolkit for producing rich-styled console logs (Badge, Gradient, Image, Emoji, ASCII, JSON, Table, etc.) together with a React-based UI for visually configuring log styles.

## Features

- Rich console output: text, Badge (label/value), gradient backgrounds, images, ASCII art, large emoji, JSON groups, and tables.
- Reusable style presets (`Presets`) for consistent visual output.
- UI components for style configuration (for example `StyleControls`) built with React + TypeScript, Tailwind and Ant Design.
- Internationalization support using `react-i18next` for easy localization of the control UI.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- Ant Design (form controls)
- ESLint + Prettier

## Installation (development)

Make sure you have `pnpm` installed, then run:

```powershell
pnpm install
pnpm run dev
```

## Usage

Import the logging helpers and use them anywhere in your application code:

```ts
import { prettyLog, logBadge, Presets } from '@/lib';

prettyLog('Hello world', Presets.SUCCESS);
logBadge({ label: 'Build', value: 'Success', labelBg: '#059669', valueBg: '#064e3b' });
```

The UI component `StyleControls` (under `src/components/ui/StyleControls`) provides a ready-made panel for editing styles (colors, padding, border radius, typography, gradients, etc.) and emits updates through callbacks so the parent can apply them to previews or persisted settings.

## Linting & Formatting

- Run ESLint:

```powershell
pnpm run lint
```

- Format with Prettier:

```powershell
pnpm run format
```

## Contributing

Contributions are welcome! Please open an issue to discuss larger changes before sending a pull request.

Before submitting a PR:

- Run `pnpm run lint` and `pnpm run format`.
- Keep changes small and focused; include tests where appropriate.

## License

MIT
